import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Compass, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, UserCheck, RefreshCw } from 'lucide-react';
import { SOUTH_BANK_VIBE_DATA } from '../data/southbankVibeData';

const VibeRadarChallenge = ({ onComplete, activeArchetype = null }) => {
  const [selectedCreatorId, setSelectedCreatorId] = useState(SOUTH_BANK_VIBE_DATA.curators[0].id);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [completedArchetype, setCompletedArchetype] = useState(activeArchetype);
  const [audioDuration, setAudioDuration] = useState(45);
  const audioRef = useRef(null);

  const activeCurator = SOUTH_BANK_VIBE_DATA.curators.find(c => c.id === selectedCreatorId) || SOUTH_BANK_VIBE_DATA.curators[0];
  const questions = SOUTH_BANK_VIBE_DATA.radarQuestions;
  const currentQuestion = questions[currentStep];

  // Audio Playback Handler
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {
        // Fallback simulated playback if sound URL blocked by browser autoplay
        setIsPlayingAudio(true);
      });
    }
  };

  useEffect(() => {
    let interval;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 2.2;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const handleSelectOption = (questionId, option) => {
    const updatedAnswers = { ...answers, [questionId]: option };
    setAnswers(updatedAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate archetype based on choices
      const dominantArchetype = option.archetypeAffinity || 'vinyl_flaneur';
      const archetypeObj = SOUTH_BANK_VIBE_DATA.archetypes[dominantArchetype] || SOUTH_BANK_VIBE_DATA.archetypes.vinyl_flaneur;
      setCompletedArchetype(archetypeObj);
      if (onComplete) {
        onComplete(dominantArchetype, updatedAnswers);
      }
    }
  };

  const resetChallenge = () => {
    setCurrentStep(0);
    setAnswers({});
    setCompletedArchetype(null);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(7, 11, 22, 0.98))',
        border: '1px solid rgba(56, 189, 248, 0.28)',
        borderRadius: '24px',
        padding: '32px 28px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(6, 182, 212, 0.1)',
        color: '#f8fafc',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={activeCurator.audioSampleUrl}
        onEnded={() => {
          setIsPlayingAudio(false);
          setAudioProgress(0);
        }}
      />

      {/* Top Header: Creator Selector & Audio Waveform Player */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '20px',
          marginBottom: '28px'
        }}
      >
        {/* Creator Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={activeCurator.avatar}
              alt={activeCurator.name}
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #38bdf8',
                boxShadow: '0 0 15px rgba(56, 189, 248, 0.3)'
              }}
            />
            <span
              title="Verified Area Curator"
              style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                background: '#0284c7',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #0f172a'
              }}
            >
              <CheckCircle2 size={12} color="#ffffff" />
            </span>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 700, fontSize: '15px', color: '#f8fafc' }}>
                {activeCurator.name}
              </span>
              <span style={{ color: '#38bdf8', fontSize: '13px', fontWeight: 600 }}>
                {activeCurator.handle}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>{activeCurator.role}</span>
              <span>&bull;</span>
              <span style={{ color: '#34d399' }}>{activeCurator.verifiedGemsCount} Verified Gems</span>
            </div>
          </div>
        </div>

        {/* Creator Switcher & Audio Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Creator Switcher */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '3px' }}>
            {SOUTH_BANK_VIBE_DATA.curators.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCreatorId(c.id);
                  setIsPlayingAudio(false);
                  setAudioProgress(0);
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: selectedCreatorId === c.id ? '#0284c7' : 'transparent',
                  color: selectedCreatorId === c.id ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {c.name.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Voiceover Player */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '12px',
              padding: '6px 14px'
            }}
          >
            <button
              onClick={toggleAudio}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: isPlayingAudio ? '#10b981' : '#0284c7',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(2, 132, 199, 0.4)'
              }}
              title={isPlayingAudio ? 'Pause Voiceover' : 'Play Creator Voiceover'}
            >
              {isPlayingAudio ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '2px' }} />}
            </button>

            <div style={{ minWidth: '130px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#38bdf8' }}>
                {isPlayingAudio ? 'Playing Curator Guide' : activeCurator.voiceoverTitle}
              </div>
              <div
                style={{
                  width: '100%',
                  height: '4px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '2px',
                  marginTop: '4px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: `${audioProgress}%`,
                    height: '100%',
                    background: '#38bdf8',
                    transition: 'width 0.2s linear'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Challenge Content */}
      {!completedArchetype ? (
        <div>
          {/* Progress Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '999px',
                background: 'rgba(6, 182, 212, 0.12)',
                color: '#06b6d4',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              <Compass size={14} /> Tuning Your South Bank Vibe Radar &bull; Step {currentStep + 1} of {questions.length}
            </span>

            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Unlocks <strong>5% Finisher Credit</strong>
            </span>
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px 0', letterSpacing: '-0.01em' }}>
            {currentQuestion.title}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 24px 0' }}>
            {currentQuestion.subtitle}
          </p>

          {/* Options Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {currentQuestion.options.map(option => (
              <div
                key={option.id}
                onClick={() => handleSelectOption(currentQuestion.id, option)}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#38bdf8';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 25px rgba(2, 132, 199, 0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'inline-block',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: 'rgba(56, 189, 248, 0.15)',
                      color: '#38bdf8',
                      marginBottom: '10px'
                    }}
                  >
                    {option.badge}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px 0', color: '#f8fafc' }}>
                    {option.label}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                    {option.description}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#38bdf8'
                  }}
                >
                  <span>Select &rarr;</span>
                  {option.sampleSound && (
                    <span style={{ fontSize: '11px', color: '#64748b' }}>
                      🎵 {option.sampleSound}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Archetype Result & Finisher Reward Card */
        <div
          style={{
            animation: 'fadeIn 0.3s ease-in',
            textAlign: 'center',
            padding: '12px 0'
          }}
        >
          {/* Glowing Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.2))',
              border: '1px solid #10b981',
              color: '#34d399',
              fontSize: '13px',
              fontWeight: 700,
              marginBottom: '16px'
            }}
          >
            <Sparkles size={16} /> Vibe Radar Tuned: {completedArchetype.matchPct}% Match
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 6px 0', color: '#f8fafc' }}>
            {completedArchetype.name}
          </h2>
          <p style={{ fontSize: '14px', color: '#38bdf8', fontWeight: 600, margin: '0 0 16px 0' }}>
            "{completedArchetype.tagline}"
          </p>

          <p
            style={{
              maxWidth: '620px',
              margin: '0 auto 24px auto',
              fontSize: '14px',
              color: '#cbd5e1',
              lineHeight: 1.6
            }}
          >
            {completedArchetype.summary}
          </p>

          {/* Unlocked Reward Box */}
          <div
            style={{
              maxWidth: '560px',
              margin: '0 auto 24px auto',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px dashed #10b981',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                Unlocked Finisher Reward
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#34d399' }}>
                5% Off South Bank Stays &amp; Tours
              </div>
              <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
                Promo Code: <strong style={{ color: '#ffffff', letterSpacing: '1px' }}>VIBE5-SOUTHBANK</strong>
              </div>
            </div>

            <a
              href="#directory-results"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                background: '#10b981',
                color: '#052e16',
                fontWeight: 700,
                fontSize: '13px',
                textDecoration: 'none'
              }}
            >
              View Matches Below &darr;
            </a>
          </div>

          <button
            onClick={resetChallenge}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RefreshCw size={12} /> Retune My Vibe Radar
          </button>
        </div>
      )}
    </div>
  );
};

export default VibeRadarChallenge;
