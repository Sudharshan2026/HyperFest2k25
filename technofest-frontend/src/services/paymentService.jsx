import apiClient from './apiClient';

/**
 * initiateCheckout
 * - Preferred flow (server-side): POST to /checkout/create-session with pass details and tenant info.
 * - Backend returns a Stripe Checkout Session ID -> client redirects using stripe.redirectToCheckout({ sessionId })
 *
 * For now this is a stub that calls backend and expects { sessionId }.
 *
 * Replace the `window.Stripe(...)` call with your own Stripe publishable key or use Stripe Elements.
 */
export const initiateCheckout = async ({ passType, price, passId }) => {
  // server should create a Stripe session and return the sessionId
  const payload = { passType, price, passId };
  const { data } = await apiClient.post('/checkout/create-session', payload);
  if (!data || !data.sessionId) {
    throw new Error('No sessionId returned from backend');
  }

  // client-side redirect to stripe checkout
  if (!window.Stripe) {
    console.warn('Stripe.js not loaded - add <script src="https://js.stripe.com/v3/"></script> in index.html');
  }
  const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_PLACEHOLDER');

  const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });
  if (result && result.error) {
    throw result.error;
  }
  return result;
};
