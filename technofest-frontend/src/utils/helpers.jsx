// --- All helper functions from your original script.js are refactored here ---

export function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5 }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 2 } },
            "interactivity": { "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } } },
            "retina_detect": true
        });
    }
}

export function initializeCountdown() {
    const eventDate = new Date('March 15, 2025 00:00:00').getTime();
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = eventDate - now;
        if (distance < 0) {
            document.getElementById('countdownTimer').innerHTML = "<div class='event-started'>🎉 EVENT LIVE NOW!</div>";
            return;
        }
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerText = (id === 'days' ? d : id === 'hours' ? h : id === 'minutes' ? m : s).toString().padStart(2, '0');
        });
    };
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval); // Cleanup function
}

export function validateRegistrationForm(formData) {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.role || !formData.department || !formData.college || !formData.passType) {
        return { success: false, message: 'Please fill all required fields.' };
    }
    if (!/^\d{10}$/.test(formData.phone)) {
        return { success: false, message: 'Please enter a valid 10-digit phone number.' };
    }
    return { success: true };
}

export const passDetails = {
    day1: { name: 'Day 1 Pass', date: 'March 15, 2025', amount: 200 },
    day2: { name: 'Day 2 Pass', date: 'March 16, 2025', amount: 200 },
    both: { name: '2-Day Pass', date: 'March 15-16, 2025', amount: 300 }
};

export const simulateUPIPayment = (upiId, txnId) => {
    if (!upiId || !txnId) {
        return { success: false, message: 'Please fill all required fields.' };
    }
    const upiRegex = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{2,}$/;
    if (!upiRegex.test(upiId)) {
        return { success: false, message: 'Invalid UPI ID format. Example: john@upi or 9876543210@ybl' };
    }
    if (txnId.length < 5) {
        return { success: false, message: 'Transaction ID must be at least 5 characters.' };
    }
    return `{ success: true, message: Your payment via UPI (${upiId}) is confirmed. }`;
};