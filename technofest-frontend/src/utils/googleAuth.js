// Google Auth configuration utility
export const initializeGoogleAuth = (clientId, callback) => {
    return new Promise((resolve, reject) => {
        try {
            const origin = window.location.origin;
            console.log('Initializing Google Sign-In with:', {
                clientId,
                origin
            });

            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: callback,
                auto_select: false,
                context: 'signin',
                ux_mode: 'popup',
                cancel_on_tap_outside: true
            });

            resolve(true);
        } catch (error) {
            console.error('Google Sign-In initialization error:', error);
            reject(error);
        }
    });
};