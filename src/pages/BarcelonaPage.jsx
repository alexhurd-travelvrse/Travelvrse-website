import React, { useEffect } from 'react';
import PasswordGate from '../components/PasswordGate';

const BarcelonaPage = () => {
    useEffect(() => {
        // Redirect to MSC Cruises if authorized
        const authorized = sessionStorage.getItem('travelvrse_authorized');
        if (authorized === 'true') {
            window.location.href = 'https://msc-cruises.vercel.app/';
        }
    }, []);

    return (
        <PasswordGate>
            <div style={{ 
                background: 'var(--color-navy-deep)', 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                padding: '40px'
            }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Barcelona Cruises</h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '30px' }}>
                    Access authorized. Entering the Barcelona experience...
                </p>
                <div className="loader" style={{ 
                    border: '4px solid rgba(0, 229, 255, 0.1)',
                    borderTop: '4px solid var(--color-cyan)',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
                <button 
                    onClick={() => window.location.href = 'https://msc-cruises.vercel.app/'}
                    className="btn btn-primary"
                    style={{ marginTop: '40px' }}
                >
                    CLICK HERE IF NOT AUTOMATICALLY REDIRECTED
                </button>
            </div>
        </PasswordGate>
    );
};

export default BarcelonaPage;
