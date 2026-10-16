import React, { useState, useEffect } from 'react';
import { X, Lock } from 'lucide-react';
import './PasswordGate.css';

const PasswordGate = ({ children, onClose, onSuccess }) => {
    const [password, setPassword] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const authorized = sessionStorage.getItem('travelvrse_authorized');
        if (authorized === 'true') {
            setIsAuthorized(true);
            if (onSuccess) onSuccess();
        }
    }, [onSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Allow Travelvrse, travelvrse, TRAVELVRSE
        if (password.trim().toLowerCase() === 'travelvrse') {
            sessionStorage.setItem('travelvrse_authorized', 'true');
            setIsAuthorized(true);
            setError('');
            if (onSuccess) onSuccess();
        } else {
            setError('Incorrect password. Please try again.');
        }
    };

    if (isAuthorized && children) {
        return children;
    }

    return (
        <div className="password-gate">
            <div className="password-container">
                {onClose && (
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="gate-close-btn"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                )}
                <div className="logo-container">
                    <img src="/models/travelvrse_logo.png" alt="Travelvrse" className="gate-logo" />
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold, #ffd700)', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    <Lock size={12} />
                    <span>PASSWORD PROTECTED</span>
                </div>
                <h2>Exclusive Access</h2>
                <p>Please enter the password to view the Barcelona destination challenge.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="password-input"
                        autoFocus
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="submit-btn" style={{ background: 'linear-gradient(135deg, #ffd700 0%, #ffb300 100%)', color: '#050b14', fontWeight: '800' }}>
                        Enter Experience
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordGate;
