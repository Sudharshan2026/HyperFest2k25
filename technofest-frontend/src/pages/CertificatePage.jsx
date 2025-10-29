// CertificatePage.jsx - WITHOUT Font Awesome
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import "./CertificatePage.css";
import { api } from '../api';

const CertificatePage = () => {
  const [certificateData, setCertificateData] = useState({
    name: 'Loading...',
    college: '',
    issueDate: '',
    coordinator: 'Event Coordinator',
    hod: 'Head of Department'
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const certificateRef = useRef(null);

  const { registrationId } = useParams();

  useEffect(() => {
    if (registrationId) {
      fetchCertificate(registrationId);
    }
  }, [registrationId]);

  const fetchCertificate = async (certId) => {
    try {
      // Fetch registration data using the registrationId
      const data = await api.getRegistrationById(certId);
      
      setCertificateData({
        name: data.full_name || 'Participant Name',
        college: data.college || 'College Name',
        issueDate: data.issueDate || 'March 16, 2025',
        coordinator: data.coordinator || 'Event Coordinator',
        hod: data.hod || 'Head of Department'
      });
    } catch (error) {
      console.error('Error fetching certificate:', error);
      setCertificateData({
        name: 'Error Loading',
        college: 'Please try again',
        issueDate: '',
        coordinator: 'Event Coordinator',
        hod: 'Head of Department'
      });
    }
  };

  const handleDirectDownload = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    const certificateElement = certificateRef.current;

    if (!certificateElement) {
      setIsGenerating(false);
      return;
    }

    // Apply temporary classes for a clean, stable capture
    certificateElement.parentElement.classList.add('preparing-pdf');
    certificateElement.classList.add('pdf-capture-mode');

    try {
      const canvas = await html2canvas(certificateElement, {
        scale: 2, // Increase scale for better quality
        useCORS: true,
        // Ensure it captures from the top, ignoring scroll position
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: certificateElement.scrollWidth,
        windowHeight: certificateElement.scrollHeight,
        backgroundColor: '#ffffff', // Set a solid background
      });
      const imgData = canvas.toDataURL('image/png');
      // A4 size in landscape: 297mm wide, 210mm high
      const pdf = new jsPDF('l', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
      pdf.save(`TechnoFest2025_Certificate_${certificateData.name.replace(/ /g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      // Clean up the temporary classes and reset state
      certificateElement.parentElement.classList.remove('preparing-pdf');
      certificateElement.classList.remove('pdf-capture-mode');
      setIsGenerating(false);
    }
  };

  return (
    <div className="certificate-page-container">
      <div className="certificate-wrapper" ref={certificateRef}>
        {/* Decorative Corners */}
        <div className="certificate-corner corner-tl"></div>
        <div className="certificate-corner corner-tr"></div>
        <div className="certificate-corner corner-bl"></div>
        <div className="certificate-corner corner-br"></div>
        
        {/* Certificate Header */}
        <div className="certificate-header">
          <div className="certificate-logo">
            🏆
          </div>
          <h1 className="certificate-main-title">CERTIFICATE</h1>
          <p className="certificate-subtitle">OF PARTICIPATION</p>
          <div className="certificate-ornament">
            <span className="ornament-line"></span>
            <span className="ornament-icon">⭐</span>
            <span className="ornament-line"></span>
          </div>
        </div>

        {/* Certificate Body */}
        <div className="certificate-body">
          <p className="cert-text">This certificate is proudly presented to</p>
          
          <h2 className="participant-name">
            {certificateData.name}
          </h2>
          
          <p className="participant-college">
            {certificateData.college}
          </p>
          
          <p className="cert-text cert-description">
            for their active participation in <strong>TechnoFest 2025</strong>,
            <br />held on <strong>March 15-16, 2025</strong>
          </p>
          
          <div className="certificate-badge">
            🎖️
          </div>
        </div>

        {/* Certificate Footer */}
        <div className="certificate-footer">
          <div className="signature-block">
            <div className="signature-line"></div>
            <p className="signature-title">Event Coordinator</p>
            <p className="signature-name">{certificateData.coordinator}</p>
          </div>
          
          <div className="signature-block">
            <div className="signature-line"></div>
            <p className="signature-title">Head of Department</p>
            <p className="signature-name">{certificateData.hod}</p>
          </div>
        </div>

        {/* Certificate Meta */}
        <div className="certificate-meta">
          <p className="cert-id">
            Certificate ID: <span>{registrationId}</span>
          </p>
          <p className="cert-date">
            Issued on: <span>{certificateData.issueDate}</span>
          </p>
        </div>
      </div>

      {/* Print Button */}
      <button className="print-button" onClick={handleDirectDownload} disabled={isGenerating}>
        {isGenerating ? 
          'Generating...' : 
          <><span style={{ fontSize: '20px' }}>📥</span> Download Certificate</>}
      </button>
    </div>
  );
};

export default CertificatePage;