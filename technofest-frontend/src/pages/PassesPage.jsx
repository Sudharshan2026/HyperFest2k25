import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Footer from '../components/common/Footer';
import { useNavigate } from 'react-router-dom';

const PassesPage = () => {
    const navigate = useNavigate();
    const { setSelectedPassType } = useContext(AppContext);

    const selectPass = (passType) => {
        if (setSelectedPassType) setSelectedPassType(passType);
        navigate('/registration');
    };

    return (
        <>
            <section id="passes" className="relative min-h-screen py-16 overflow-hidden">
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
                    <div className="text-center mb-16 animate-fade-in-down">
                        <div className="inline-block mb-4">
                            <span className="text-7xl animate-bounce-slow">🎟️</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg animate-text-shimmer bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent bg-[length:200%_auto]">
                            Choose Your Pass
                        </h2>
                        <p className="text-xl text-white/90 font-medium drop-shadow-md max-w-2xl mx-auto">
                            Select the perfect pass for your TechnoFest experience 🚀
                        </p>
                        
                        {/* Decorative Line */}
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-white to-transparent rounded-full animate-pulse"></div>
                            <span className="text-3xl text-yellow-300 animate-spin-slow">✨</span>
                            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-white to-transparent rounded-full animate-pulse"></div>
                        </div>
                    </div>

                    {/* Passes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {/* Day 1 Pass */}
                        <div className="group relative bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 hover:rotate-1 transition-all duration-500 animate-fade-in-up border-4 border-purple-200 hover:border-purple-400">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                            
                            <div className="p-8 text-center bg-gradient-to-br from-purple-50 to-pink-50">
                                <div className="text-5xl mb-3 group-hover:animate-bounce">🎫</div>
                                <h3 className="text-3xl font-bold text-gray-800 mb-2">Day 1 Pass</h3>
                                <div className="text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent my-4">
                                    ₹200
                                </div>
                            </div>
                            
                            <div className="p-8">
                                <p className="text-xl font-bold text-center mb-6 text-purple-600">
                                    📅 March 15, 2025
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start gap-3 text-gray-700">
                                        <span className="text-green-500 text-xl mt-0.5">✅</span>
                                        <span className="font-medium">Access to all Day 1 events</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-700">
                                        <span className="text-green-500 text-xl mt-0.5">✅</span>
                                        <span className="font-medium">Technical workshops</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-700">
                                        <span className="text-green-500 text-xl mt-0.5">✅</span>
                                        <span className="font-medium">Hackathon participation</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-700">
                                        <span className="text-green-500 text-xl mt-0.5">✅</span>
                                        <span className="font-medium">Lunch included</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-700">
                                        <span className="text-green-500 text-xl mt-0.5">✅</span>
                                        <span className="font-medium">Certificate eligible</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <button 
                                className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-3 group-hover:shadow-lg"
                                onClick={() => selectPass('day1')}
                            >
                                <span>Select Day 1 Pass</span>
                                <span className="group-hover:translate-x-2 transition-transform">→</span>
                            </button>
                        </div>

                        {/* Day 2 Pass */}
                        <div className="group relative bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105 hover:rotate-1 transition-all duration-500 animate-fade-in-up animation-delay-200 border-4 border-pink-200 hover:border-pink-400">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                            
                            <div className="p-8 text-center bg-gradient-to-br from-pink-50 to-purple-50">
                                <div className="text-5xl mb-3 group-hover:animate-bounce">🎭</div>
                                <h3 className="text-3xl font-bold text-gray-800 mb-2">Day 2 Pass</h3>
                                <div className="text-6xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent my-4">
                                    ₹200
                                </div>
                            </div>
                            
                            <div className="p-8">
                                <p className="text-xl font-bold text-center mb-6 text-pink-600">
                                    📅 March 16, 2025
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start gap-3 text-gray-700">
                                        <span className="text-green-500 text-xl mt-0.5">✅</span>
                                        <span className="font-medium">Access to all Day 2 events</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-700">
                                        <span className="text-green-500 text-xl mt-0.5">✅</span>
                                        <span className="font-medium">Cultural performances</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-700">
                                        <span className="text-green-500 text-xl mt-0.5">✅</span>
                                        <span className="font-medium">Sports tournaments</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-700">
                                        <span className="text-green-500 text-xl mt-0.5">✅</span>
                                        <span className="font-medium">Lunch included</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-700">
                                        <span className="text-green-500 text-xl mt-0.5">✅</span>
                                        <span className="font-medium">Certificate eligible</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <button 
                                className="w-full py-5 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-3 group-hover:shadow-lg"
                                onClick={() => selectPass('day2')}
                            >
                                <span>Select Day 2 Pass</span>
                                <span className="group-hover:translate-x-2 transition-transform">→</span>
                            </button>
                        </div>

                        {/* 2-Day Pass - Featured */}
                        <div className="group relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-110 hover:rotate-2 transition-all duration-500 animate-fade-in-up animation-delay-400 border-4 border-yellow-300">
                            {/* Best Value Badge */}
                            <div className="absolute -top-3 -right-3 z-20">
                                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-extrabold px-6 py-3 rounded-full shadow-2xl animate-pulse border-4 border-white">
                                    ⭐ BEST VALUE
                                </div>
                            </div>
                            
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-orange-400"></div>
                            
                            <div className="p-8 text-center">
                                <div className="text-5xl mb-3 group-hover:animate-bounce">🎪</div>
                                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">2-Day Pass</h3>
                                <div className="text-6xl font-extrabold text-white my-4 drop-shadow-xl">
                                    ₹300
                                </div>
                                <div className="inline-block bg-yellow-400 text-purple-900 font-bold px-6 py-2 rounded-full text-xl shadow-lg animate-bounce-slow">
                                    💰 Save ₹100
                                </div>
                            </div>
                            
                            <div className="p-8">
                                <p className="text-xl font-bold text-center mb-6 text-yellow-200">
                                    📅 March 15-16, 2025
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start gap-3 text-white">
                                        <span className="text-yellow-300 text-xl mt-0.5">✅</span>
                                        <span className="font-semibold">Access to ALL events</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-white">
                                        <span className="text-yellow-300 text-xl mt-0.5">✅</span>
                                        <span className="font-semibold">Technical + Cultural events</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-white">
                                        <span className="text-yellow-300 text-xl mt-0.5">✅</span>
                                        <span className="font-semibold">Priority seating</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-white">
                                        <span className="text-yellow-300 text-xl mt-0.5">✅</span>
                                        <span className="font-semibold">Both day meals</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-white">
                                        <span className="text-yellow-300 text-xl mt-0.5">✅</span>
                                        <span className="font-semibold">Special networking session</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-white">
                                        <span className="text-yellow-300 text-xl mt-0.5">✅</span>
                                        <span className="font-semibold">Premium certificate</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <button 
                                className="w-full py-5 bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 font-extrabold text-lg hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 flex items-center justify-center gap-3 group-hover:shadow-2xl"
                                onClick={() => selectPass('both')}
                            >
                                <span>Select 2-Day Pass</span>
                                <span className="group-hover:translate-x-2 transition-transform text-2xl">🚀</span>
                            </button>
                        </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border-4 border-white/50 animate-fade-in-up animation-delay-600">
                        <div className="text-center mb-12">
                            <div className="inline-block mb-4">
                                <span className="text-6xl animate-bounce-slow">🎁</span>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                                What's Included
                            </h3>
                            <p className="text-xl text-gray-600">Amazing perks with every pass</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Benefit 1 */}
                            <div className="group text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:shadow-xl hover:-translate-y-3 transition-all duration-300 border-2 border-purple-200 hover:border-purple-400">
                                <div className="text-6xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform">🍽️</div>
                                <h4 className="text-2xl font-bold text-gray-800 mb-3">Meals Included</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    Complimentary lunch based on your pass selection
                                </p>
                            </div>

                            {/* Benefit 2 */}
                            <div className="group text-center p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl hover:shadow-xl hover:-translate-y-3 transition-all duration-300 border-2 border-pink-200 hover:border-pink-400">
                                <div className="text-6xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform">📜</div>
                                <h4 className="text-2xl font-bold text-gray-800 mb-3">Certificates</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    Official participation certificates for attended events
                                </p>
                            </div>

                            {/* Benefit 3 */}
                            <div className="group text-center p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl hover:shadow-xl hover:-translate-y-3 transition-all duration-300 border-2 border-indigo-200 hover:border-indigo-400">
                                <div className="text-6xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform">🎁</div>
                                <h4 className="text-2xl font-bold text-gray-800 mb-3">Digital Goodie Bag</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    Sponsor offers, discount coupons, and exclusive content
                                </p>
                            </div>

                            {/* Benefit 4 */}
                            <div className="group text-center p-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl hover:shadow-xl hover:-translate-y-3 transition-all duration-300 border-2 border-purple-200 hover:border-purple-400">
                                <div className="text-6xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform">💬</div>
                                <h4 className="text-2xl font-bold text-gray-800 mb-3">24/7 Support</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    Helpdesk and on-ground assistance throughout the event
                                </p>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-12 text-center">
                            <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-8 py-4 border-2 border-purple-300">
                                <p className="text-lg font-bold text-purple-700">
                                    🎉 Limited slots available! Book your pass now!
                                </p>
                            </div>
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
                    
                    @keyframes spin-slow {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    @keyframes bounce-slow {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-20px); }
                    }
                    
                    @keyframes fade-in-down {
                        from { opacity: 0; transform: translateY(-30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    @keyframes fade-in-up {
                        from { opacity: 0; transform: translateY(30px); }
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
                    
                    .animate-spin-slow {
                        animation: spin-slow 3s linear infinite;
                    }
                    
                    .animate-bounce-slow {
                        animation: bounce-slow 3s ease-in-out infinite;
                    }
                    
                    .animate-fade-in-down {
                        animation: fade-in-down 0.6s ease-out;
                    }
                    
                    .animate-fade-in-up {
                        animation: fade-in-up 0.6s ease-out forwards;
                        opacity: 0;
                    }
                    
                    .animation-delay-200 {
                        animation-delay: 200ms;
                    }
                    
                    .animation-delay-400 {
                        animation-delay: 400ms;
                    }
                    
                    .animation-delay-600 {
                        animation-delay: 600ms;
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

export default PassesPage;