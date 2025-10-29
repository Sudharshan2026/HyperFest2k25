import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [modal, setModal] = useState(null);
    const [eventToEdit, setEventToEdit] = useState(null);
    const [selectedPassType, setSelectedPassType] = useState(null);
    const [currentUser, setCurrentUser] = useState(() => {
        // load from localStorage if exists
        const stored = localStorage.getItem('currentUser');
        return stored ? JSON.parse(stored) : null;
    });
    const [alert, setAlert] = useState({ message: '', type: '' });

    const showModal = (modalType, eventData = null) => {
        setModal(modalType);
        setEventToEdit(eventData);
    };

    const showAlert = (message, type = 'info') => {
        setAlert({ message, type });
        setTimeout(() => setAlert({ message: '', type: '' }), 3000);
    };

    return (
        <AppContext.Provider
            value={{
                modal,
                eventToEdit,
                showModal,
                selectedPassType,
                setSelectedPassType,
                currentUser,
                setCurrentUser,
                alert,
                showAlert,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
