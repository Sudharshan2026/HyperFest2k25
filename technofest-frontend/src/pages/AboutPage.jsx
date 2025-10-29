import React from 'react';
import Footer from '../components/common/Footer';

const AboutPage = () => {
    return (
        <>
            <section className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-block bg-red-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-6">
                            ABOUT
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                            About TechnoFest
                        </h1>
                        <p className="text-white text-lg md:text-xl max-w-2xl mx-auto">
                            Learn more about our annual college festival 🎪
                        </p>
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <div className="h-1 w-24 bg-yellow-400 rounded-full"></div>
                            <span className="text-4xl">✨</span>
                            <div className="h-1 w-24 bg-yellow-400 rounded-full"></div>
                        </div>
                    </div>

                    {/* Vision Card */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl border-4 border-purple-300">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-5xl">🎯</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-purple-800">Our Vision</h2>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            TechnoFest 2025 aims to create a platform where innovation meets creativity, bringing together brilliant minds from various disciplines to showcase their talents and learn from each other.
                        </p>
                    </div>

                    {/* What We Offer */}
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl border-4 border-yellow-400">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="text-5xl">🎪</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white">What We Offer</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                                <span className="text-2xl flex-shrink-0">✅</span>
                                <span className="text-white font-medium">Technical competitions and hackathons</span>
                            </div>
                            <div className="flex items-start gap-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                                <span className="text-2xl flex-shrink-0">✅</span>
                                <span className="text-white font-medium">Cultural performances and art exhibitions</span>
                            </div>
                            <div className="flex items-start gap-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                                <span className="text-2xl flex-shrink-0">✅</span>
                                <span className="text-white font-medium">Sports tournaments and outdoor activities</span>
                            </div>
                            <div className="flex items-start gap-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                                <span className="text-2xl flex-shrink-0">✅</span>
                                <span className="text-white font-medium">Educational workshops and seminars</span>
                            </div>
                            <div className="flex items-start gap-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                                <span className="text-2xl flex-shrink-0">✅</span>
                                <span className="text-white font-medium">Networking opportunities with industry experts</span>
                            </div>
                            <div className="flex items-start gap-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                                <span className="text-2xl flex-shrink-0">✅</span>
                                <span className="text-white font-medium">Accommodation and transport assistance</span>
                            </div>
                            <div className="flex items-start gap-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 md:col-span-2">
                                <span className="text-2xl flex-shrink-0">✅</span>
                                <span className="text-white font-medium">Digital certificates and goodie bags</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-2xl p-8 text-center shadow-xl border-4 border-pink-300 hover:scale-105 transition-transform">
                            <div className="text-5xl mb-4">👥</div>
                            <h3 className="text-4xl font-black text-purple-700 mb-2">10,000+</h3>
                            <p className="text-gray-600 font-semibold">Expected Participants</p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 text-center shadow-xl border-4 border-blue-300 hover:scale-105 transition-transform">
                            <div className="text-5xl mb-4">📅</div>
                            <h3 className="text-4xl font-black text-purple-700 mb-2">50+</h3>
                            <p className="text-gray-600 font-semibold">Events & Competitions</p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 text-center shadow-xl border-4 border-yellow-300 hover:scale-105 transition-transform">
                            <div className="text-5xl mb-4">🏆</div>
                            <h3 className="text-4xl font-black text-purple-700 mb-2">₹5L+</h3>
                            <p className="text-gray-600 font-semibold">Prize Money</p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 text-center shadow-xl border-4 border-green-300 hover:scale-105 transition-transform">
                            <div className="text-5xl mb-4">🏢</div>
                            <h3 className="text-4xl font-black text-purple-700 mb-2">100+</h3>
                            <p className="text-gray-600 font-semibold">Partner Companies</p>
                        </div>
                    </div>
                </div>
            </section>
            
        </>
    );
};

export default AboutPage;