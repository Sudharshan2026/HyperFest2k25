const API_BASE_URL = 'http://localhost:8080/api/payments'; // **IMPORTANT: Change this to your actual backend API URL**

/**
 * Utility function to get the authentication token from storage.
 * @returns {string | null} The authentication token.
 */
function getAuthToken() {
    return localStorage.getItem('authToken');
}

/**
 * Fetches the list of available payment methods (e.g., Stripe, PayPal).
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of payment methods.
 */
async function fetchPaymentOptions() {
    try {
        const response = await fetch(`${API_BASE_URL}/options`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (response.status === 401) {
            throw new Error('Authentication required to fetch payment options.');
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch payment options.');
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching payment options:", error);
        throw error;
    }
}

/**
 * Initiates a payment process for a specific pass selection.
 * @param {string} passId The ID of the pass being purchased.
 * @param {string} method The selected payment method (e.g., 'stripe', 'paypal').
 * @returns {Promise<Object>} A promise that resolves with the payment gateway details (e.g., a URL to redirect to).
 */
async function initiatePayment(passId, method) {
    if (!passId || !method) {
        throw new Error("Pass ID and Payment Method are required to initiate payment.");
    }

    try {
        const response = await fetch(`${API_BASE_URL}/initiate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify({ passId: passId, paymentMethod: method })
        });

        if (response.status === 401) {
            throw new Error('Authentication required to initiate payment.');
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Payment initiation failed.');
        }

        return await response.json();
    } catch (error) {
        console.error("Error initiating payment:", error);
        throw error;
    }
}

/**
 * Verifies the status of a completed payment.
 * This is typically called after the user is redirected back from a payment gateway.
 * @param {string} transactionId The unique ID generated for the transaction (often returned by the backend in the initiate step).
 * @returns {Promise<Object>} A promise that resolves with the payment status (e.g., { status: 'paid', details: { ... } }).
 */
async function verifyPaymentStatus(transactionId) {
    if (!transactionId) {
        throw new Error("Transaction ID is required to verify payment status.");
    }

    try {
        const response = await fetch(`${API_BASE_URL}/verify/${transactionId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (response.status === 401) {
            throw new Error('Authentication required to verify payment status.');
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Payment verification failed.');
        }

        return await response.json();
    } catch (error) {
        console.error("Error verifying payment status:", error);
        throw error;
    }
}

// Export the functions to be used by other parts of your application
// (e.g., your main registration or payment processing script)
// Note: If you are not using modules, you would simply expose these functions globally
// or attach them to a global object.
export {
    fetchPaymentOptions,
    initiatePayment,
    verifyPaymentStatus
};