import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt, className, style, placeholder = "/assets/balcony_new.png" }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => setIsLoaded(true);
                    observer.unobserve(imgRef.current);
                }
            });
        }, { threshold: 0.1 });

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) observer.unobserve(imgRef.current);
        };
    }, [src]);

    return (
        <div 
            ref={imgRef} 
            className={`lazy-image-container ${className || ''}`}
            style={{ 
                ...style, 
                backgroundImage: isLoaded ? 'none' : `url(${placeholder})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <img
                src={src}
                alt={alt}
                className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: isLoaded ? 'block' : 'none'
                }}
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
};

export default LazyImage;
