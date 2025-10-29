import React from 'react';

const PassBenefits = () => {
    return (
        <div className="pass-benefits">
            <h3>What's Included</h3>
            <div className="benefits-grid">
                <div className="benefit-item">
                    <i className="fas fa-utensils"></i>
                    <h4>Meals Included</h4>
                    <p>Complimentary lunch based on your pass selection</p>
                </div>
                <div className="benefit-item">
                    <i className="fas fa-certificate"></i>
                    <h4>Certificates</h4>
                    <p>Official participation certificates for attended events</p>
                </div>
                <div className="benefit-item">
                    <i className="fas fa-gift"></i>
                    <h4>Digital Goodie Bag</h4>
                    <p>Sponsor offers, discount coupons, and exclusive content</p>
                </div>
                <div className="benefit-item">
                    <i className="fas fa-headset"></i>
                    <h4>Support</h4>
                    <p>24/7 helpdesk and on-ground assistance</p>
                </div>
            </div>
        </div>
    );
};

export default PassBenefits;