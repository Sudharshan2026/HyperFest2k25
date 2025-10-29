import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal';

// Load the necessary library dynamically
const QR_CODE_READER_URL = 'https://unpkg.com/html5-qrcode/minified/html5-qrcode.min.js';

const QRScannerModal = ({ isOpen, onClose, onScanSuccess }) => {
    const qrCodeRegionId = "qr-code-reader";
    const qrCodeScanner = useRef(null);
    const [scanError, setScanError] = useState(null);
    const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

    // --- Dynamic Script Loading ---
    useEffect(() => {
        if (typeof window.Html5Qrcode === 'undefined') {
            const script = document.createElement('script');
            script.src = QR_CODE_READER_URL;
            script.onload = () => {
                setIsLibraryLoaded(true);
            };
            document.body.appendChild(script);
        } else {
            setIsLibraryLoaded(true);
        }
    }, []);

    // --- Scanner Initialization and Control ---
    useEffect(() => {
        if (!isOpen || !isLibraryLoaded || !window.Html5Qrcode) {
            if (qrCodeScanner.current) {
                // Stop the scanner when the modal is closed
                qrCodeScanner.current.stop().catch(() => {});
                qrCodeScanner.current = null;
            }
            return;
        }

        const config = {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            supportedScanTypes: [window.Html5QrcodeSupportedFormats.QR_CODE]
        };

        const html5QrCode = new window.Html5Qrcode(qrCodeRegionId);
        qrCodeScanner.current = html5QrCode;
        setScanError(null);

        // Start scanning
        qrCodeScanner.current.start(
            { facingMode: "environment" },
            config,
            (decodedText, decodedResult) => {
                qrCodeScanner.current.stop().then(() => {
                    onScanSuccess(decodedText);
                    onClose();
                }).catch(() => {
                    onScanSuccess(decodedText);
                    onClose();
                });
            },
            (errorMessage) => {
                // Ignore continuous scanning errors
            }
        ).catch((err) => {
            setScanError(`Camera startup failed: ${err.message || 'Check camera permissions.'}`);
            qrCodeScanner.current = null;
        });

        // Cleanup function
        return () => {
            if (qrCodeScanner.current) {
                qrCodeScanner.current.stop().catch(() => {});
                qrCodeScanner.current = null;
            }
        };
    }, [isOpen, isLibraryLoaded, onScanSuccess, onClose]);

    const title = scanError ? "Error Accessing Camera" : "Scan Payment QR Code";

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="p-4 text-center">
                {scanError ? (
                    <div className="text-red-500 font-medium">{scanError}</div>
                ) : !isLibraryLoaded ? (
                    <div className="text-blue-500">Loading scanner library...</div>
                ) : (
                    <>
                        <div id={qrCodeRegionId} style={{ width: "100%" }}></div>
                        <p className="text-sm text-gray-500 mt-2">
                            Position the payment QR code within the box.
                        </p>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default QRScannerModal;