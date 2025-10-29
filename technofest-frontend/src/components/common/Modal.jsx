import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ children, isOpen, onClose, title }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div className="fixed inset-0 z-[2000] bg-black/50 flex items-center justify-center p-4" onClick={onClose}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <motion.div className="bg-white rounded-xl shadow-2xl w-full max-w-lg relative max-h-[85vh] overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
                        <div className="sticky top-0 bg-white border-b border-slate-100 p-4 rounded-t-xl flex items-center justify-between">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">{title}</h3>
                            <button className="text-slate-500 hover:text-red-600 text-2xl leading-none" onClick={onClose}>&times;</button>
                        </div>
                        <div className="p-5">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
};

export default Modal;
