import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRocket,
  FaHome,
  FaCalendarAlt,
  FaTicketAlt,
  FaUserPlus,
  FaUserCircle,
  FaClock,
  FaImages,
  FaInfoCircle,
  FaEnvelope,
  FaShieldAlt,
  FaUsersCog,
  FaSignInAlt,
  FaSignOutAlt
} from 'react-icons/fa';

const Navbar = () => {
  const { currentUser, showModal, setCurrentUser, showAlert } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ripples, setRipples] = useState([]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    showAlert('Logged Out', 'success');
  };

  const handleLoginClick = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples(prev => [...prev, newRipple]);
    showModal('login');
  };

  const onAnimationEnd = (id) => {
    setRipples(prev => prev.filter(r => r.id !== id));
  };


  const links = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/events', label: 'Events', icon: <FaCalendarAlt /> },
    { to: '/passes', label: 'Passes', icon: <FaTicketAlt /> },
    { to: '/registration', label: 'Register', icon: <FaUserPlus /> },
    { to: '/myaccount', label: 'My Account', icon: <FaUserCircle /> },
    { to: '/schedule', label: 'Schedule', icon: <FaClock /> },
    { to: '/gallery', label: 'Gallery', icon: <FaImages /> },
    { to: '/about', label: 'About', icon: <FaInfoCircle /> },
    { to: '/contact', label: 'Contact', icon: <FaEnvelope /> }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/25 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          >
            <FaRocket className="text-pink-400 text-2xl" />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold text-white">TechnoFest</span>
              <span className="text-xs font-semibold text-white/70">2025</span>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.3 } }}
              >
                <Link
                  to={l.to}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {l.icon}
                  <span className="text-sm font-medium">{l.label}</span>
                </Link>
              </motion.div>
            ))}

            {currentUser?.role === 'admin' && (
              <Link
                to="/admin"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <FaShieldAlt />
                <span className="text-sm font-medium">Admin</span>
              </Link>
            )}

            {currentUser?.role === 'organizer' && (
              <Link
                to="/organizer"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <FaUsersCog />
                <span className="text-sm font-medium">Organizer</span>
              </Link>
            )}
          </div>

          {/* Right Section (Login/Profile + Mobile Toggle) */}
          <div className="flex items-center gap-3">
            {!currentUser ? (
              <button 
                onClick={handleLoginClick} 
                className="relative overflow-hidden text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                <FaSignInAlt /> Login
                {ripples.map(ripple => (
                  <span
                    key={ripple.id}
                    className="ripple-effect"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: ripple.size,
                      height: ripple.size,
                    }}
                    onAnimationEnd={() => onAnimationEnd(ripple.id)}
                  />
                ))}
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <FaUserCircle className="text-pink-300 text-2xl" />
                <span className="font-medium text-white">{currentUser.fullName}</span>
                <button
                  onClick={handleLogout}
                  className="text-white/70 hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <FaSignOutAlt className="text-lg" />
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col items-center justify-center w-9 h-9 rounded-md hover:bg-white/10"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white my-1 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden border-t border-white/10 bg-gray-900/80 backdrop-blur-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={toggleMenu}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {l.icon}
                  <span className="text-sm font-medium">{l.label}</span>
                </Link>
              ))}

              {currentUser?.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={toggleMenu}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <FaShieldAlt />
                  <span className="text-sm font-medium">Admin</span>
                </Link>
              )}

              {currentUser?.role === 'organizer' && (
                <Link
                  to="/organizer"
                  onClick={toggleMenu}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <FaUsersCog />
                  <span className="text-sm font-medium">Organizer</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(236, 72, 153, 0.5) 40%, rgba(168, 85, 247, 0.3) 80%, rgba(255, 255, 255, 0) 100%);
          transform: scale(0);
          animation: ripple 0.7s linear;
          pointer-events: none;
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
