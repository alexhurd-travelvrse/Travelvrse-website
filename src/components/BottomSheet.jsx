import React from 'react';

const BottomSheet = ({ isOpen, onClose, title, subtitle, children }) => {
    return (
        <>
            {/* Backdrop */}
            <div 
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.5)',
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none',
                    zIndex: 9999,
                    transition: 'opacity 0.4s ease',
                    backdropFilter: 'blur(4px)'
                }}
                onClick={onClose}
            />

            {/* Sheet */}
            <div className={`bottom-sheet ${isOpen ? 'open' : ''}`}>
                <div className="bottom-sheet-handle" onClick={onClose} />
                
                {title && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h2 className="serif-title" style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{title}</h2>
                        {subtitle && <p className="metadata-label" style={{ opacity: 0.6 }}>{subtitle}</p>}
                    </div>
                )}

                <div style={{ overflowY: 'auto', maxHeight: '70vh' }}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default BottomSheet;
