import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Footer from '../components/common/Footer';

const ContactPage = () => {
    const { showAlert } = useContext(AppContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        showAlert('Message sent. Thank you for contacting us!', 'success');
        e.target.reset();
    };

    return (
        <>
            <section className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-white/90 flex items-center justify-center gap-2">
                            We'd love to hear from you! 💬
                        </p>
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <div className="h-1 w-24 bg-yellow-400 rounded"></div>
                            <span className="text-3xl">✨</span>
                            <div className="h-1 w-24 bg-yellow-400 rounded"></div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Contact Info Cards */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-4 border-white hover:scale-105 transition-transform duration-300">
                                <div className="text-4xl mb-4">📍</div>
                                <h3 className="text-xl font-bold text-purple-900 mb-2">Address</h3>
                                <p className="text-gray-700">College Campus<br/>City, State - 123456</p>
                            </div>

                            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-4 border-white hover:scale-105 transition-transform duration-300">
                                <div className="text-4xl mb-4">📞</div>
                                <h3 className="text-xl font-bold text-purple-900 mb-2">Phone</h3>
                                <p className="text-gray-700">+91 98765 43210<br/>+91 87654 32109</p>
                            </div>

                            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-4 border-white hover:scale-105 transition-transform duration-300">
                                <div className="text-4xl mb-4">📧</div>
                                <h3 className="text-xl font-bold text-purple-900 mb-2">Email</h3>
                                <p className="text-gray-700">info@technofest2025.edu<br/>support@technofest2025.edu</p>
                            </div>

                            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-4 border-white hover:scale-105 transition-transform duration-300">
                                <div className="text-4xl mb-4">⏰</div>
                                <h3 className="text-xl font-bold text-purple-900 mb-2">Office Hours</h3>
                                <p className="text-gray-700">Mon - Fri: 9:00 AM - 6:00 PM<br/>Sat: 10:00 AM - 4:00 PM</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border-4 border-white">
                                <h2 className="text-3xl font-bold text-purple-900 mb-6">Send us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-gray-800 font-semibold mb-2">Name</label>
                                        <input 
                                            type="text" 
                                            required 
                                            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-colors bg-white text-gray-900 placeholder-gray-400"
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-800 font-semibold mb-2">Email</label>
                                        <input 
                                            type="email" 
                                            required 
                                            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-colors bg-white text-gray-900 placeholder-gray-400"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-800 font-semibold mb-2">Subject</label>
                                        <input 
                                            type="text" 
                                            required 
                                            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-colors bg-white text-gray-900 placeholder-gray-400"
                                            placeholder="What's this about?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-800 font-semibold mb-2">Message</label>
                                        <textarea 
                                            rows="6" 
                                            required 
                                            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-colors resize-none bg-white text-gray-900 placeholder-gray-400"
                                            placeholder="Tell us what's on your mind..."
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <span>✉️</span> Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </>
    );
};

export default ContactPage;