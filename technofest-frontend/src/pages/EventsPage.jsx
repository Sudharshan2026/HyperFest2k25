import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { api } from '../api';
import Footer from '../components/common/Footer';
import EventCard from '../components/event/EventCard';

const EventsPage = () => {
    const { currentUser, showModal, showAlert } = useContext(AppContext);
    const [events, setEvents] = useState([]);
    const [filters, setFilters] = useState({ category: 'all', day: 'all', dept: 'all' });

    useEffect(() => {
        api.getEvents().then(data => setEvents(Array.isArray(data) ? data : [])).catch(() => setEvents([]));
    }, []);

    const filteredEvents = events.filter(event => (
        (filters.category === 'all' || event.category === filters.category) &&
        (filters.day === 'all' || event.day === filters.day) &&
        (filters.dept === 'all' || event.dept === filters.dept)
    ));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const registerForEvent = (eventId) => {
        if (!currentUser) return showModal('login');
        if (!currentUser.registrationId) return showAlert('Complete main registration first', 'error');
        showAlert('You are registered for this event!', 'success');
    };

    return (
        <>
            <section id="events" className="relative min-h-screen py-16 overflow-hidden">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 opacity-95"></div>
                
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-grid-pattern animate-grid-move"></div>
                </div>

                {/* Floating Orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

                <div className="relative max-w-7xl mx-auto px-6 z-10">
                    {/* Header Section */}
                    <div className="text-center mb-12 animate-fade-in-down">
                        <div className="inline-block mb-4">
                            <span className="text-6xl animate-bounce-slow">🎉</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg animate-text-shimmer bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent bg-[length:200%_auto]">
                            Explore Events
                        </h2>
                        <p className="text-xl text-white/90 font-medium drop-shadow-md">
                            Discover amazing events across different categories 🚀
                        </p>
                        
                        {/* Decorative Line */}
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-white to-transparent rounded-full animate-pulse"></div>
                            <span className="text-2xl text-yellow-300 animate-spin-slow">✨</span>
                            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-white to-transparent rounded-full animate-pulse"></div>
                        </div>
                    </div>

                    {/* Filter Section */}
                    <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl p-8 mb-10 border-4 border-white/50 transform hover:scale-[1.02] transition-all duration-300 animate-fade-in-up">
                        <div className="flex items-center justify-center mb-6">
                            <span className="text-3xl mr-3">🔍</span>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Filter Events
                            </h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-6 items-end justify-center">
                            {/* Category Filter */}
                            <div className="flex flex-col gap-2 min-w-[200px] animate-slide-in-left">
                                <label className="font-bold text-gray-800 flex items-center gap-2">
                                    <span className="text-xl">🎯</span>
                                    Category:
                                </label>
                                <select 
                                    name="category" 
                                    value={filters.category} 
                                    onChange={handleChange} 
                                    className="px-4 py-3 border-3 border-purple-300 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 cursor-pointer font-semibold text-gray-700 hover:shadow-lg"
                                >
                                    <option value="all">✨ All Categories</option>
                                    <option value="technical">💻 Technical</option>
                                    <option value="cultural">🎭 Cultural</option>
                                    <option value="sports">⚽ Sports</option>
                                    <option value="workshop">🛠️ Workshops</option>
                                </select>
                            </div>

                            {/* Day Filter */}
                            <div className="flex flex-col gap-2 min-w-[200px] animate-slide-in-up animation-delay-200">
                                <label className="font-bold text-gray-800 flex items-center gap-2">
                                    <span className="text-xl">📅</span>
                                    Day:
                                </label>
                                <select 
                                    name="day" 
                                    value={filters.day} 
                                    onChange={handleChange} 
                                    className="px-4 py-3 border-3 border-pink-300 rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 focus:border-pink-500 focus:ring-4 focus:ring-pink-200 transition-all duration-300 cursor-pointer font-semibold text-gray-700 hover:shadow-lg"
                                >
                                    <option value="all">🌟 All Days</option>
                                    <option value="day1">🌅 Day 1 (March 15)</option>
                                    <option value="day2">🌆 Day 2 (March 16)</option>
                                </select>
                            </div>

                            {/* Department Filter */}
                            <div className="flex flex-col gap-2 min-w-[200px] animate-slide-in-right animation-delay-400">
                                <label className="font-bold text-gray-800 flex items-center gap-2">
                                    <span className="text-xl">🏛️</span>
                                    Department:
                                </label>
                                <select 
                                    name="dept" 
                                    value={filters.dept} 
                                    onChange={handleChange} 
                                    className="px-4 py-3 border-3 border-indigo-300 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 transition-all duration-300 cursor-pointer font-semibold text-gray-700 hover:shadow-lg"
                                >
                                    <option value="all">🎓 All Departments</option>
                                    <option value="cse">💾 Computer Science</option>
                                    <option value="ece">📡 Electronics</option>
                                    <option value="mech">⚙️ Mechanical</option>
                                    <option value="civil">🏗️ Civil</option>
                                    <option value="eee">⚡ Electrical & Electronics</option>
                                </select>
                            </div>
                        </div>

                        {/* Active Filter Badge */}
                        {(filters.category !== 'all' || filters.day !== 'all' || filters.dept !== 'all') && (
                            <div className="mt-6 text-center animate-fade-in">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg">
                                    <span>🎯</span>
                                    <span>{filteredEvents.length} Events Found</span>
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Events Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.length > 0 ? filteredEvents.map((event, index) => (
                            <div 
                                key={event.id}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <EventCard 
                                    event={{
                                        ...event,
                                        description: event.description || event.desc,
                                    }} 
                                    registerAction={registerForEvent} 
                                />
                            </div>
                        )) : (
                            <div className="col-span-full">
                                <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-16 text-center shadow-2xl border-4 border-white/50 animate-bounce-slow">
                                    <div className="text-8xl mb-6">🔍</div>
                                    <h3 className="text-3xl font-bold text-gray-800 mb-3">No Events Found</h3>
                                    <p className="text-xl text-gray-600">
                                        Try adjusting your filters to discover more events!
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Total Events Counter */}
                    {filteredEvents.length > 0 && (
                        <div className="mt-12 text-center animate-fade-in">
                            <div className="inline-block bg-white/90 backdrop-blur-lg rounded-full px-8 py-4 shadow-2xl border-4 border-white/50">
                                <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Showing {filteredEvents.length} of {events.length} Events 🎪
                                </p>
                            </div>
                        </div>
                    )}
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
                    
                    @keyframes fade-in {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    
                    @keyframes slide-in-left {
                        from { opacity: 0; transform: translateX(-50px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    
                    @keyframes slide-in-right {
                        from { opacity: 0; transform: translateX(50px); }
                        to { opacity: 1; transform: translateX(0); }
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
                    
                    .animate-fade-in {
                        animation: fade-in 0.5s ease-out;
                    }
                    
                    .animate-slide-in-left {
                        animation: slide-in-left 0.6s ease-out;
                    }
                    
                    .animate-slide-in-right {
                        animation: slide-in-right 0.6s ease-out;
                    }
                    
                    .animation-delay-200 {
                        animation-delay: 200ms;
                    }
                    
                    .animation-delay-400 {
                        animation-delay: 400ms;
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
                    
                    select option {
                        background: white;
                        color: #374151;
                        padding: 10px;
                    }
                `}</style>
            </section>
        </>
    );
};

export default EventsPage;