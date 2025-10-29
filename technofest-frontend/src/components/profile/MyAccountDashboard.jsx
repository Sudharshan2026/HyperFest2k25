import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import CertificatesList from './CertificatesList';

const MyAccountDashboard = ({ currentUser, onDownloadPass, certificates, onDownloadCertificate }) => {
    const navigate = useNavigate();

    const isRegistered = !!currentUser?.registrationId;
    const isPaid = currentUser?.paymentStatus === 'paid';
    const displayStatus = isRegistered 
        ? (isPaid ? 'Registered' : 'Payment Pending')
        : 'Not Registered';
    
    const statusClass = isRegistered 
        ? (isPaid ? 'success' : 'pending')
        : 'not-registered';

    const passInfo = {
        type: currentUser?.passType || 'N/A',
        date: currentUser?.passType === 'day1'
            ? 'March 15, 2025'
            : currentUser?.passType === 'day2'
            ? 'March 16, 2025'
            : currentUser?.passType
            ? 'March 15-16, 2025'
            : 'N/A',
        paymentStatus: currentUser?.paymentStatus || 'pending'
    };

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
            <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            <div className="relative max-w-7xl mx-auto px-6 z-10">
                {/* Page Header */}
                <div className="text-center mb-12 animate-fade-in-down">
                    <div className="inline-block mb-4">
                        <span className="text-7xl animate-bounce-slow">👤</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
                        My Account
                    </h2>
                    <p className="text-xl text-white/90 font-medium drop-shadow-md">
                        Manage your registration and track your participation 🎯
                    </p>
                </div>

                {/* User Profile Card */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-white/50 mb-8 overflow-hidden animate-fade-in-up">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="text-8xl animate-float">
                                👨‍💼
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-3xl font-bold text-white mb-2">{currentUser.fullName}</h3>
                                <p className="text-lg text-white/90 mb-1">📧 {currentUser.email}</p>
                                <p className="text-lg text-white/90">🎓 {currentUser.role}</p>
                            </div>
                            <div className="text-center">
                                <div className={`inline-block px-6 py-3 rounded-full font-bold text-lg shadow-xl ${
                                    statusClass === 'success' ? 'bg-green-400 text-green-900' :
                                    statusClass === 'pending' ? 'bg-yellow-400 text-yellow-900' :
                                    'bg-red-400 text-red-900'
                                } animate-pulse-slow`}>
                                    {displayStatus}
                                </div>
                                {currentUser.registrationId && (
                                    <div className="mt-3 text-white/90 font-semibold">
                                        <span className="bg-white/20 px-4 py-2 rounded-full">
                                            🆔 {currentUser.registrationId}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* My Pass Card */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-purple-200 overflow-hidden transform hover:scale-105 transition-all duration-300 animate-fade-in-up">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 flex items-center gap-3">
                            <span className="text-4xl">🎫</span>
                            <h4 className="text-2xl font-bold text-white">My Pass</h4>
                        </div>
                        <div className="p-6">
                            {!currentUser.passType ? (
                                <div className="text-center py-8">
                                    <div className="text-6xl mb-4">📭</div>
                                    <p className="text-gray-600 mb-6">No pass purchased yet</p>
                                    <button 
                                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                                        onClick={() => navigate('/passes')}
                                    >
                                        🎟️ Get Pass
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
                                        <h5 className="text-2xl font-bold text-purple-700 mb-2">{passInfo.type}</h5>
                                        <p className="text-gray-600 mb-4">📅 {passInfo.date}</p>
                                        <div className="flex justify-between items-center p-3 bg-white rounded-xl">
                                            <span className="font-semibold text-gray-700">Payment Status:</span>
                                            <span className={`px-4 py-2 rounded-full font-bold ${
                                                passInfo.paymentStatus === 'paid' 
                                                    ? 'bg-green-400 text-green-900' 
                                                    : 'bg-yellow-400 text-yellow-900'
                                            }`}>
                                                {passInfo.paymentStatus === 'paid' ? '✓ Paid' : '⏳ Pending'}
                                            </span>
                                        </div>
                                    </div>
                                    <button 
                                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                                        onClick={onDownloadPass}
                                    >
                                        <span>📥</span>
                                        <span>Download Pass</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Attendance Card */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-green-200 overflow-hidden transform hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-200">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 flex items-center gap-3">
                            <span className="text-4xl">✅</span>
                            <h4 className="text-2xl font-bold text-white">Attendance</h4>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                                <span className="font-bold text-gray-700">📅 Day 1:</span>
                                <span className={`px-4 py-2 rounded-full font-bold ${
                                    currentUser.day1_attendance === 'Present' 
                                        ? 'bg-green-400 text-green-900' 
                                        : 'bg-red-400 text-red-900'
                                }`}>
                                    {currentUser.day1_attendance === 'Present' ? '✓ Present' : '✗ Absent'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                                <span className="font-bold text-gray-700">📅 Day 2:</span>
                                <span className={`px-4 py-2 rounded-full font-bold ${
                                    currentUser.day2_attendance === 'Present' 
                                        ? 'bg-green-400 text-green-900' 
                                        : 'bg-red-400 text-red-900'
                                }`}>
                                    {currentUser.day2_attendance === 'Present' ? '✓ Present' : '✗ Absent'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Certificates Card */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-blue-200 overflow-hidden transform hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-400 md:col-span-2">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 flex items-center gap-3">
                            <span className="text-4xl">📜</span>
                            <h4 className="text-2xl font-bold text-white">Certificates</h4>
                        </div>
                        <div className="p-6">
                            <CertificatesList certificates={certificates} onDownloadCertificate={onDownloadCertificate} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Inline Styles for Animations */}
            <style jsx>{`
                @keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } }
                @keyframes grid-move { 0% { transform: translate(0, 0); } 100% { transform: translate(50px, 50px); } }
                @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
                @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(10deg); } }
                @keyframes pulse-slow { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
                @keyframes fade-in-down { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                .animate-blob { animation: blob 7s infinite; }
                .animate-grid-move { background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px); background-size: 50px 50px; animation: grid-move 20s linear infinite; }
                .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
                .animate-float { animation: float 3s ease-in-out infinite; }
                .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
                .animate-fade-in-down { animation: fade-in-down 0.6s ease-out; }
                .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; opacity: 0; }
                .animation-delay-200 { animation-delay: 200ms; }
                .animation-delay-400 { animation-delay: 400ms; }
                .animation-delay-600 { animation-delay: 600ms; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
                .bg-grid-pattern { background-image: radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px); background-size: 50px 50px; }
            `}</style>
        </section>
    );
};

MyAccountDashboard.propTypes = {
    currentUser: PropTypes.object.isRequired,
    onDownloadPass: PropTypes.func.isRequired,
    certificates: PropTypes.array,
    onDownloadCertificate: PropTypes.func.isRequired,
};

export default MyAccountDashboard;