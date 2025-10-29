import React from 'react';
import PropTypes from 'prop-types';

const CertificatesList = ({ certificates, onDownloadCertificate }) => {
    if (certificates.length === 0) {
        return <p className="empty-message">No certificates available yet</p>;
    }

    return (
        <div className="certificate-grid">
            {certificates.map(cert => (
                <div className="certificate-card" key={cert.id}>
                    <h5>{cert.eventName}</h5>
                    <p>Issued on: {new Date(cert.issuedAt).toLocaleDateString()}</p>
                    <button className="btn-outline" onClick={() => onDownloadCertificate(cert.id)}>
                        <i className="fas fa-download"></i> Download
                    </button>
                </div>
            ))}
        </div>
    );
};

CertificatesList.propTypes = {
    certificates: PropTypes.array.isRequired,
    onDownloadCertificate: PropTypes.func.isRequired,
};

export default CertificatesList;