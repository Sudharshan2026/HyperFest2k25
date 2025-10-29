import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ 
    children, 
    onClick, 
    className = '', 
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    ...props 
}) => {
    // Base styles
    const baseStyles = "relative font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg overflow-hidden";
    
    // Size variants
    const sizeStyles = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        xl: "px-10 py-5 text-xl"
    };
    
    // Color variants with gradients
    const variantStyles = {
        primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:shadow-purple-500/50",
        secondary: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 hover:shadow-blue-500/50",
        success: "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:shadow-green-500/50",
        danger: "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 hover:shadow-red-500/50",
        warning: "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 hover:shadow-orange-500/50",
        info: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 hover:shadow-cyan-500/50",
        outline: "bg-transparent border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white hover:shadow-purple-500/50",
        ghost: "bg-white/20 backdrop-blur-lg text-white border-2 border-white/50 hover:bg-white/30 hover:shadow-white/20",
        gradient: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white hover:shadow-2xl animate-gradient-x"
    };
    
    // Disabled styles
    const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:-translate-y-1 hover:shadow-2xl cursor-pointer";
    
    // Width styles
    const widthStyles = fullWidth ? "w-full" : "";
    
    // Combine all styles
    const buttonStyles = `
        ${baseStyles} 
        ${sizeStyles[size]} 
        ${variantStyles[variant]} 
        ${disabledStyles}
        ${widthStyles}
        ${className}
        group
    `;

    return (
        <button
            onClick={onClick}
            className={buttonStyles}
            disabled={disabled || loading}
            {...props}
        >
            {/* Ripple effect background */}
            {!disabled && (
                <span className="absolute inset-0 bg-white/30 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out pointer-events-none"></span>
            )}
            
            {/* Content wrapper */}
            <span className="relative z-10 flex items-center justify-center gap-3">
                {/* Loading spinner */}
                {loading && (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                
                {/* Icon left */}
                {icon && iconPosition === 'left' && !loading && (
                    <span className="text-xl group-hover:animate-bounce">{icon}</span>
                )}
                
                {/* Button text */}
                <span>{children}</span>
                
                {/* Icon right */}
                {icon && iconPosition === 'right' && !loading && (
                    <span className="text-xl group-hover:translate-x-2 transition-transform">{icon}</span>
                )}
                
                {/* Default arrow for primary without icon */}
                {!icon && !loading && variant === 'primary' && (
                    <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                )}
            </span>

            {/* Inline Styles for Special Animations */}
            <style jsx>{`
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 3s ease infinite;
                }
            `}</style>
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    variant: PropTypes.oneOf([
        'primary', 
        'secondary', 
        'success', 
        'danger', 
        'warning', 
        'info', 
        'outline', 
        'ghost',
        'gradient'
    ]),
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    icon: PropTypes.node,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    fullWidth: PropTypes.bool,
};

export default Button;

// Usage Examples:
/*
// Basic primary button
<Button onClick={handleClick}>Click Me</Button>

// Button with icon
<Button icon="🚀" onClick={handleClick}>Launch</Button>

// Different variants
<Button variant="success" icon="✓">Success</Button>
<Button variant="danger" icon="✕">Delete</Button>
<Button variant="warning" icon="⚠️">Warning</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// Loading state
<Button loading>Processing...</Button>

// Disabled state
<Button disabled>Disabled</Button>

// Full width
<Button fullWidth>Full Width Button</Button>

// Outline variant
<Button variant="outline">Outline</Button>

// Ghost variant (for dark backgrounds)
<Button variant="ghost">Ghost</Button>

// Gradient variant with animation
<Button variant="gradient" icon="✨">Gradient Magic</Button>

// Icon on right
<Button icon="→" iconPosition="right">Next</Button>
*/