import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../api';
import Footer from '../components/common/Footer';
import DashboardCharts from '../components/organizer/DashboardCharts';

const OrganizerPage = () => {
    const { showPage, showAlert } = useContext(AppContext); 
    const [stats, setStats] = useState({});
    const [eventStats, setEventStats] = useState([]);
    const [deptStats, setDeptStats] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [participantDetails, setParticipantDetails] = useState(null);
    const [activeTool, setActiveTool] = useState(null);

    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        // Clear all auth data
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        
        if (typeof logout === 'function') {
            logout();
        }

        // Force navigation to home page
        window.location.href = '/';
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [adminStats, eventCounts, deptCounts] = await Promise.all([
                    api.getAdminStats(),
                    api.getEventCounts(),
                    api.getDeptCounts(),
                ]);
                setStats(adminStats);
                setEventStats(eventCounts);
                setDeptStats(deptCounts);
            } catch (error) {
                console.error("Organizer data fetch failed:", error);
                showAlert('Failed to fetch organizer data.', 'error');
            }
        };
        fetchData();
    }, [showAlert]);

    const handleSearch = async () => {
        setParticipantDetails(null);
        if (!searchId) {
            showAlert('Please enter a Registration ID or Email.', 'info');
            return;
        }

        try {
            const found = await api.getRegistrationById(searchId);
            
            if (found && Object.keys(found).length > 0) {
                setParticipantDetails({
                    registrationId: found.registration_id, 
                    fullName: found.full_name, 
                    email: found.email,
                    passType: found.pass_type,
                    paymentStatus: found.payment_status || 'pending',
                    day1Attendance: found.day1_attendance || 'Absent',
                    day2Attendance: found.day2_attendance || 'Absent',
                });
                showAlert('Participant found.', 'success');
            } else {
                showAlert('Participant not found.', 'error');
                setParticipantDetails(null);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error searching for participant.'; 
            console.error("Search failed:", error);
            showAlert(errorMessage, 'error');
            setParticipantDetails(null);
        }
    };

    const handleMarkAttendance = async (day) => {
        if (!participantDetails || !participantDetails.registrationId) {
            showAlert('Cannot mark attendance: Registration ID is missing.', 'error');
            return;
        }
        
        const stateKey = day === 'day1' ? 'day1Attendance' : 'day2Attendance';
        if (participantDetails[stateKey] === 'Present') {
            showAlert(`Attendance for ${day === 'day1' ? 'Day 1' : 'Day 2'} is already marked.`, 'info');
            return;
        }
        
        try {
            await api.markAttendance(participantDetails.registrationId, day);
            
            setParticipantDetails(prev => ({ 
                ...prev, 
                [stateKey]: 'Present'
            }));
            
            showAlert(`${day === 'day1' ? 'Day 1' : 'Day 2'} attendance marked`, 'success');
        } catch (error) {
            
            const isApiError = error.response && error.response.status;
            const status = isApiError ? error.response.status : 'N/A';
            const message = isApiError 
                ? error.response.data?.message || `HTTP Error ${status}`
                : error.message || 'Network or Unknown Error.';

            console.error("Attendance marking failed:", {
                status: status,
                message: message,
                details: error.response?.data,
                errorObject: error
            });
            
            showAlert(`Failed to mark attendance. Status: ${status}. Message: ${message}`, 'error');
        }
    };

    const handleGenerateCertificate = () => {
        if (!participantDetails || !participantDetails.registrationId) return;
        // Navigate to the certificate page
        navigate(`/certificate/${participantDetails.registrationId}`);
    };

    // --- FIX: Certificate Eligibility Logic ---
    const isEligibleForCertificate = () => {
        if (!participantDetails || participantDetails.paymentStatus !== 'paid') {
            return false;
        }
        const { passType, day1Attendance, day2Attendance } = participantDetails;
        if (passType === 'day1' && day1Attendance === 'Present') {
            return true;
        }
        if (passType === 'day2' && day2Attendance === 'Present') {
            return true;
        }
        if (passType === 'both' && day1Attendance === 'Present' && day2Attendance === 'Present') {
            return true;
        }
        return false;
    };
    // --- FIX: CSV Download Functions ---

    // Helper to escape CSV data
    const escapeCsv = (field) => {
        if (field === null || field === undefined) return '';
        const str = String(field);
        // Wrap in quotes if it contains a comma, quote, or newline
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    };

    const downloadEventStatsCSV = () => {
        if (!eventStats || eventStats.length === 0) {
            showAlert('No event registration data to download.', 'info');
            return;
        }

        const headers = ['Event', 'Department', 'Registrations'];
        const csvRows = [
            headers.join(','),
            ...eventStats.map(row => 
                [row.name, row.dept || 'N/A', row.registrations].map(escapeCsv).join(',')
            )
        ];

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'technofest_event_registrations.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showAlert('Event Registrations CSV downloaded!', 'success');
    };

    const downloadDeptStatsCSV = () => {
        if (!deptStats || deptStats.length === 0) {
            showAlert('No department data to download.', 'info');
            return;
        }

        const headers = ['Department', 'Events Count', 'Total Registrations'];
        const csvRows = [
            headers.join(','),
            ...deptStats.map(row => 
                [row.dept, row.eventsCount, row.registrations].map(escapeCsv).join(',')
            )
        ];

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'technofest_department_overview.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showAlert('Department Overview CSV downloaded!', 'success');
    };

    // --- END FIX ---

    
    return (
        <>
            <section id="organizer" className="py-10 admin-page">
                <div className="admin-container max-w-6xl mx-auto px-6">
                    <div className="admin-header">
                        <div className="admin-title"><i className="fas fa-users-cog"></i><h2>Organizer Dashboard</h2></div>
                        <button className="btn-logout" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</button>
                    </div>
                    <div className="admin-stats">
                        <div className="admin-stat-card"><div className="stat-icon"><i className="fas fa-users"></i></div><div className="stat-info"><h3>{stats.totalRegistrations}</h3><p>Total Registrations</p></div></div>
                        <div className="admin-stat-card"><div className="stat-icon"><i className="fas fa-check-circle"></i></div><div className="stat-info"><h3>{stats.paidCount}</h3><p>Paid Participants</p></div></div>
                        <div className="admin-stat-card"><div className="stat-icon"><i className="fas fa-user-check"></i></div><div className="stat-info"><h3>{stats.arrivedCount}</h3><p>Arrived On Campus</p></div></div>
                        <div className="admin-stat-card"><div className="stat-icon"><i className="fas fa-money-bill-wave"></i></div><div className="stat-info"><h3>₹{stats.revenue}</h3><p>Total Revenue</p></div></div>
                    </div>

                    {/* --- ADDED: Dashboard Charts --- */}
                    <DashboardCharts eventStats={eventStats} deptStats={deptStats} />

                    {/* Tool Toggle Buttons */}
                    <div className="tool-toggle-container">
                        <button 
                            className={`tool-toggle-btn ${activeTool === 'events' ? 'active' : ''}`}
                            onClick={() => setActiveTool(activeTool === 'events' ? null : 'events')}
                        >
                            <i className="fas fa-chart-bar"></i> Event Registrations
                        </button>
                        <button 
                            className={`tool-toggle-btn ${activeTool === 'departments' ? 'active' : ''}`}
                            onClick={() => setActiveTool(activeTool === 'departments' ? null : 'departments')}
                        >
                            <i className="fas fa-layer-group"></i> Department Overview
                        </button>
                        <button 
                            className={`tool-toggle-btn ${activeTool === 'verification' ? 'active' : ''}`}
                            onClick={() => setActiveTool(activeTool === 'verification' ? null : 'verification')}
                        >
                            <i className="fas fa-search"></i> Participant Verification
                        </button>
                    </div>

                    <div className="organizer-tools">
                        {activeTool === 'events' && <div className="tool-section">
                            <div className="tool-header">
                                <h3><i className="fas fa-chart-bar"></i> Event-wise Registrations</h3>
                                <button className="btn-secondary btn-small" onClick={downloadEventStatsCSV}>
                                    <i className="fas fa-download"></i> Download CSV
                                </button>
                            </div>
                            <div className="table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Event</th>
                                            <th>Department</th>
                                            <th>Registrations</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eventStats.map(row => (
                                            <tr key={row.id}>
                                                <td>{row.name}</td>
                                                <td>{row.dept || 'N/A'}</td>
                                                <td>{row.registrations}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>}
                        {activeTool === 'departments' && <div className="tool-section">
                            <div className="tool-header">
                                <h3><i className="fas fa-layer-group"></i> Department-wise Overview</h3>
                                <button className="btn-secondary btn-small" onClick={downloadDeptStatsCSV}>
                                    <i className="fas fa-download"></i> Download CSV
                                </button>
                            </div>
                            <div className="table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Department</th>
                                            <th>Events</th>
                                            <th>Total Registrations</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deptStats.map(row => (
                                            <tr key={row.dept}>
                                                <td>{row.dept}</td>
                                                <td>{row.eventsCount}</td>
                                                <td>{row.registrations}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>}
                        {activeTool === 'verification' && <div className="tool-section">
                            <h3><i className="fas fa-search"></i> Participant Verification</h3>
                            <div className="verification-panel">
                                <div className="search-box">
                                    <input type="text" id="searchParticipant" placeholder="Enter Registration ID or Email" value={searchId} onChange={e => setSearchId(e.target.value)} />
                                    <button onClick={handleSearch} className="btn-primary"><i className="fas fa-search"></i> Search</button>
                                </div>
                                {participantDetails && (
                                    <div className="participant-card">
                                        <div className="participant-header"><h4>{participantDetails.fullName}</h4><span className="reg-id">Reg ID: {participantDetails.registrationId}</span></div>
                                        <div className="participant-info">
                                            <div className="info-row"><span>Email:</span> <span>{participantDetails.email}</span></div>
                                            <div className="info-row"><span>Pass:</span> <span>{participantDetails.passType}</span></div>
                                            <div className="info-row"><span>Payment:</span><span className={`status-badge ${participantDetails.paymentStatus === 'paid' ? 'success' : 'pending'}`}>{participantDetails.paymentStatus}</span></div>
                                            <div className="info-row"><span>Day 1:</span><span className={`status-badge ${participantDetails.day1Attendance === 'Present' ? 'success' : 'pending'}`}>{participantDetails.day1Attendance}</span></div>
                                            <div className="info-row"><span>Day 2:</span><span className={`status-badge ${participantDetails.day2Attendance === 'Present' ? 'success' : 'pending'}`}>{participantDetails.day2Attendance}</span></div>
                                        </div>
                                        <div className="participant-actions">
                                            <button 
                                                className="btn-primary" 
                                                onClick={() => handleMarkAttendance('day1')} 
                                                disabled={participantDetails.day1Attendance === 'Present' || participantDetails.passType === 'day2'}
                                            >
                                                Mark Day 1 Present
                                            </button>
                                            <button 
                                                className="btn-primary" 
                                                onClick={() => handleMarkAttendance('day2')}
                                                disabled={participantDetails.day2Attendance === 'Present' || participantDetails.passType === 'day1'}
                                            >
                                                Mark Day 2 Present
                                            </button>
                                            <button 
                                                className="btn-secondary" 
                                                onClick={handleGenerateCertificate}
                                                disabled={!isEligibleForCertificate()} 
                                            >
                                                Generate Certificate
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>}
                    </div>
                </div>
            </section>
            
        </>
    );
};

const OrganizerPageCSS = `
.tool-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}
.tool-toggle-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}
.tool-toggle-btn {
    padding: 14px 28px;
    font-size: 1rem;
    font-weight: 700;
    border: 3px solid transparent;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
    color: #374151;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
}
.tool-toggle-btn i {
    transition: transform 0.3s ease;
}
.tool-toggle-btn:hover i, .tool-toggle-btn.active i {
    transform: rotate(15deg) scale(1.2);
}
.tool-toggle-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
    z-index: -1;
}
.tool-toggle-btn:hover::before, .tool-toggle-btn.active::before {
    width: 400px;
    height: 400px;
}
.tool-toggle-btn:hover, .tool-toggle-btn.active {
    color: white;
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    border-color: rgba(255, 255, 255, 0.3);
}
.chart-container {
    height: 450px;
    padding: 2rem;
}
`;

export default OrganizerPage;