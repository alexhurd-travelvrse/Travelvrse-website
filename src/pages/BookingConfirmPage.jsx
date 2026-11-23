import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { completeSouthBankLiveBooking } from '../services/nuiteeLiveFeedService';
import { CheckCircle2, AlertTriangle, ArrowLeft, Calendar, ShieldCheck, Loader2 } from 'lucide-react';

export default function BookingConfirmPage() {
  const [searchParams] = useSearchParams();
  const prebookId = searchParams.get('pid') || searchParams.get('prebookId') || '';
  const transactionId = searchParams.get('tid') || searchParams.get('transactionId') || '';

  const [status, setStatus] = useState('loading'); // 'loading' | 'confirmed' | 'needs_guest' | 'error'
  const [booking, setBooking] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [pendingMeta, setPendingMeta] = useState(() => {
    try {
      const raw = sessionStorage.getItem('travelvrse_pending_booking');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [firstName, setFirstName] = useState(pendingMeta?.firstName || '');
  const [lastName, setLastName] = useState(pendingMeta?.lastName || '');
  const [email, setEmail] = useState(pendingMeta?.email || '');

  const finalizeBooking = async (guest) => {
    setStatus('loading');
    setErrorMsg('');
    const res = await completeSouthBankLiveBooking({
      prebookId,
      transactionId,
      firstName: guest.firstName,
      lastName: guest.lastName,
      email: guest.email
    });

    if (res.ok && res.booking) {
      setBooking(res.booking);
      setStatus('confirmed');
      try {
        sessionStorage.removeItem('travelvrse_pending_booking');
      } catch {
        // ignore
      }
    } else {
      setErrorMsg(res.error || 'Unable to confirm booking.');
      setStatus('error');
    }
  };

  useEffect(() => {
    if (!prebookId || !transactionId) {
      setStatus('error');
      setErrorMsg('Missing booking reference parameters (prebookId or transactionId).');
      return;
    }

    if (pendingMeta?.firstName && pendingMeta?.lastName && pendingMeta?.email) {
      finalizeBooking(pendingMeta);
    } else {
      setStatus('needs_guest');
    }
  }, [prebookId, transactionId]);

  const handleManualConfirm = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) return;
    const guest = { firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() };
    setPendingMeta(guest);
    finalizeBooking(guest);
  };

  return (
    <Layout>
      <Helmet>
        <title>Booking Confirmation | TravelVRSE</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div
        style={{
          minHeight: '80vh',
          background: 'linear-gradient(180deg, #050b14 0%, #070e1c 100%)',
          color: '#f8fafc',
          padding: '48px 20px 80px 20px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        <div
          style={{
            maxWidth: '580px',
            margin: '0 auto',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
          }}
        >
          {status === 'loading' && (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <Loader2 size={36} color="#38bdf8" style={{ animation: 'spin 1s linear infinite', marginBottom: '12px' }} />
              <h1 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px 0' }}>Finalizing Your Reservation…</h1>
              <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: 0 }}>
                Confirming your stay directly with the hotel via Nuitée. Please do not close this window.
              </p>
            </div>
          )}

          {status === 'needs_guest' && (
            <form onSubmit={handleManualConfirm}>
              <h1 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px 0' }}>Complete Your Reservation</h1>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 18px 0' }}>
                Payment succeeded! Enter the lead guest details below to issue your hotel confirmation code.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <input
                  required
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(0,0,0,0.35)', color: '#fff' }}
                />
                <input
                  required
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(0,0,0,0.35)', color: '#fff' }}
                />
              </div>
              <input
                required
                type="email"
                placeholder="Confirmation email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(0,0,0,0.35)', color: '#fff', marginBottom: '16px' }}
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#fff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Issue Hotel Confirmation
              </button>
            </form>
          )}

          {status === 'confirmed' && booking && (
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.16)', border: '1px solid rgba(52, 211, 153, 0.4)', color: '#34d399', padding: '5px 12px', borderRadius: '999px', fontSize: '11.5px', fontWeight: 800, marginBottom: '14px' }}>
                <CheckCircle2 size={14} /> RESERVATION CONFIRMED
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 6px 0' }}>
                {booking.hotel?.name || pendingMeta?.hotelName || 'Your Stay Is Confirmed'}
              </h1>
              <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: '0 0 18px 0' }}>
                Confirmation sent to <strong style={{ color: '#e2e8f0' }}>{booking.guestInfo?.guestEmail || email}</strong>
              </p>

              <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Booking Reference:</span>
                  <strong style={{ color: '#38bdf8' }}>{booking.bookingId}</strong>
                </div>
                {booking.hotelConfirmationCode && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Hotel Confirmation Code:</span>
                    <strong style={{ color: '#34d399' }}>{booking.hotelConfirmationCode}</strong>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8', display: 'inline-flex', alignItems: 'center', gap: '5px' }}><Calendar size={13} /> Dates:</span>
                  <strong>{booking.checkin || pendingMeta?.checkin} → {booking.checkout || pendingMeta?.checkout}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' }}>
                  <span style={{ color: '#94a3b8' }}>Total Paid:</span>
                  <strong style={{ color: '#34d399', fontSize: '15px' }}>
                    {booking.currency || pendingMeta?.currency || 'GBP'} {Number(booking.price || pendingMeta?.totalPrice || 0).toFixed(2)}
                  </strong>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94a3b8', marginBottom: '20px' }}>
                <ShieldCheck size={14} color="#34d399" />
                <span>Fulfilled securely via Nuitée LiteAPI v3.0</span>
              </div>

              <Link
                to="/destinations/london/south-bank"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(56, 189, 248, 0.14)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  color: '#7dd3fc',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 700
                }}
              >
                <ArrowLeft size={14} /> Back to South Bank Hub
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', padding: '5px 12px', borderRadius: '999px', fontSize: '11.5px', fontWeight: 800, marginBottom: '12px' }}>
                <AlertTriangle size={14} /> BOOKING ISSUE
              </div>
              <h1 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px 0' }}>We couldn’t finalize that reservation</h1>
              <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.55, margin: '0 0 18px 0' }}>
                {errorMsg}
              </p>
              <Link
                to="/destinations/london/south-bank"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'linear-gradient(135deg, #0284c7, #6366f1)',
                  color: '#ffffff',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 800
                }}
              >
                <ArrowLeft size={14} /> Return to South Bank Hub
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
