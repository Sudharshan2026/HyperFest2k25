import React, { useState, useEffect } from 'react';
import { api } from '../api';
import Footer from '../components/common/Footer';

const SchedulePage = () => {
    const [schedule, setSchedule] = useState([]);
    const [filterDay, setFilterDay] = useState('all');

    useEffect(() => {
        api.getSchedule().then(data => setSchedule(data));
    }, []);

    const filteredSchedule = filterDay === 'all' ? schedule : schedule.filter(s => s.day === filterDay);

    const getDayTitle = (day) => {
        if (day === 'day1') return 'Day 1 - March 15';
        if (day === 'day2') return 'Day 2 - March 16';
        return '';
    };

    const groupedSchedule = filteredSchedule.reduce((acc, event) => {
        const day = event.day;
        if (!acc[day]) acc[day] = [];
        acc[day].push(event);
        return acc;
    }, {});

    return (
        <>
            <section id="schedule" className="relative min-h-screen py-16 overflow-hidden">
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
                            <span className="text-7xl animate-bounce-slow">📅</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg animate-text-shimmer bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent bg-[length:200%_auto]">
                            Event Schedule
                        </h2>
                        <p className="text-xl text-white/90 font-medium drop-shadow-md">
                            Complete timeline of TechnoFest 2025 🗓️
                        </p>
                        
                        {/* Decorative Line */}
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-white to-transparent rounded-full animate-pulse"></div>
                            <span className="text-3xl text-yellow-300 animate-spin-slow">✨</span>
                            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-white to-transparent rounded-full animate-pulse"></div>
                        </div>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up">
                        <button 
                            className={`group px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-110 ${
                                filterDay === 'all' 
                                    ? 'bg-white text-purple-600 shadow-2xl scale-110' 
                                    : 'bg-white/20 backdrop-blur-lg text-white border-2 border-white/50 hover:bg-white/30'
                            }`}
                            onClick={() => setFilterDay('all')}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-2xl">🌟</span>
                                <span>All Days</span>
                            </span>
                        </button>
                        <button 
                            className={`group px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-110 ${
                                filterDay === 'day1' 
                                    ? 'bg-white text-purple-600 shadow-2xl scale-110' 
                                    : 'bg-white/20 backdrop-blur-lg text-white border-2 border-white/50 hover:bg-white/30'
                            }`}
                            onClick={() => setFilterDay('day1')}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-2xl">🌅</span>
                                <span>Day 1 - March 15</span>
                            </span>
                        </button>
                        <button 
                            className={`group px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-110 ${
                                filterDay === 'day2' 
                                    ? 'bg-white text-purple-600 shadow-2xl scale-110' 
                                    : 'bg-white/20 backdrop-blur-lg text-white border-2 border-white/50 hover:bg-white/30'
                            }`}
                            onClick={() => setFilterDay('day2')}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-2xl">🌆</span>
                                <span>Day 2 - March 16</span>
                            </span>
                        </button>
                    </div>

                    {/* Schedule Container */}
                    <div className="space-y-8">
                        {Object.keys(groupedSchedule).map((day, dayIndex) => (
                            <div 
                                key={day} 
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${dayIndex * 200}ms` }}
                            >
                                {/* Day Header */}
                                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-3xl p-6 shadow-xl">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                                            <span className="text-4xl">
                                                {day === 'day1' ? '🌅' : '🌆'}
                                            </span>
                                            <span>{getDayTitle(day)}</span>
                                        </h3>
                                        <div className="bg-white/20 backdrop-blur-lg px-6 py-2 rounded-full">
                                            <span className="text-white font-bold">
                                                {groupedSchedule[day].length} Events
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Events List */}
                                <div className="bg-white/95 backdrop-blur-xl rounded-b-3xl shadow-2xl border-4 border-white/50 overflow-hidden">
                                    {groupedSchedule[day].map((event, index) => (
                                        <div 
                                            key={index}
                                            className="group flex flex-col md:flex-row gap-6 p-6 border-b-2 border-purple-100 last:border-b-0 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 transform hover:scale-[1.02]"
                                        >
                                            {/* Time Section */}
                                            <div className="flex-shrink-0 md:w-48">
                                                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl p-6 text-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                    <div className="text-4xl mb-2">🕐</div>
                                                    <div className="text-2xl font-bold">{event.time}</div>
                                                </div>
                                            </div>

                                            {/* Event Details */}
                                            <div className="flex-1">
                                                <h4 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                                                    {event.name}
                                                </h4>
                                                <div className="flex flex-wrap gap-4">
                                                    <div className="flex items-center gap-2 bg-gradient-to-br from-blue-100 to-cyan-100 px-4 py-2 rounded-full border-2 border-blue-200">
                                                        <span className="text-xl">📍</span>
                                                        <span className="font-semibold text-gray-700">{event.venue}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 bg-gradient-to-br from-green-100 to-emerald-100 px-4 py-2 rounded-full border-2 border-green-200">
                                                        <span className="text-xl">🏷️</span>
                                                        <span className="font-semibold text-gray-700">{event.category}</span>
                                                    </div>
                                                    {event.department && (
                                                        <div className="flex items-center gap-2 bg-gradient-to-br from-orange-100 to-amber-100 px-4 py-2 rounded-full border-2 border-orange-200">
                                                            <span className="text-xl">🎓</span>
                                                            <span className="font-semibold text-gray-700">{event.department}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                {event.description && (
                                                    <p className="mt-3 text-gray-600 leading-relaxed">
                                                        {event.description}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Status Indicator */}
                                            <div className="flex-shrink-0 flex items-center">
                                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-slow shadow-lg"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Empty State */}
                        {filteredSchedule.length === 0 && (
                            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-white/50 p-16 text-center animate-bounce-in">
                                <div className="text-8xl mb-6 animate-bounce-slow">📭</div>
                                <h3 className="text-3xl font-bold text-gray-800 mb-3">
                                    No Events Scheduled
                                </h3>
                                <p className="text-xl text-gray-600">
                                    No events scheduled for this day. Check back later!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Legend Section */}
                    {filteredSchedule.length > 0 && (
                        <div className="mt-12 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-white/50 p-8 animate-fade-in animation-delay-600">
                            <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                📋 Legend
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                                    <span className="text-3xl">📍</span>
                                    <span className="font-semibold text-gray-700">Venue Location</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                                    <span className="text-3xl">🏷️</span>
                                    <span className="font-semibold text-gray-700">Event Category</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200">
                                    <span className="text-3xl">🎓</span>
                                    <span className="font-semibold text-gray-700">Department</span>
                                </div>
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
                    
                    @keyframes pulse-slow {
                        0%, 100% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.5); opacity: 0.5; }
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
                    
                    @keyframes bounce-in {
                        0% { opacity: 0; transform: scale(0.3); }
                        50% { transform: scale(1.05); }
                        70% { transform: scale(0.95); }
                        100% { opacity: 1; transform: scale(1); }
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
                    
                    .animate-pulse-slow {
                        animation: pulse-slow 2s ease-in-out infinite;
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
                    
                    .animate-bounce-in {
                        animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
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

export default SchedulePage;