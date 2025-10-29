import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { AuthContext } from "../contexts/AuthContext";
import { validateRegistrationForm, passDetails } from "../utils/helpers";
import { api } from "../api";
import Footer from "../components/common/Footer";
import QRScannerModal from "../components/common/QRScannerModal";

const RegistrationPage = () => {
  const { currentUser, showModal, showAlert } = useContext(AppContext);
  const { refreshUserData } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    department: "",
    year: "",
    college: "",
    emergencyContact: "",
    passType: "",
    mealPref: "veg",
    tshirtSize: "m",
    needAccommodation: false,
    needTransport: false,
  });

  const [summary, setSummary] = useState({
    selectedPass: "Not selected",
    totalAmount: "₹0",
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [paymentRegData, setPaymentRegData] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: currentUser.fullName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        role: currentUser.role || "",
        department: currentUser.department || "",
        college: currentUser.college || "",
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePassChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, passType: value }));

    const pass = passDetails[value];
    if (pass) {
      setSummary({
        selectedPass: pass.name,
        totalAmount: `₹${pass.amount}`,
      });
    }
  };

  const openQrScanner = () => {
    setShowQrScanner(true);
  };

  const handleScanSuccess = async (scannedData) => {
    showAlert("QR Code scanned successfully. Processing payment...", "info");

    try {
      if (!paymentRegData) {
        showAlert("Error: Registration data missing for payment.", "error");
        return;
      }

      await api.processPayment({
        registrationId: paymentRegData.registrationId,
        method: "qr_scan",
        amount: paymentRegData.amount,
        transactionId: scannedData,
        upiId: null,
      });

      showAlert("Payment confirmed via QR scan!", "success");
      setPaymentRegData(null);
      setIsRegistered(false);

      if (typeof refreshUserData === "function") {
        await refreshUserData();
      }
    } catch (error) {
      showAlert(
        error.response?.data?.message ||
          "Payment verification failed. Please try manual entry.",
        "error"
      );
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    const validation = validateRegistrationForm(formData);
    if (!validation.success) {
      showAlert(validation.message, "error");
      return;
    }

    try {
      const newRegistration = await api.register(formData);

      if (newRegistration?.registrationId) {
        try {
          localStorage.setItem("registrationId", newRegistration.registrationId);
        } catch {}
      }

      setIsRegistered(true);

      const pass = passDetails[formData.passType];
      const dataForPayment = {
        ...newRegistration,
        passType: formData.passType,
        fullName: formData.fullName,
        amount: pass ? pass.amount : 0,
      };

      setPaymentRegData(dataForPayment);

      showModal("payment", {
        ...dataForPayment,
        openQrScanner: openQrScanner,
      });

      showAlert("Registration successful! Proceed to payment.", "success");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed!";
      showAlert(errorMessage, "error");
    }
  };

  return (
    <>
      <section id="registration" className="relative min-h-screen py-16 overflow-hidden">
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

        <div className="relative max-w-5xl mx-auto px-6 z-10">
          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-in-down">
            <div className="inline-block mb-4">
              <span className="text-7xl animate-bounce-slow">📝</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg animate-text-shimmer bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent bg-[length:200%_auto]">
              Event Registration
            </h2>
            <p className="text-xl text-white/90 font-medium drop-shadow-md">
              Complete your registration for TechnoFest 2025 🚀
            </p>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="h-1 w-24 bg-gradient-to-r from-transparent via-white to-transparent rounded-full animate-pulse"></div>
              <span className="text-3xl text-yellow-300 animate-spin-slow">✨</span>
              <div className="h-1 w-24 bg-gradient-to-r from-transparent via-white to-transparent rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Registration Form Container */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-white/50 p-8 md:p-12 animate-fade-in-up">
            <form onSubmit={handleRegistrationSubmit}>
              {/* Personal Information Section */}
              <div className="mb-10 animate-slide-in-left">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">👤</span>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-200 transition-all duration-300 bg-gradient-to-br from-pink-50 to-purple-50"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Role *
                    </label>
                    <select
                      id="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-200 transition-all duration-300 bg-gradient-to-br from-pink-50 to-purple-50 cursor-pointer"
                    >
                      <option value="">Select Role</option>
                      <option value="student">🎓 Student</option>
                      <option value="faculty">👨‍🏫 Faculty</option>
                      <option value="professional">💼 Professional</option>
                      <option value="alumni">🎖️ Alumni</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Department *
                    </label>
                    <select
                      id="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 transition-all duration-300 bg-gradient-to-br from-indigo-50 to-purple-50 cursor-pointer"
                    >
                      <option value="">Select Department</option>
                      <option value="cse">💻 Computer Science</option>
                      <option value="ece">📡 Electronics & Communication</option>
                      <option value="mech">⚙️ Mechanical</option>
                      <option value="civil">🏗️ Civil</option>
                      <option value="eee">⚡ Electrical & Electronics</option>
                      <option value="mba">📊 MBA</option>
                      <option value="other">🎯 Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Year of Study
                    </label>
                    <select
                      id="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 transition-all duration-300 bg-gradient-to-br from-indigo-50 to-purple-50 cursor-pointer"
                    >
                      <option value="">Select Year (if student)</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                      <option value="pg">Post Graduate</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="block text-gray-700 font-semibold mb-2">
                      College/Organization *
                    </label>
                    <input
                      type="text"
                      id="college"
                      value={formData.college}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50"
                      placeholder="Your college or organization"
                    />
                  </div>

                  <div className="form-group">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Emergency Contact
                    </label>
                    <input
                      type="tel"
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50"
                      placeholder="Guardian/Friend contact"
                    />
                  </div>
                </div>
              </div>

              {/* Pass Selection Section */}
              <div className="mb-10 animate-slide-in-right animation-delay-200">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">🎫</span>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Pass Selection
                  </h3>
                </div>

                <div className="space-y-4">
                  {Object.entries(passDetails).map(([key, pass]) => (
                    <label
                      key={key}
                      className={`group block cursor-pointer`}
                    >
                      <div
                        className={`p-6 rounded-2xl border-3 transition-all duration-300 ${
                          formData.passType === key
                            ? "border-purple-500 bg-gradient-to-br from-purple-100 to-pink-100 shadow-xl scale-105"
                            : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-lg"
                        } ${key === "both" ? "relative overflow-visible" : ""}`}
                      >
                        {key === "both" && (
                          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold px-4 py-2 rounded-full text-sm shadow-lg animate-pulse">
                            💰 Save ₹100
                          </div>
                        )}

                        <div className="flex items-start gap-4">
                          <input
                            type="radio"
                            id={`pass-${key}`}
                            name="passType"
                            value={key}
                            checked={formData.passType === key}
                            onChange={handlePassChange}
                            className="mt-1 w-5 h-5 text-purple-600 focus:ring-purple-500"
                          />
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-800 mb-2">
                              {pass.name} - <span className="text-purple-600">₹{pass.amount}</span>
                            </h4>
                            <p className="text-gray-600">{pass.description}</p>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preferences Section */}
              <div className="mb-10 animate-slide-in-left animation-delay-400">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">⚙️</span>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Preferences
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="form-group">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Meal Preference
                    </label>
                    <select
                      id="mealPref"
                      value={formData.mealPref}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 cursor-pointer"
                    >
                      <option value="veg">🥗 Vegetarian</option>
                      <option value="non-veg">🍗 Non-Vegetarian</option>
                      <option value="vegan">🌱 Vegan</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="block text-gray-700 font-semibold mb-2">
                      T-Shirt Size
                    </label>
                    <select
                      id="tshirtSize"
                      value={formData.tshirtSize}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50 cursor-pointer"
                    >
                      <option value="xs">XS</option>
                      <option value="s">S</option>
                      <option value="m">M</option>
                      <option value="l">L</option>
                      <option value="xl">XL</option>
                      <option value="xxl">XXL</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 cursor-pointer hover:border-purple-400 transition-all duration-300">
                    <input
                      type="checkbox"
                      id="needAccommodation"
                      checked={formData.needAccommodation}
                      onChange={handleChange}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-700 font-medium">
                      🏨 I need accommodation assistance (2-day pass only)
                    </span>
                  </label>

                  <label className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 cursor-pointer hover:border-blue-400 transition-all duration-300">
                    <input
                      type="checkbox"
                      id="needTransport"
                      checked={formData.needTransport}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700 font-medium">
                      🚌 I need transport assistance
                    </span>
                  </label>
                </div>
              </div>

              {/* Registration Summary */}
              <div className="mb-8 p-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl border-4 border-purple-300 shadow-xl animate-fade-in animation-delay-600">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">📋</span>
                  <h3 className="text-2xl font-bold text-purple-800">
                    Registration Summary
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                    <span className="font-semibold text-gray-700">Pass Type:</span>
                    <span className="font-bold text-purple-600 text-lg">
                      {isRegistered ? summary.selectedPass : "Not Registered"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                    <span className="font-semibold text-gray-700">Amount:</span>
                    <span className="font-bold text-pink-600 text-2xl">
                      {isRegistered ? summary.totalAmount : "₹0"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-2xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center gap-3 group"
              >
                <span className="text-2xl">💳</span>
                <span>Proceed to Payment</span>
                <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </form>
          </div>
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

          @keyframes slide-in-left {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes slide-in-right {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
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

          .animate-slide-in-left {
            animation: slide-in-left 0.6s ease-out;
          }

          .animate-slide-in-right {
            animation: slide-in-right 0.6s ease-out;
          }

          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }

          .animation-delay-200 {
            animation-delay: 200ms;
          }

          .animation-delay-400 {
            animation-delay: 400ms;
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

      <QRScannerModal
        isOpen={showQrScanner}
        onClose={() => setShowQrScanner(false)}
        onScanSuccess={handleScanSuccess}
      />
    </>
  );
};

export default RegistrationPage;