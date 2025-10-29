import React, { useEffect } from 'react';
import { initializeCountdown } from '../utils/helpers';
import { motion } from 'framer-motion';
import { FaTrophy, FaUsers, FaCalendarCheck, FaArrowRight, FaTicketAlt } from 'react-icons/fa';
import Footer from '../components/common/Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const cleanup = initializeCountdown();
        return cleanup;
    }, []);

    return (
        <>
            <section id="home" className="relative overflow-hidden">
                {/* Hero Section with Animated Background */}
                <div className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 text-white overflow-hidden min-h-screen">
                    {/* Animated Background Overlay */}
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2070&q=80')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}></div>

                    {/* Floating Orbs */}
                    <div className="absolute top-20 left-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute top-40 right-10 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

                    {/* Animated Grid Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-grid-pattern animate-grid-move"></div>
                    </div>

                    {/* Hero Content */}
                    <div className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center z-10">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.6 }}
                        >
                            {/* Date Badge */}
                            <div className="inline-flex items-center bg-white/20 backdrop-blur-lg px-6 py-2 rounded-full mb-6 border-2 border-white/30 shadow-lg animate-bounce-slow">
                                <span className="text-sm font-bold tracking-widest">🗓️ MARCH 15-17, 2025</span>
                            </div>

                            {/* Main Title */}
                            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                                <motion.span 
                                    className="block animate-fade-in-down"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    WELCOME TO
                                </motion.span>
                                <motion.span 
                                    className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_auto]"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    TECHNO<span className="text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.8)]">FEST</span>
                                </motion.span>
                                <motion.span 
                                    className="block text-white drop-shadow-lg"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    2025 ✨
                                </motion.span>
                            </h1>

                            {/* Description */}
                            <motion.p 
                                className="text-xl text-white/95 max-w-xl leading-relaxed mb-8 drop-shadow-md"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                Experience the ultimate fusion of technology, creativity, and competition. 
                                Join thousands of brilliant minds in the most spectacular college festival of the year! 🚀
                            </motion.p>

                            {/* Stats Cards */}
                            <motion.div 
                                className="grid grid-cols-3 gap-4 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                            >
                                <div className="text-center bg-white/15 backdrop-blur-lg rounded-2xl p-5 border-2 border-white/20 hover:scale-110 hover:bg-white/25 transition-all duration-300 shadow-xl group">
                                    <FaTrophy className="text-3xl mx-auto mb-2 text-yellow-300 group-hover:animate-bounce" />
                                    <div className="text-3xl font-extrabold text-white">₹5L+</div>
                                    <div className="text-xs uppercase tracking-wider text-white/90">Prize Pool</div>
                                </div>
                                <div className="text-center bg-white/15 backdrop-blur-lg rounded-2xl p-5 border-2 border-white/20 hover:scale-110 hover:bg-white/25 transition-all duration-300 shadow-xl group">
                                    <FaUsers className="text-3xl mx-auto mb-2 text-pink-300 group-hover:animate-bounce" />
                                    <div className="text-3xl font-extrabold text-white">10K+</div>
                                    <div className="text-xs uppercase tracking-wider text-white/90">Participants</div>
                                </div>
                                <div className="text-center bg-white/15 backdrop-blur-lg rounded-2xl p-5 border-2 border-white/20 hover:scale-110 hover:bg-white/25 transition-all duration-300 shadow-xl group">
                                    <FaCalendarCheck className="text-3xl mx-auto mb-2 text-green-300 group-hover:animate-bounce" />
                                    <div className="text-3xl font-extrabold text-white">50+</div>
                                    <div className="text-xs uppercase tracking-wider text-white/90">Events</div>
                                </div>
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div 
                                className="flex flex-wrap gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                            >
                                <button 
                                    className="group relative px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-full shadow-2xl hover:shadow-pink-500/50 hover:-translate-y-2 transition-all duration-300 flex items-center gap-3 overflow-hidden"
                                    onClick={() => navigate('/passes')}
                                >
                                    <span className="relative z-10">GET YOUR PASS</span>
                                    <FaTicketAlt className="relative z-10 group-hover:rotate-12 transition-transform" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>
                                <button 
                                    className="group px-8 py-4 bg-transparent text-white font-bold text-lg rounded-full border-3 border-white hover:bg-white hover:text-purple-600 shadow-xl transition-all duration-300 flex items-center gap-3"
                                    onClick={() => navigate('/events')}
                                >
                                    EXPLORE EVENTS
                                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </motion.div>
                        </motion.div>

                        {/* Pass Cards Section */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-col gap-5 max-w-md mx-auto"
                        >
                            {/* Day 1 Pass */}
                            <motion.div 
                                className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 text-center border-t-8 border-purple-500 shadow-2xl hover:scale-105 hover:rotate-1 transition-all duration-300 group"
                                whileHover={{ y: -10 }}
                            >
                                <div className="text-4xl mb-3 group-hover:animate-bounce">🎫</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Day 1 Pass</h3>
                                <p className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">₹200</p>
                                <p className="text-gray-600 font-semibold">📅 March 15, 2025</p>
                            </motion.div>

                            {/* Day 2 Pass */}
                            <motion.div 
                                className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 text-center border-t-8 border-pink-500 shadow-2xl hover:scale-105 hover:rotate-1 transition-all duration-300 group"
                                whileHover={{ y: -10 }}
                            >
                                <div className="text-4xl mb-3 group-hover:animate-bounce">🎟️</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Day 2 Pass</h3>
                                <p className="text-5xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">₹200</p>
                                <p className="text-gray-600 font-semibold">📅 March 16, 2025</p>
                            </motion.div>

                            {/* 2-Day Pass - Featured */}
                            <motion.div 
                                className="relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 text-center shadow-2xl hover:scale-105 hover:rotate-1 transition-all duration-300 group border-4 border-yellow-300"
                                whileHover={{ y: -10 }}
                            >
                                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-extrabold px-5 py-2 rounded-full shadow-lg animate-pulse">
                                    💰 Save ₹100
                                </div>
                                <div className="text-4xl mb-3 group-hover:animate-bounce">🎪</div>
                                <h3 className="text-2xl font-bold text-white mb-2">2-Day Pass</h3>
                                <p className="text-5xl font-extrabold text-white mb-2 drop-shadow-lg">₹300</p>
                                <p className="text-white/90 font-semibold">📅 March 15-16, 2025</p>
                                <div className="mt-4 inline-block bg-white/20 backdrop-blur px-4 py-1 rounded-full">
                                    <span className="text-xs font-bold text-white">⭐ BEST VALUE</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Countdown Section */}
                <div className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-16 overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-grid-pattern animate-grid-move"></div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-6 z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-center mb-10">
                                <span className="text-5xl mb-4 inline-block animate-bounce-slow">⏰</span>
                                <h2 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent">
                                    Event Countdown
                                </h2>
                                <p className="text-xl text-white/80">The excitement is building up! ⚡</p>
                            </div>

                            <div className="flex items-center justify-center gap-6 flex-wrap" id="countdownTimer">
                                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-center min-w-[130px] border-2 border-white/20 hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-2xl group">
                                    <span className="block text-6xl font-extrabold text-yellow-300 mb-2 group-hover:animate-pulse" id="days">00</span>
                                    <span className="uppercase text-sm font-bold tracking-widest text-white/90">Days</span>
                                </div>
                                <div className="text-4xl text-pink-300 animate-pulse hidden md:block">:</div>
                                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-center min-w-[130px] border-2 border-white/20 hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-2xl group">
                                    <span className="block text-6xl font-extrabold text-pink-300 mb-2 group-hover:animate-pulse" id="hours">00</span>
                                    <span className="uppercase text-sm font-bold tracking-widest text-white/90">Hours</span>
                                </div>
                                <div className="text-4xl text-purple-300 animate-pulse hidden md:block">:</div>
                                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-center min-w-[130px] border-2 border-white/20 hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-2xl group">
                                    <span className="block text-6xl font-extrabold text-purple-300 mb-2 group-hover:animate-pulse" id="minutes">00</span>
                                    <span className="uppercase text-sm font-bold tracking-widest text-white/90">Minutes</span>
                                </div>
                                <div className="text-4xl text-green-300 animate-pulse hidden md:block">:</div>
                                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-center min-w-[130px] border-2 border-white/20 hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-2xl group">
                                    <span className="block text-6xl font-extrabold text-green-300 mb-2 group-hover:animate-pulse" id="seconds">00</span>
                                    <span className="uppercase text-sm font-bold tracking-widest text-white/90">Seconds</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Info Cards Section */}
                <div className="relative py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-10 right-10 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute bottom-10 left-10 w-72 h-72 bg-pink-200 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                    <div className="relative max-w-7xl mx-auto px-6 z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Quick Information 📋
                            </h2>
                            <p className="text-xl text-gray-600">Everything you need to know at a glance</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div 
                                className="group bg-white/80 backdrop-blur-lg rounded-3xl p-8 text-center shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-3 transition-all duration-300 border-4 border-purple-200 hover:border-purple-400"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📅</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">EVENT DATES</h3>
                                <p className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                    March 15-16, 2025
                                </p>
                                <span className="text-gray-600 font-semibold">2 Days of Innovation</span>
                            </motion.div>

                            <motion.div 
                                className="group bg-white/80 backdrop-blur-lg rounded-3xl p-8 text-center shadow-2xl hover:shadow-pink-500/50 hover:-translate-y-3 transition-all duration-300 border-4 border-pink-200 hover:border-pink-400"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📍</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">VENUE</h3>
                                <p className="text-3xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                    College Campus
                                </p>
                                <span className="text-gray-600 font-semibold">Multiple Locations</span>
                            </motion.div>

                            <motion.div 
                                className="group bg-white/80 backdrop-blur-lg rounded-3xl p-8 text-center shadow-2xl hover:shadow-indigo-500/50 hover:-translate-y-3 transition-all duration-300 border-4 border-indigo-200 hover:border-indigo-400"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🎯</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">THEME</h3>
                                <p className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                    Future Tech Revolution
                                </p>
                                <span className="text-gray-600 font-semibold">Innovation Awaits</span>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Inline Styles for Animations */}
                <style jsx>{`
                    @keyframes blob {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        33% { transform: translate(30px, -50px) scale(1.1); }
                        66% { transform: translate(-20px, 20px) scale(0.9); }
                    }
                    
                    @keyframes grid-move {
                        0% { transform: translate(0, 0); }
                        100% { transform: translate(50px, 50px); }
                    }
                    
                    @keyframes text-shimmer {
                        0% { background-position: 0% 50%; }
                        100% { background-position: 200% 50%; }
                    }
                    
                    @keyframes bounce-slow {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-20px); }
                    }
                    
                    @keyframes fade-in-down {
                        from { opacity: 0; transform: translateY(-30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    .animate-blob {
                        animation: blob 7s infinite;
                    }
                    
                    .animate-grid-move {
                        background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
                        background-size: 50px 50px;
                        animation: grid-move 20s linear infinite;
                    }
                    
                    .animate-text-shimmer {
                        animation: text-shimmer 3s linear infinite;
                    }
                    
                    .animate-bounce-slow {
                        animation: bounce-slow 3s ease-in-out infinite;
                    }
                    
                    .animate-fade-in-down {
                        animation: fade-in-down 0.6s ease-out;
                    }
                    
                    .animation-delay-2000 {
                        animation-delay: 2s;
                    }
                    
                    .animation-delay-4000 {
                        animation-delay: 4s;
                    }
                    
                    .bg-grid-pattern {
                        background-image: radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
                        background-size: 50px 50px;
                    }
                `}</style>
            </section>
        </>
    );
};

export default Home;