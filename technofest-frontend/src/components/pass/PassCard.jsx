import React from 'react';
import PropTypes from 'prop-types';

const PassCard = ({ pass, onSelectPass }) => {
    const isFeatured = pass.type === 'both';
    return (
        <div className={`pass-option ${isFeatured ? 'featured' : ''}`}>
            {isFeatured && <div className="featured-badge">Best Value</div>}
            <div className="pass-header">
                <h3>{pass.name}</h3>
                <div className="pass-price-large">{pass.price}</div>
                {isFeatured && <div className="savings">{pass.savings}</div>}
            </div>
            <div className="pass-details">
                <p className="pass-date">{pass.date}</p>
                <ul className="pass-features">
                    {pass.features.map((feature, index) => (
                        <li key={index}><i className="fas fa-check"></i> {feature}</li>
                    ))}
                </ul>
            </div>
            <button className={`btn-select-pass ${isFeatured ? 'featured-btn' : ''}`} onClick={() => onSelectPass(pass.type)}>
                Select {pass.name}
            </button>
        </div>
    );
};

PassCard.propTypes = {
    pass: PropTypes.object.isRequired,
    onSelectPass: PropTypes.func.isRequired,
};

export default PassCard;