import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import EventsPage from './pages/EventsPage';
import PassesPage from './pages/PassesPage';
import RegistrationPage from './pages/RegistrationPage';
import MyAccountPage from './pages/MyAccountPage';
import SchedulePage from './pages/SchedulePage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import OrganizerPage from './pages/OrganizerPage';
import CertificatePage from './pages/CertificatePage'; // Import the new page
import LoginModal from './components/common/LoginModal';
import AdminLoginModal from './components/admin/AdminLoginModal';
import PaymentModal from './components/common/PaymentModal';
import SuccessModal from './components/common/SuccessModal';
import Footer from './components/common/Footer';
import AdminButton from './components/common/AdminButton';
import { AppContext } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import './styles.css';
import './index.css';

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [page, setPage] = useState('home');
    const [modal, setModal] = useState(null);
    const [alert, setAlert] = useState(null);
    const [paymentData, setPaymentData] = useState(null);
    const [successMessage, setSuccessMessage] = useState({ title: '', message: '' });
    const [adminType, setAdminType] = useState(null);
    const [eventToEdit, setEventToEdit] = useState(null);

    // Initial user load (AuthContext should primarily manage this now, but kept for legacy)
    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }
    }, []);

    const showPage = (pageId) => {
        setPage(pageId);
        window.scrollTo(0, 0);
    };

    const showAlert = (message, type = 'info') => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 4000);
    };

    // Consolidated modal handlers for better clarity
    const closeModal = () => {
        setModal(null);
        setPaymentData(null);
        setAdminType(null);
        setEventToEdit(null); // Clear editing state on close
    };

    const showModal = (modalName, data = null) => {
        if (modalName === 'payment' && data) setPaymentData(data);
        if (modalName === 'adminLogin' && data) setAdminType(data);
        if (modalName === 'eventEdit' && data) setEventToEdit(data);
        
        // This is the CRITICAL line: it MUST update the state
        setModal(modalName);
    };

    const showSuccessModal = (title, message) => {
        setSuccessMessage({ title, message });
        setModal('success');
    };

    const contextValue = useMemo(() => ({
        currentUser,
        setCurrentUser,
        page,
        showPage,
        modal,
        showModal,
        closeModal, // Passed the closure function
        alert,
        showAlert, // Passed the closure function
        paymentData,
        showSuccessModal, // Passed the closure function
        successMessage,
        adminType,
        setAdminType,
        eventToEdit,
        setEventToEdit
    }), [currentUser, page, modal, alert, paymentData, successMessage, adminType, eventToEdit]);

    return (
        <AuthProvider> 
            <AppContext.Provider value={contextValue}>
                <Router>
                    <div className="min-h-screen flex flex-col relative bg-gray-900 text-white"> 
                        {/* Background color added to replace particles */}
                        <Navbar />
                        <main className="flex-1">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/events" element={<EventsPage />} />
                                <Route path="/passes" element={<PassesPage />} />
                                <Route path="/registration" element={<RegistrationPage />} />
                                <Route path="/myaccount" element={<MyAccountPage />} />
                                <Route path="/schedule" element={<SchedulePage />} />
                                <Route path="/gallery" element={<GalleryPage />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/contact" element={<ContactPage />} />
                                <Route path="/admin" element={<AdminPage />} />
                                <Route path="/organizer" element={<OrganizerPage />} />
                                <Route path="/certificate/:registrationId" element={<CertificatePage />} />
                            </Routes>
                        </main>
                        
                        {/* Conditional Modal Rendering */}
                        {modal === 'login' && <LoginModal isOpen={modal === 'login'} onClose={closeModal} />} 
                        {modal === 'payment' && <PaymentModal />}
                        {modal === 'success' && <SuccessModal />}
                        {modal === 'adminLogin' && <AdminLoginModal />}
                        
                        {alert && (
                            <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-xl z-50 text-white
                                ${alert.type === 'error' ? 'bg-red-600' : alert.type === 'success' ? 'bg-green-600' : 'bg-blue-600'}
                            `}>
                                <i className={`fas mr-2 fa-${alert.type === 'error' ? 'exclamation-circle' : alert.type === 'success' ? 'check-circle' : 'info-circle'}`}></i> {alert.message}
                            </div>
                        )}
                        <AdminButton />
                        <Footer />
                    </div>
                </Router>
            </AppContext.Provider>
        </AuthProvider>
    );
};

export default App;
