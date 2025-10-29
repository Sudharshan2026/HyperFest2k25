import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../api';
import { useNavigate } from "react-router-dom";
import MyAccountDashboard from '../components/profile/MyAccountDashboard';

const MyAccountPage = () => {
    const { showModal, showAlert } = useContext(AppContext); // AppContext for modals
    const { currentUser, refreshUserData } = useContext(AuthContext); // AuthContext for user data
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const isRegistered = !!currentUser?.registrationId;
    const isPaid = currentUser?.paymentStatus === 'paid';
    const displayStatus = isRegistered 
        ? (isPaid ? 'Registered' : 'Payment Pending')
        : 'Not Registered';

    const statusClass = isRegistered 
        ? (isPaid ? 'success' : 'pending')
        : 'not-registered';

    const [certificates, setCertificates] = useState([]);
    const [passInfo, setPassInfo] = useState({
        type: 'N/A',
        date: 'N/A',
        paymentStatus: 'pending'
    });

    useEffect(() => {
        if (!currentUser) return;

        const loadData = async () => {
            // Refresh user data to get latest status
            await refreshUserData().catch(err => {
                showAlert('Could not refresh user data. Please try logging in again.', 'error');
                console.error('User refresh error:', err);
            });

            if (currentUser.registrationId) {
                setError(null);
            }
        };
        if (currentUser && currentUser.registrationId) {
            setError(null);
            try {
                setPassInfo({
                    type: currentUser.passType || 'N/A',
                    date: currentUser.passType === 'day1'
                        ? 'March 15, 2025'
                        : currentUser.passType === 'day2'
                        ? 'March 16, 2025'
                        : currentUser.passType
                        ? 'March 15-16, 2025'
                        : 'N/A',
                    paymentStatus: currentUser.paymentStatus
                });
                if (isPaid) {
                    api.getCertificates(currentUser.registrationId)
                        .then(data => setCertificates(data || []))
                        .catch(err => {
                            setError('Failed to load certificates. Please try again later.');
                            console.error('Certificate loading error:', err);
                        });
                } else {
                    setCertificates([]);
                }
            } catch (err) {
                setError('Error loading user data. Please refresh the page or try logging in again.');
                console.error('User data loading error:', err);
            }
        } else {
            setPassInfo({ type: 'N/A', date: 'N/A', paymentStatus: 'pending' });
            setCertificates([]);
        }
    }, [currentUser, isPaid, refreshUserData, showAlert]); // Dependencies

    const downloadPass = () => {
        if (!currentUser || currentUser.paymentStatus !== 'paid') {
            showModal('error', { title: 'Payment Required', message: 'Please complete payment first to download your pass.' });
            return;
        }
        showModal('success', { title: 'Pass Downloaded', message: 'Your digital pass has been downloaded.' });
    };

    const downloadCertificate = (certId) => {
        showModal('success', { title: 'Certificate Ready', message: 'Your certificate is being downloaded...' });
        if (currentUser && currentUser.registrationId) {
            navigate(`/certificate/${currentUser.registrationId}`);
        }
    };

    if (!currentUser) {
        return (
            <section id="myaccount" className="relative min-h-screen py-16 overflow-hidden">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600"></div>
                
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-grid-pattern animate-grid-move"></div>
                </div>

                {/* Floating Orbs */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                <div className="relative max-w-3xl mx-auto px-6 z-10">
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-white/50 p-12 text-center animate-bounce-in">
                        <div className="text-8xl mb-6 animate-bounce-slow">🔐</div>
                        <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                            Authentication Required
                        </h3>
                        <p className="text-xl text-gray-600 mb-8">
                            Please log in to access your account details
                        </p>
                        <button 
                            className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3 mx-auto"
                            onClick={() => showModal('login')}
                        >
                            <span className="text-2xl">👤</span>
                            <span>Login to Continue</span>
                            <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </button>
                        <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
                            <p className="font-semibold text-gray-700 mb-3">Having trouble logging in?</p>
                            <ul className="text-left space-y-2 text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Check if your email and password are correct</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Make sure you have an account registered</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Try resetting your password if needed</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes bounce-in {
                        0% { opacity: 0; transform: scale(0.3) translateY(-100px); }
                        50% { transform: scale(1.05); }
                        70% { transform: scale(0.95); }
                        100% { opacity: 1; transform: scale(1) translateY(0); }
                    }
                    .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
                `}</style>
            </section>
        );
    }

    return (
        <MyAccountDashboard
            currentUser={currentUser}
            certificates={certificates}
            onDownloadPass={downloadPass}
            onDownloadCertificate={downloadCertificate}
        />
    );
};

export default MyAccountPage;