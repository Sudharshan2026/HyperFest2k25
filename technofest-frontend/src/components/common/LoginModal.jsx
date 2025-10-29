import React, { useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { AuthContext } from '../../contexts/AuthContext';
import { login as loginApi, getUserByEmail } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

const LoginModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { showAlert, showSuccessModal, setCurrentUser } = useContext(AppContext);
    const { login: authContextLogin } = useContext(AuthContext);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const loginResponse = await loginApi({ 
                email, 
                phone_last_digits: password
            });
            
            if (!loginResponse.data) {
                throw new Error('Login failed. Please check your email and phone digits.');
            }

            const { token, user: userData } = loginResponse.data;

            await authContextLogin(token, userData);
            setCurrentUser(userData);
            
            onClose();
            showSuccessModal('Login Successful!', 'Welcome back to TechnoFest!');

            if (userData.role === 'admin') {
                navigate('/admin');
            } else if (userData.role === 'organizer') {
                navigate('/organizer');
            } else {
                navigate('/myaccount');
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';
            showAlert(errorMessage, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="login-modal-content">
                {/* Header with Animation */}
                <div className="text-center mb-6 animate-fade-in-down">
                    <div className="inline-block mb-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-50 animate-pulse-slow"></div>
                            <span className="relative text-7xl animate-bounce-slow">🔐</span>
                        </div>
                    </div>
                    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        Welcome Back!
                    </h2>
                    <p className="text-gray-600 text-lg">Login to TechnoFest 2025</p>
                    
                    {/* Decorative Line */}
                    <div className="flex items-center justify-center gap-3 mt-4">
                        <div className="h-1 w-16 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full"></div>
                        <span className="text-2xl animate-spin-slow">✨</span>
                        <div className="h-1 w-16 bg-gradient-to-r from-transparent via-pink-400 to-transparent rounded-full"></div>
                    </div>
                </div>

                {/* Instructions Card */}
                <div className="mb-6 animate-slide-in-up animation-delay-100">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-2xl border-2 border-blue-200 shadow-lg">
                        <div className="flex items-start gap-3 mb-3">
                            <span className="text-3xl">💡</span>
                            <h3 className="text-blue-700 font-bold text-lg">Login Instructions:</h3>
                        </div>
                        <ul className="space-y-2 ml-10">
                            <li className="flex items-start gap-2 text-sm text-blue-600">
                                <span className="text-green-500 font-bold">✓</span>
                                <span>Enter your registered email address</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-blue-600">
                                <span className="text-green-500 font-bold">✓</span>
                                <span>Use the last 4 digits of your registered phone number as password</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-blue-600">
                                <span className="text-green-500 font-bold">✓</span>
                                <span>
                                    <strong>Example:</strong> If phone is{' '}
                                    <code className="bg-blue-200 px-2 py-0.5 rounded font-mono">9876543210</code>, 
                                    use <code className="bg-green-200 px-2 py-0.5 rounded font-mono font-bold">3210</code> as password
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Field */}
                    <div className="form-group animate-slide-in-left animation-delay-200">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                            <span className="text-xl">📧</span>
                            <span>Email Address</span>
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 pl-12 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 text-gray-800 placeholder-gray-400"
                                required
                                placeholder="Enter your registered email"
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 text-xl pointer-events-none">
                                👤
                            </div>
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="form-group animate-slide-in-right animation-delay-300">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                            <span className="text-xl">🔒</span>
                            <span>Password</span>
                            <span className="text-xs text-gray-500 font-normal">(last 4 digits of phone)</span>
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 pl-12 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-200 transition-all duration-300 bg-gradient-to-br from-pink-50 to-purple-50 text-gray-800 placeholder-gray-400 tracking-widest font-bold"
                                required
                                maxLength="4"
                                pattern="[0-9]{4}"
                                placeholder="Enter last 4 digits"
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 text-xl pointer-events-none">
                                🔑
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 animate-fade-in animation-delay-400">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl ${
                                isLoading 
                                    ? 'opacity-75 cursor-not-allowed' 
                                    : 'hover:from-purple-700 hover:to-pink-700 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                    <span>Logging in...</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-2xl group-hover:animate-bounce">🚀</span>
                                    <span>Login to TechnoFest</span>
                                    <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Additional Help */}
                    <div className="pt-2 animate-fade-in animation-delay-500">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                                <p className="text-xs text-gray-600 flex items-center gap-2">
                                    <span className="text-lg">✅</span>
                                    <span><strong>Secure</strong> Login</span>
                                </p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                                <p className="text-xs text-gray-600 flex items-center gap-2">
                                    <span className="text-lg">⚡</span>
                                    <span><strong>Fast</strong> Access</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center pt-4 animate-fade-in animation-delay-600">
                        <p className="text-sm text-gray-500">
                            Don't have an account?{' '}
                            <button 
                                type="button"
                                onClick={() => {
                                    onClose();
                                    navigate('/registration');
                                }}
                                className="text-purple-600 font-bold hover:text-pink-600 transition-colors duration-300 underline"
                            >
                                Register Now 🎉
                            </button>
                        </p>
                    </div>
                </form>

                {/* Inline Styles for Animations */}
                <style jsx>{`
                    @keyframes fade-in-down {
                        from { opacity: 0; transform: translateY(-20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    @keyframes slide-in-up {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    @keyframes slide-in-left {
                        from { opacity: 0; transform: translateX(-20px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    
                    @keyframes slide-in-right {
                        from { opacity: 0; transform: translateX(20px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    
                    @keyframes fade-in {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    
                    @keyframes bounce-slow {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                    
                    @keyframes pulse-slow {
                        0%, 100% { opacity: 0.5; }
                        50% { opacity: 0.8; }
                    }
                    
                    @keyframes spin-slow {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    .animate-fade-in-down {
                        animation: fade-in-down 0.5s ease-out;
                    }
                    
                    .animate-slide-in-up {
                        animation: slide-in-up 0.5s ease-out;
                    }
                    
                    .animate-slide-in-left {
                        animation: slide-in-left 0.5s ease-out;
                    }
                    
                    .animate-slide-in-right {
                        animation: slide-in-right 0.5s ease-out;
                    }
                    
                    .animate-fade-in {
                        animation: fade-in 0.5s ease-out forwards;
                        opacity: 0;
                    }
                    
                    .animate-bounce-slow {
                        animation: bounce-slow 2s ease-in-out infinite;
                    }
                    
                    .animate-pulse-slow {
                        animation: pulse-slow 2s ease-in-out infinite;
                    }
                    
                    .animate-spin-slow {
                        animation: spin-slow 3s linear infinite;
                    }
                    
                    .animation-delay-100 {
                        animation-delay: 100ms;
                    }
                    
                    .animation-delay-200 {
                        animation-delay: 200ms;
                    }
                    
                    .animation-delay-300 {
                        animation-delay: 300ms;
                    }
                    
                    .animation-delay-400 {
                        animation-delay: 400ms;
                    }
                    
                    .animation-delay-500 {
                        animation-delay: 500ms;
                    }
                    
                    .animation-delay-600 {
                        animation-delay: 600ms;
                    }
                `}</style>
            </div>
        </Modal>
    );
};

export default LoginModal;