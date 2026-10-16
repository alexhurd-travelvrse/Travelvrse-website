import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, BookOpen, ExternalLink } from 'lucide-react';
import './BlogJournal.css';

// User's specific Substack publications
const SUBSTACK_POSTS = [
    {
        id: 'substack-1',
        title: "Why Our New Website Banned the Tech Industry’s Favorite Words",
        excerpt: "Today, we officially unveiled the new travelvrse.com alongside our latest platform video. If you browse the site, you won't see words like 'metaverse' or 'web3'. Here is why.",
        date: "Jun 2026",
        image: "https://substackcdn.com/image/fetch/$s_!2DLT!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa024ec02-d5db-49a4-8222-22439d56887e_1885x901.png",
        link: "https://travelvrse.substack.com/p/why-our-new-website-banned-the-tech",
        readTime: "4 min read"
    },
    {
        id: 'substack-2',
        title: "Why Next-Gen Travelers Hunt for \"Vibe\" Over Location",
        excerpt: "The way people plan travel has fundamentally broken. Next-Gen travelers are actively looking for specific cultural experiences and micro-vibes before they ever select a hotel.",
        date: "May 2026",
        image: "https://substackcdn.com/image/fetch/$s_!k-xU!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3ff25769-b76f-49dc-99a8-4e491814f90c_2938x1440.png",
        link: "https://travelvrse.substack.com/p/why-next-gen-travelers-hunt-for-vibe",
        readTime: "5 min read"
    }
];

const BlogJournal = () => {
    const [posts, setPosts] = useState(SUBSTACK_POSTS);

    useEffect(() => {
        const fetchSubstack = async () => {
            try {
                // Attempt fetching live RSS with fallback CORS proxy
                const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://travelvrse.substack.com/feed'));
                if (!response.ok) return;
                const xmlText = await response.text();
                const parser = new DOMParser();
                const xml = parser.parseFromString(xmlText, 'text/xml');
                const items = Array.from(xml.querySelectorAll('item'));

                if (items && items.length > 0) {
                    const parsedPosts = items.slice(0, 3).map((item, index) => {
                        const title = item.querySelector('title')?.textContent || '';
                        const link = item.querySelector('link')?.textContent || 'https://travelvrse.substack.com';
                        const pubDateStr = item.querySelector('pubDate')?.textContent;
                        const date = pubDateStr 
                            ? new Date(pubDateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                            : '2026';
                        
                        const desc = item.querySelector('description')?.textContent || '';
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = desc;
                        const cleanText = (tempDiv.textContent || tempDiv.innerText || '').trim();
                        const excerpt = cleanText.length > 150 ? cleanText.substring(0, 150) + '...' : cleanText;

                        const enclosure = item.querySelector('enclosure')?.getAttribute('url');
                        const imgInContent = desc.match(/src="([^">]+)"/);
                        const image = enclosure || (imgInContent ? imgInContent[1] : SUBSTACK_POSTS[index % SUBSTACK_POSTS.length].image);

                        return {
                            id: `live-${index}`,
                            title,
                            excerpt: excerpt || SUBSTACK_POSTS[index % SUBSTACK_POSTS.length].excerpt,
                            date,
                            image,
                            link,
                            readTime: `${Math.max(3, Math.min(7, Math.ceil(cleanText.length / 500)))} min read`
                        };
                    });

                    if (parsedPosts.length > 0) {
                        setPosts(parsedPosts);
                    }
                }
            } catch (err) {
                // Silently keep the curated SUBSTACK_POSTS
                console.log('Using verified Substack posts cache');
            }
        };

        fetchSubstack();
    }, []);

    return (
        <section id="journal" className="journal-section section-padding">
            <div className="container">
                <div className="section-header animate-fade-up" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <div className="hero-executive-badge" style={{ marginBottom: '1.25rem', cursor: 'pointer' }} onClick={() => window.open('https://travelvrse.substack.com', '_blank')}>
                        <span className="badge-status-dot"></span>
                        <span className="badge-tag">PERSPECTIVES</span>
                        <span className="badge-divider"></span>
                        <span className="badge-text">THE TRAVELVRSE JOURNAL</span>
                        <span className="badge-beta-pill">SUBSTACK</span>
                    </div>

                    <h2 className="journal-title" style={{ 
                        fontFamily: "var(--font-display)",
                        fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', 
                        fontWeight: '800', 
                        lineHeight: '1.15',
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        marginBottom: '1rem',
                        textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                    }}>
                        Our <span className="text-cyan">Journal</span>
                    </h2>

                    <p className="subtitle" style={{ 
                        fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', 
                        color: 'rgba(230, 241, 255, 0.85)', 
                        maxWidth: '720px', 
                        margin: '0 auto',
                        lineHeight: '1.6'
                    }}>
                        Direct analysis on why next-gen travellers hunt for vibe, the disintermediation of legacy OTAs, and the trillion-dollar experience economy.
                    </p>
                </div>

                <div className="journal-grid" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                    gap: '2rem', 
                    maxWidth: '1100px', 
                    margin: '0 auto 3.5rem' 
                }}>
                    {posts.map((post, index) => (
                        <a 
                            key={post.id} 
                            href={post.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`glass-card journal-card animate-fade-up delay-${index + 1}`}
                            style={{ 
                                textDecoration: 'none', 
                                color: 'inherit',
                                borderRadius: '24px',
                                border: '1px solid rgba(255,255,255,0.12)',
                                background: 'rgba(10, 18, 30, 0.75)',
                                backdropFilter: 'blur(16px)',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                        >
                            <div className="card-image-container" style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                                <img src={post.image} alt={post.title} className="card-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div className="card-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5, 11, 20, 0.95) 0%, rgba(5, 11, 20, 0.2) 60%, transparent 100%)' }}></div>
                                <span style={{
                                    position: 'absolute',
                                    top: '16px',
                                    right: '16px',
                                    background: 'rgba(5, 11, 20, 0.8)',
                                    backdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(255, 215, 0, 0.4)',
                                    color: '#ffd700',
                                    fontSize: '0.7rem',
                                    fontWeight: '800',
                                    padding: '4px 10px',
                                    borderRadius: '999px',
                                    letterSpacing: '0.05em'
                                }}>
                                    SUBSTACK
                                </span>
                            </div>

                            <div className="card-content" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div className="card-meta" style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', fontSize: '0.82rem', color: 'var(--color-cyan-neon)' }}>
                                    <span className="meta-item" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={13} /> {post.date}</span>
                                    <span className="meta-item" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><BookOpen size={13} /> {post.readTime}</span>
                                </div>

                                <h3 className="card-title" style={{ 
                                    fontFamily: "'Outfit', system-ui, -apple-system, sans-serif",
                                    fontSize: '1.25rem', 
                                    fontWeight: '700', 
                                    lineHeight: '1.3', 
                                    marginBottom: '0.75rem', 
                                    color: '#ffffff' 
                                }}>
                                    {post.title}
                                </h3>

                                <p className="card-excerpt" style={{ 
                                    fontSize: '0.92rem', 
                                    color: 'rgba(230, 241, 255, 0.72)', 
                                    lineHeight: '1.55', 
                                    marginBottom: '1.5rem',
                                    flex: 1 
                                }}>
                                    {post.excerpt}
                                </p>

                                <div className="btn-text" style={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    gap: '6px', 
                                    color: 'var(--color-gold-champagne, #FFD700)', 
                                    fontSize: '0.88rem', 
                                    fontWeight: '700', 
                                    letterSpacing: '0.04em',
                                    textTransform: 'uppercase' 
                                }}>
                                    Read on Substack <ExternalLink size={14} />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div style={{ textAlign: 'center' }}>
                    <a 
                        href="https://travelvrse.substack.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hero-search-btn"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                    >
                        <span>Subscribe &amp; Read All Articles</span>
                        <ArrowRight size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default BlogJournal;
