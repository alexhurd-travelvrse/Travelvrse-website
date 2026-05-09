import React from 'react';
import { useGame } from '../context/GameContext';
import { useInfluencer } from '../context/InfluencerContext';
import BottomSheet from './BottomSheet';

const YouTubePlayer = ({ url }) => {
    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const isRawVideo = (url) => {
        if (!url) return false;
        return url.toLowerCase().match(/\.(mp4|webm|ogg|mov)$/) || url.includes('v.ftcdn.net');
    };

    if (!url) return null;

    if (isRawVideo(url)) {
        return (
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, background: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                <video src={url} controls playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
        );
    }

    const videoId = getYouTubeId(url)?.trim();
    if (!videoId) return null;

    return (
        <div style={{ position: 'relative', width: '100%', paddingBottom: '177.77%', height: 0, borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
            <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

const FavouritesOverlay = ({ isVisible, onClose }) => {
    const { interestScores, backpack } = useGame();
    const { publicConfig, manifest } = useInfluencer();
    const [selectedItem, setSelectedItem] = React.useState(null);
    const currentThemeColor = manifest?.client_metadata?.brand_assets?.primary_color || '#00e5ff';

    const [backpackLinked, setBackpackLinked] = React.useState(false);

    return (
        <BottomSheet 
            isOpen={isVisible} 
            onClose={onClose} 
            title={selectedItem ? selectedItem.title : "DIGITAL BACKPACK"}
            subtitle={selectedItem ? "DISCOVERY DETAIL" : "AGENTIC TRAVEL COMPANION"}
        >
            {selectedItem ? (
                <div className="animate-fade-in">
                    <button 
                        onClick={() => setSelectedItem(null)} 
                        style={{ background: 'none', border: 'none', color: currentThemeColor, fontSize: '0.7rem', cursor: 'pointer', marginBottom: '1.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}
                    >
                        ← BACK TO COLLECTION
                    </button>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                        {selectedItem.video ? (
                            <YouTubePlayer url={selectedItem.video} />
                        ) : (
                            <img src={selectedItem.media || selectedItem.image || '/assets/hero.png'} style={{ width: '100%', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }} alt="Detail" />
                        )}
                    </div>
                    
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>{selectedItem.description}</p>

                    {selectedItem.collectible?.url && (
                        <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div className="metadata-label" style={{ fontSize: '0.6rem', opacity: 0.5, marginBottom: '1rem' }}>COLLECTIBLE REWARD</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                <div style={{ fontSize: '1.5rem' }}>{selectedItem.type === 'medal' ? '🏅' : '📄'}</div>
                                <div style={{ flex: 1, fontWeight: '800', color: '#fff', fontSize: '0.9rem' }}>{selectedItem.collectible.title || 'Discovery Asset'}</div>
                            </div>
                            <button 
                                onClick={() => window.open(selectedItem.collectible.url, '_blank')}
                                style={{ width: '100%', padding: '1rem', borderRadius: '10px', background: currentThemeColor, color: '#000', border: 'none', fontWeight: '900', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.8rem' }}
                            >
                                ACCESS COLLECTIBLE
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="animate-fade-in">
                    {/* Items List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {backpack.length === 0 ? (
                            <p style={{ textAlign: 'center', opacity: 0.5, padding: '2rem', fontSize: '0.9rem' }}>Your backpack is empty. Start exploring!</p>
                        ) : (
                            backpack.map((item, idx) => (
                                <div key={idx} onClick={() => setSelectedItem(item)} style={{ 
                                    display: 'flex', gap: '15px', padding: '12px', borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                                    cursor: 'pointer', alignItems: 'center'
                                }}>
                                    <div style={{ width: '50px', height: '50px', background: `${currentThemeColor}20`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                        {item.type === 'medal' ? '🏅' : '🎒'}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: 0, fontSize: '0.85rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.title}</h4>
                                        <p style={{ margin: 0, fontSize: '0.7rem', opacity: 0.5 }}>View discovery details</p>
                                    </div>
                                    <div style={{ color: currentThemeColor }}>→</div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Email Capture */}
                    <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="metadata-label" style={{ color: currentThemeColor, marginBottom: '10px', fontSize: '0.6rem' }}>SAVE COLLECTION</div>
                        {backpackLinked ? (
                             <div style={{ color: '#00ff7f', fontWeight: '800', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                 <span>✓</span> LINKED TO ACCOUNT
                             </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input 
                                    type="email" 
                                    placeholder="Enter email" 
                                    style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px', color: '#fff', fontSize: '0.8rem' }}
                                />
                                <button 
                                    onClick={() => setBackpackLinked(true)}
                                    style={{ background: currentThemeColor, color: '#000', border: 'none', borderRadius: '8px', padding: '0 15px', fontWeight: '900', fontSize: '0.7rem' }}
                                >
                                    SAVE
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </BottomSheet>
    );
};

export default FavouritesOverlay;

