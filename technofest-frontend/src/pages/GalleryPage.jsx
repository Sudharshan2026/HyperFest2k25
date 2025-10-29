import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { api } from '../api';
import Footer from '../components/common/Footer';
import { motion } from 'framer-motion';

const GalleryPage = () => {
    const [gallery, setGallery] = useState([]);
    const [filterCategory, setFilterCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);

    // Fallback gallery data with placeholder images
    const fallbackGallery = [
        { id: 1, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500', title: 'Tech Workshop 2024', cat: 'workshops' },
        { id: 2, src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=500', title: 'Cultural Performance', cat: 'performances' },
        { id: 3, src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500', title: 'Hackathon Finals', cat: 'events' },
        { id: 4, src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500', title: 'Award Ceremony', cat: 'awards' },
        { id: 5, src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500', title: 'Coding Competition', cat: 'events' },
        { id: 6, src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500', title: 'Dance Performance', cat: 'performances' },
        { id: 7, src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500', title: 'AI Workshop', cat: 'workshops' },
        { id: 8, src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500', title: 'Team Building', cat: 'events' },
        { id: 9, src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500', title: 'Best Project Award', cat: 'awards' },
        { id: 10, src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500', title: 'Robotics Demo', cat: 'workshops' },
        { id: 11, src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500', title: 'Music Night', cat: 'performances' },
        { id: 12, src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500', title: 'Opening Ceremony', cat: 'events' },
        { id: 13, src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500', title: 'Web Dev Workshop', cat: 'workshops' },
        { id: 14, src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500', title: 'Drama Performance', cat: 'performances' },
        { id: 15, src: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500', title: 'Winner Celebration', cat: 'awards' },
        { id: 16, src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500', title: 'Team Collaboration', cat: 'events' },
        { id: 17, src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500', title: 'Design Thinking', cat: 'workshops' },
        { id: 18, src: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500', title: 'Band Performance', cat: 'performances' },
    ];

    useEffect(() => {
        api.getGallery()
            .then(data => {
                if (data && data.length > 0) {
                    setGallery(data);
                } else {
                    setGallery(fallbackGallery);
                }
            })
            .catch(() => setGallery(fallbackGallery));
    }, []);

    const filteredGallery = filterCategory === 'all' ? gallery : gallery.filter(g => g.cat === filterCategory);

    const openLightbox = (image) => {
        setSelectedImage(image);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <section id="gallery" className="relative min-h-screen py-16 overflow-hidden">
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
                            <span className="text-7xl animate-bounce-slow">📸</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg animate-text-shimmer bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent bg-[length:200%_auto]">
                            Gallery
                        </h2>
                        <p className="text-xl text-white/90 font-medium drop-shadow-md">
                            Memories from Previous TechnoFest Events 🎉
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
                            className={`group px-6 py-3 rounded-full font-bold text-base transition-all duration-300 transform hover:scale-110 ${
                                filterCategory === 'all' 
                                    ? 'bg-white text-purple-600 shadow-2xl scale-110' 
                                    : 'bg-white/20 backdrop-blur-lg text-white border-2 border-white/50 hover:bg-white/30'
                            }`}
                            onClick={() => setFilterCategory('all')}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-xl">🌟</span>
                                <span>All</span>
                            </span>
                        </button>
                        <button 
                            className={`group px-6 py-3 rounded-full font-bold text-base transition-all duration-300 transform hover:scale-110 ${
                                filterCategory === 'events' 
                                    ? 'bg-white text-purple-600 shadow-2xl scale-110' 
                                    : 'bg-white/20 backdrop-blur-lg text-white border-2 border-white/50 hover:bg-white/30'
                            }`}
                            onClick={() => setFilterCategory('events')}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-xl">🎪</span>
                                <span>Events</span>
                            </span>
                        </button>
                        <button 
                            className={`group px-6 py-3 rounded-full font-bold text-base transition-all duration-300 transform hover:scale-110 ${
                                filterCategory === 'performances' 
                                    ? 'bg-white text-purple-600 shadow-2xl scale-110' 
                                    : 'bg-white/20 backdrop-blur-lg text-white border-2 border-white/50 hover:bg-white/30'
                            }`}
                            onClick={() => setFilterCategory('performances')}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-xl">🎭</span>
                                <span>Performances</span>
                            </span>
                        </button>
                        <button 
                            className={`group px-6 py-3 rounded-full font-bold text-base transition-all duration-300 transform hover:scale-110 ${
                                filterCategory === 'workshops' 
                                    ? 'bg-white text-purple-600 shadow-2xl scale-110' 
                                    : 'bg-white/20 backdrop-blur-lg text-white border-2 border-white/50 hover:bg-white/30'
                            }`}
                            onClick={() => setFilterCategory('workshops')}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-xl">🛠️</span>
                                <span>Workshops</span>
                            </span>
                        </button>
                        <button 
                            className={`group px-6 py-3 rounded-full font-bold text-base transition-all duration-300 transform hover:scale-110 ${
                                filterCategory === 'awards' 
                                    ? 'bg-white text-purple-600 shadow-2xl scale-110' 
                                    : 'bg-white/20 backdrop-blur-lg text-white border-2 border-white/50 hover:bg-white/30'
                            }`}
                            onClick={() => setFilterCategory('awards')}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-xl">🏆</span>
                                <span>Awards</span>
                            </span>
                        </button>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredGallery.map((item, idx) => (
                            <motion.div 
                                className="group relative bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 cursor-pointer transform hover:scale-105 transition-all duration-300"
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ y: -10 }}
                                onClick={() => openLightbox(item)}
                            >
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <img 
                                        src={item.src} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Overlay Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h4 className="text-white font-bold text-lg mb-1 drop-shadow-lg">
                                        {item.title}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            {item.cat === 'events' && '🎪'}
                                            {item.cat === 'performances' && '🎭'}
                                            {item.cat === 'workshops' && '🛠️'}
                                            {item.cat === 'awards' && '🏆'}
                                            {' '}{item.cat}
                                        </span>
                                    </div>
                                </div>

                                {/* Corner Badge */}
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-lg text-purple-600 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-xl">🔍</span>
                                </div>
                            </motion.div>
                        ))}

                        {/* Empty State */}
                        {filteredGallery.length === 0 && (
                            <div className="col-span-full">
                                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-white/50 p-16 text-center animate-bounce-in">
                                    <div className="text-8xl mb-6 animate-bounce-slow">📭</div>
                                    <h3 className="text-3xl font-bold text-gray-800 mb-3">
                                        No Images Found
                                    </h3>
                                    <p className="text-xl text-gray-600">
                                        No images found in this category. Try selecting a different filter!
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Gallery Stats */}
                    {filteredGallery.length > 0 && (
                        <div className="mt-12 text-center animate-fade-in animation-delay-600">
                            <div className="inline-block bg-white/90 backdrop-blur-lg rounded-full px-8 py-4 shadow-2xl border-4 border-white/50">
                                <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Showing {filteredGallery.length} of {gallery.length} Photos 📷
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Lightbox Modal */}
                {selectedImage && (
                    <div 
                        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fade-in"
                        onClick={closeLightbox}
                    >
                        <button 
                            className="absolute top-6 right-6 bg-white/20 backdrop-blur-lg text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300 hover:rotate-90 hover:scale-110"
                            onClick={closeLightbox}
                        >
                            <span className="text-3xl">✕</span>
                        </button>
                        
                        <motion.div 
                            className="max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img 
                                src={selectedImage.src} 
                                alt={selectedImage.title} 
                                className="w-full h-auto max-h-[80vh] object-contain"
                            />
                            <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500">
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {selectedImage.title}
                                </h3>
                                <span className="inline-block bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-full font-semibold">
                                    {selectedImage.cat === 'events' && '🎪'}
                                    {selectedImage.cat === 'performances' && '🎭'}
                                    {selectedImage.cat === 'workshops' && '🛠️'}
                                    {selectedImage.cat === 'awards' && '🏆'}
                                    {' '}{selectedImage.cat}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                )}

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
                    
                    .animate-fade-in-down {
                        animation: fade-in-down 0.6s ease-out;
                    }
                    
                    .animate-fade-in-up {
                        animation: fade-in-up 0.6s ease-out forwards;
                        opacity: 0;
                    }
                    
                    .animate-fade-in {
                        animation: fade-in 0.3s ease-out;
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

export default GalleryPage;