import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import {
    FaPhoneAlt, FaWhatsapp, FaTimes, FaChevronDown,
    FaSolarPanel, FaChargingStation, FaBatteryFull, FaBook,
    FaRoad, FaStore, FaHospital, FaShoppingBag,
    FaMapMarkerAlt, FaParking,
    FaWalking, FaUsers,
    FaDownload, FaCheckCircle, FaBuilding,
    FaBars,
} from 'react-icons/fa';
import { MdSelfImprovement } from 'react-icons/md';
import { BiCctv } from 'react-icons/bi';
import { GiWaterDrop } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

// ─── Constants ───────────────────────────────────────────────────────────────
const PHONE = '7030502111';
const WHATSAPP = '917030502111';
const LOGO_URL = '/assets/logo.png';
const HERO_IMG = '/assets/shree-ganesh-srushti/gallery/sgs-hero.webp';
const FRONT_IMG = '/assets/shree-ganesh-srushti/gallery/front.jpg';
const NIGHT_IMG = '/assets/shree-ganesh-srushti/gallery/night.jpg';
const RERA_QR = '/assets/shree-ganesh-srushti/gallery/Rera_QR.png';
const BROCHURE = '/assets/shree-ganesh-srushti/gallery/Shree Ganesh Srushti Digital Broucher_compressed.pdf';

const API_ENDPOINT = '/api/leads/sgs';



// ─── Lead Tracker Utility ──────────────────────────────────────────────────
function captureLeadMeta() {
    const params = new URLSearchParams(window.location.search);
    return {
        page_url: window.location.href,
        timestamp: new Date().toISOString(),
        device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        referrer: document.referrer || 'direct',
        utm_source: params.get('utm_source') || '',
        utm_medium: params.get('utm_medium') || '',
        utm_campaign: params.get('utm_campaign') || '',
        lead_source: 'QR Landing Page',
        project_name: 'Shree Ganesh Srushti',
    };
}

async function submitLead(formData) {
    const meta = captureLeadMeta();
    const payload = { ...formData, ...meta };

    console.log('[SGS Lead Submission]', payload);

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        return { ok: true };
    } catch (error) {
        console.error('Lead submission error:', error);
        throw error;
    }
}

// ─── Ripple Button ────────────────────────────────────────────────────────
const AmberBtn = ({ children, onClick, className = '', type = 'button', disabled = false }) => (
    <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.03 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        className={`relative overflow-hidden bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-lg transition-colors duration-200 ${className}`}
    >
        {children}
    </motion.button>
);

// ─── SECTION: Inline Navbar ───────────────────────────────────────────────
const navLinks = [
    { label: 'Home', id: 'sgs-hero' },
    { label: 'Amenities', id: 'sgs-amenities' },
    { label: 'Configurations', id: 'sgs-configs' },
    { label: 'Gallery', id: 'sgs-gallery' },
    { label: 'Location', id: 'sgs-location' },
    { label: 'Enquire', id: 'sgs-fullform' },
];

function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const SgsNavbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = drawerOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [drawerOpen]);

    const handleNav = (id) => {
        setDrawerOpen(false);
        setTimeout(() => scrollTo(id), 50);
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-[200] bg-black/95 backdrop-blur-md shadow-lg border-b border-amber-800/30">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <button onClick={() => handleNav('sgs-hero')} className="flex items-center gap-2 focus:outline-none">
                        <img src={LOGO_URL} alt="Ganesh Yeole Builders" className="h-9 w-auto object-contain" loading="eager" />
                        <div className="text-left flex flex-col gap-0.5">
                            <p className="text-white text-sm font-bold leading-none">Ganesh Yeole</p>
                            <p className="text-amber-400 text-xs leading-none">Builders &amp; Developers</p>
                        </div>
                    </button>

                    {/* Desktop links */}
                    <ul className="hidden lg:flex items-center gap-1">
                        {navLinks.map(link => (
                            <li key={link.id}>
                                <button
                                    onClick={() => handleNav(link.id)}
                                    className="px-3 py-2 text-sm font-medium text-gray-200 hover:text-amber-400 transition-colors duration-200 uppercase tracking-wide"
                                >
                                    {link.label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a href={`tel:${PHONE}`} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors duration-200">
                            <FaPhoneAlt className="text-xs" /> Call Now
                        </a>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setDrawerOpen(o => !o)}
                        className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {drawerOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer — portalled to body to escape nav stacking context */}
            {createPortal(
                <AnimatePresence>
                    {drawerOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                style={{ position: 'fixed', inset: 0, top: 64, zIndex: 9998, background: 'rgba(0,0,0,0.65)' }}
                                onClick={() => setDrawerOpen(false)}
                            />
                            {/* Drawer panel */}
                            <motion.div
                                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                                style={{
                                    position: 'fixed', top: 64, right: 0, bottom: 0,
                                    width: '65vw', zIndex: 9999,
                                    backgroundColor: '#111827',
                                    display: 'flex', flexDirection: 'column',
                                    boxShadow: '-4px 0 24px rgba(0,0,0,0.5)',
                                }}
                            >
                                <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>
                                    {navLinks.map((link, i) => (
                                        <motion.button
                                            key={link.id}
                                            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.06 }}
                                            onClick={() => handleNav(link.id)}
                                            style={{
                                                display: 'block', width: '100%', textAlign: 'left',
                                                padding: '12px 16px', marginBottom: 4,
                                                borderRadius: 12, cursor: 'pointer', border: 'none',
                                                background: 'transparent', color: '#fff',
                                                fontSize: 14, fontWeight: 600,
                                                letterSpacing: '0.08em', textTransform: 'uppercase',
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217,119,6,0.15)'; e.currentTarget.style.color = '#FBBF24'; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; }}
                                        >
                                            {link.label}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

// ─── SECTION: Quick Enquiry Form ──────────────────────────────────────────
const EMPTY_QUICK = { name: '', phone: '', config: '' };

const QuickEnquiryForm = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState(EMPTY_QUICK);
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error

    const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const onSubmit = async e => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await submitLead({ ...form, form_type: 'quick_enquiry' });
            setStatus('success');
            setForm(EMPTY_QUICK);
            setTimeout(() => navigate('/thank-you'), 1000);
            setTimeout(() => setStatus('idle'), 6000);
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const inputCls = 'w-full px-4 py-3 rounded-xl bg-white/10 border border-amber-400/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm transition-all duration-200';
    const labelCls = 'block text-xs font-semibold text-amber-300 uppercase tracking-widest mb-1';

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full max-w-sm mx-auto bg-black/60 backdrop-blur-md border border-amber-500/30 rounded-2xl p-6 shadow-2xl"
        >
            <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-amber-500 rounded-full" />
                <h3 className="text-white font-bold text-lg">Quick Enquiry</h3>
            </div>

            {status === 'success' ? (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-3 py-6 text-center">
                    <FaCheckCircle className="text-green-400 text-4xl" />
                    <p className="text-white font-semibold">Thank you! We'll call you back shortly.</p>
                </motion.div>
            ) : (
                <form onSubmit={onSubmit} className="space-y-3">
                    <div>
                        <label className={labelCls}>Name *</label>
                        <input name="name" value={form.name} onChange={onChange} required placeholder="Your full name" className={inputCls} />
                    </div>
                    <div>
                        <label className={labelCls}>Phone *</label>
                        <input name="phone" type="tel" value={form.phone} onChange={onChange} required placeholder="+91 XXXXX XXXXX" className={inputCls} />
                    </div>
                    <div>
                        <label className={labelCls}>Configuration *</label>
                        <select name="config" value={form.config} onChange={onChange} required className={`${inputCls} cursor-pointer`}>
                            <option value="" className="bg-gray-900">Select BHK</option>
                            <option value="1 BHK" className="bg-gray-900">1 BHK</option>
                            <option value="2 BHK" className="bg-gray-900">2 BHK</option>
                            <option value="3 BHK" className="bg-gray-900">3 BHK</option>
                        </select>
                    </div>
                    {status === 'error' && <p className="text-red-400 text-xs">Something went wrong. Please call us directly.</p>}
                    <AmberBtn type="submit" disabled={status === 'submitting'} className="w-full py-3 text-sm mt-1">
                        {status === 'submitting' ? 'Sending...' : 'Send Enquiry →'}
                    </AmberBtn>
                </form>
            )}
        </motion.div>
    );
};

const HeroSection = () => {
    const textVariants = {
        hidden: { opacity: 0, y: 35 },
        visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.18, ease: [0.25, 0.46, 0.45, 0.94] } }),
    };

    return (
        <section id="sgs-hero" className="relative w-full overflow-hidden" style={{ minHeight: '100dvh' }}>
            {/* Static BG (Parallax Removed) */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={HERO_IMG} alt="Shree Ganesh Srushti"
                    className="w-full h-full object-cover"
                    style={{ minHeight: '100dvh', objectPosition: 'center 70%' }}
                    loading="eager" fetchpriority="high"
                    onError={e => { e.target.src = '/hero-building.jpg'; }}
                />
            </div>

            {/* Minimal overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Text — top-left, below navbar */}
            <div className="relative z-10 flex flex-col items-start justify-start min-h-[100dvh] px-5 sm:px-10 lg:px-16 pt-20">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="inline-flex items-center gap-2 bg-amber-700/80 border border-amber-500/60 px-4 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-3 mt-4 shadow-lg backdrop-blur-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    Book at Launch Offer
                </motion.div>

                <motion.h1
                    custom={1} variants={textVariants} initial="hidden" animate="visible"
                    className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Shree Ganesh<br />
                    <span className="text-amber-400">Srushti</span>
                </motion.h1>

                <motion.div custom={2} variants={textVariants} initial="hidden" animate="visible"
                    className="w-52 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200 my-3 rounded-full"
                />

                <motion.p custom={3} variants={textVariants} initial="hidden" animate="visible"
                    className="text-sm text-gray-200 font-light tracking-wide mb-1"
                >
                    THE NEW LANGUAGE OF LIVING
                </motion.p>
                <motion.p custom={4} variants={textVariants} initial="hidden" animate="visible"
                    className="text-xs text-amber-300 font-semibold mb-4"
                >
                    1 BHK &amp; 2 BHK Happy Homes &amp; Shops
                </motion.p>

                <motion.div custom={5} variants={textVariants} initial="hidden" animate="visible" className="flex flex-wrap gap-2">
                    <AmberBtn onClick={() => scrollTo('sgs-quickform')} className="px-4 py-2 text-xs">
                        Enquire Now ↓
                    </AmberBtn>
                    <a href={`https://wa.me/${WHATSAPP}?text=Hi! I'm interested in Shree Ganesh Srushti.`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-green-600 hover:bg-green-500 text-white transition-colors shadow-lg">
                        <FaWhatsapp /> WhatsApp
                    </a>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60"
            >
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                <FaChevronDown size={14} />
            </motion.div>
        </section>
    );
};

// ─── SECTION: Quick Enquiry (standalone, below hero) ────────────────────────
const QuickEnquirySection = () => (
    <section id="sgs-quickform" className="bg-gray-900 py-12 px-5 sm:px-10 border-b border-amber-700/20">
        <div className="max-w-md mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }} viewport={{ once: true }}
                className="text-center mb-6">
                <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">Quick Enquiry</span>
                <h2 className="text-2xl font-black text-white mt-1">Interested? Let's Talk <span className="text-amber-400">Today</span></h2>
                <p className="text-gray-400 text-sm mt-1">Fill in your details and our team will call you back within 2 hours.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                <QuickEnquiryForm />
            </motion.div>
        </div>
    </section>
);

// ─── SECTION: Welcome ─────────────────────────────────────────────────────
const WelcomeSection = () => (
    <section className="py-16 sm:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-5 sm:px-10 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }} viewport={{ once: true }}>
                <span className="inline-block text-xs text-amber-600 font-bold uppercase tracking-widest mb-3 border border-amber-300 px-3 py-1 rounded-full">Welcome</span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-4">
                    Welcome to <span className="text-amber-600">Shree Ganesh Srushti</span>
                </h2>
                <div className="w-48 h-0.5 bg-amber-500 rounded mb-5" />
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-4">
                    Thoughtfully designed towers that ensure ample light, ventilation, and scenic views — creating a lifestyle of comfort, convenience, and class. A prestigious address you'll be proud to call home.
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                    Located near Datta Mandir Chowk on Trimbakeshwar Road, Nashik, Shree Ganesh Srushti blends modern architecture with green living. With EV charging, solar panels, rainwater harvesting, and automation in common areas — every detail reflects our commitment to sustainable, future-ready homes.
                </p>
                <div className="flex flex-wrap gap-3">
                    {['RERA Registered', 'Solar Powered', 'Greenery Rich'].map(tag => (
                        <span key={tag} className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full font-semibold">
                            <FaCheckCircle className="text-amber-500" /> {tag}
                        </span>
                    ))}
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }} viewport={{ once: true }}
                className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                    <img src={FRONT_IMG} alt="Shree Ganesh Srushti Front View" className="w-full h-full object-cover" loading="lazy" />
                </div>
                {/* RERA badge */}
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-3 border border-amber-200 flex items-center gap-3">
                    <img src={RERA_QR} alt="RERA QR" className="w-12 h-12 object-contain rounded" loading="lazy" />
                    <div>
                        <p className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">MahaRERA Registered</p>
                        <p className="text-xs text-amber-700 font-bold">PM1220002501249</p>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
);

// ─── SECTION: Amenities ───────────────────────────────────────────────────
const amenities = [
    { icon: <FaSolarPanel />, name: 'Solar for common electricity', desc: '' },
    { icon: <MdSelfImprovement />, name: 'Yoga Space on rooftop', desc: '' },
    { icon: <FaUsers />, name: 'Multipurpose Hall on rooftop', desc: '' },
    { icon: <FaBuilding />, name: 'Attractive Entrance', desc: '' },
    { icon: <FaWalking />, name: 'Seating area on roof', desc: '' },
    { icon: <FaBook />, name: 'Library', desc: '' },
    { icon: <FaChargingStation />, name: 'EV Charging Station', desc: '' },
    { icon: <FaStore />, name: 'Society Office', desc: '' },
    { icon: <BiCctv />, name: 'CCTV', desc: '' },
    { icon: <FaRoad />, name: 'Branded Lift', desc: '' },
    { icon: <FaBatteryFull />, name: 'Battery Backup for Lift', desc: '' },
    { icon: <GiWaterDrop />, name: 'NMC & Bore Well Water Supply', desc: '' },
    { icon: <FaHospital />, name: 'Fire Safety', desc: '' },
    { icon: <FaParking />, name: 'Common Parking Area', desc: '' },
    { icon: <FaShoppingBag />, name: 'Automation in Common Area', desc: '' },
    { icon: <GiWaterDrop />, name: 'Rain Water Harvesting', desc: '' },
];

const AmenitiesSection = () => (
    <section id="sgs-amenities" className="py-16 sm:py-20 bg-amber-50 dark:bg-amber-950/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
                <span className="text-xs text-amber-600 font-bold uppercase tracking-widest border border-amber-300 px-3 py-1 rounded-full">Amenities</span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-3 mb-2">
                    Premium <span className="text-amber-600">Lifestyle Features</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">Every detail designed for a life of comfort, sustainability, and community.</p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {amenities.map((a, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: (i % 4) * 0.07 }} viewport={{ once: true }}
                        whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(217,119,6,0.15)' }}
                        className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 border border-amber-100 dark:border-amber-900/30 shadow hover:border-amber-300 transition-all duration-300 flex flex-col items-center text-center gap-2"
                    >
                        <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 text-xl">
                            {a.icon}
                        </div>
                        <p className="text-sm font-bold text-gray-800 dark:text-white leading-tight">{a.name}</p>
                        <p className="text-xs text-gray-400 leading-snug">{a.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

// ─── SECTION: Configurations ──────────────────────────────────────────────
const configs = [
    {
        type: '1 BHK', tag: 'Silver',
        price: '₹16.99 Lakh', priceNote: 'Starting Price',
        size: '480 sq ft', sizeNote: '',
        color: 'from-slate-500 via-gray-600 to-amber-700',
    },
    {
        type: '1 BHK', tag: 'Platinum',
        price: '₹19.49 Lakh', priceNote: 'Starting Price',
        size: '500 sq ft', sizeNote: '',
        color: 'from-yellow-600 via-amber-600 to-amber-800',
    },
    {
        type: '2 BHK', tag: 'Diamond',
        price: '₹26.49 Lakh', priceNote: 'Starting Price',
        size: '730 sq ft', sizeNote: '',
        color: 'from-indigo-900 via-amber-800 to-amber-950',
    },
];

const ConfigsSection = () => (
    <section id="sgs-configs" className="py-16 sm:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-5 sm:px-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-10">
                <span className="text-xs text-amber-600 font-bold uppercase tracking-widest border border-amber-300 px-3 py-1 rounded-full">Configurations</span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-3 mb-2">
                    Choose Your <span className="text-amber-600">Perfect Home</span>
                </h2>
            </motion.div>

            {/* ⏰ Launch Offer Strip */}
            <motion.div
                initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }} viewport={{ once: true }}
                className="mb-6 rounded-2xl overflow-hidden"
            >
                <div className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 px-5 py-3 flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
                    <span className="text-xl">🔥</span>
                    <div>
                        <p className="text-white font-black text-sm uppercase tracking-wide leading-none">
                            Launch Offer · 4 Days Only
                        </p>
                        <p className="text-orange-100 text-xs font-semibold mt-0.5">
                            Valid 19th March – 22nd March only. Book now before prices change!
                        </p>
                    </div>
                    <span className="hidden sm:block text-xl ml-2">⏳</span>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 px-6 sm:px-0">
                {configs.map((c, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.12 }} viewport={{ once: true }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className={`relative rounded-2xl overflow-hidden shadow-xl`}
                    >
                        <div className={`bg-gradient-to-b ${c.color} p-6 sm:p-8 text-white flex flex-col gap-5 min-h-[320px]`}>
                            {/* Type & Tag */}
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-200 mb-0.5">{c.tag}</p>
                                <h3 className="text-3xl sm:text-4xl font-black tracking-tight">{c.type}</h3>
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px bg-white/20" />

                            {/* Price — vertical stack */}
                            <div className="flex flex-col gap-2 flex-1">
                                <div>
                                    <p className="text-[10px] text-amber-200 uppercase tracking-widest mb-0.5">{c.priceNote}</p>
                                    <p className="text-2xl sm:text-3xl font-black leading-tight">{c.price}</p>
                                </div>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => scrollTo('sgs-fullform')}
                                className="w-full py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold tracking-wide transition-all duration-200"
                            >
                                Enquire About {c.type}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="text-center text-xs text-gray-400 mt-5">
                * Prices are indicative and subject to change. Contact us for latest pricing.
            </motion.p>
        </div>
    </section>
);


// ─── SECTION: Gallery ─────────────────────────────────────────────────────
const galleryImages = [
    { src: HERO_IMG, alt: 'Shree Ganesh Srushti Hero View' },
    { src: FRONT_IMG, alt: 'Front View' },
    { src: NIGHT_IMG, alt: 'Night View' },
    { src: '/assets/shree-ganesh-srushti/gallery/IMG-20251112-WA0038.jpg', alt: 'Project View' },
];

const GallerySection = () => {
    const [active, setActive] = useState(null);

    return (
        <section id="sgs-gallery" className="py-16 sm:py-20 bg-gray-950">
            <div className="max-w-6xl mx-auto px-5 sm:px-10">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-10">
                    <span className="text-xs text-amber-500 font-bold uppercase tracking-widest border border-amber-700/40 px-3 py-1 rounded-full">Gallery</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
                        Project <span className="text-amber-400">Gallery</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {galleryImages.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: (i % 2) * 0.1 }} viewport={{ once: true }}
                            className={`relative overflow-hidden rounded-2xl cursor-pointer group ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
                            onClick={() => setActive(img)}
                        >
                            <img src={img.src} alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                style={i === 0 ? { objectPosition: 'center 70%' } : undefined}
                                loading="lazy" onError={e => { e.target.style.display = 'none'; }}
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {active && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setActive(null)}>
                        <motion.img src={active.src} alt={active.alt}
                            initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}
                            className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        />
                        <button onClick={() => setActive(null)}
                            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-amber-600 p-2 rounded-full transition-colors">
                            <FaTimes size={18} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

// ─── SECTION: Location ────────────────────────────────────────────────────
const connectivityPoints = [
    { icon: FaRoad, label: 'Bus Stop & CBS', time: '3 mins / 13 mins' },
    { icon: FaBuilding, label: 'Satpur Ambad MIDC', time: '6 mins' },
    { icon: FaStore, label: 'Market', time: '5 mins' },
    { icon: FaRoad, label: 'Trimbak & Mumbai Highway', time: '7 mins' },
    { icon: FaHospital, label: 'Hospitals & Schools', time: '6 mins' },
    { icon: FaShoppingBag, label: 'City Centre Mall', time: '10 mins' },
];

const LocationSection = () => (
    <section id="sgs-location" className="py-16 sm:py-20 bg-amber-50 dark:bg-amber-950/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
                <span className="text-xs text-amber-600 font-bold uppercase tracking-widest border border-amber-300 px-3 py-1 rounded-full">Location</span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-3 mb-2">
                    Strategic Location &amp; <span className="text-amber-600">Connectivity</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
                    Near Datta Mandir Chowk, Trimbakeshwar Road, Nashik — connected to everything that matters.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Connectivity grid */}
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }} viewport={{ once: true }}>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-amber-500" /> Nearby Landmarks
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {connectivityPoints.map((p, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.07 }} viewport={{ once: true }}
                                className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-xl px-4 py-3 shadow border border-amber-100 dark:border-amber-900/30"
                            >
                                <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 flex-shrink-0">
                                    <p.icon size={16} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800 dark:text-white leading-tight">{p.label}</p>
                                    <p className="text-xs text-amber-600 font-bold">{p.time}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-6 flex gap-3 flex-wrap">
                        <a href="https://maps.app.goo.gl/Unszx1rJLL22QM1h7" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow">
                            <FaMapMarkerAlt /> Get Directions
                        </a>
                    </div>
                </motion.div>

                {/* Map embed */}
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }} viewport={{ once: true }}
                    className="rounded-2xl overflow-hidden shadow-xl border border-amber-200 dark:border-amber-900/30 aspect-[4/3]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1008.8516266726913!2d73.71860950599066!3d19.97560052363185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1767520999127!5m2!1sen!2sin"
                        width="100%" height="100%" style={{ border: 0, display: 'block' }}
                        allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                        title="Shree Ganesh Srushti Location"
                    />
                </motion.div>
            </div>
        </div>
    </section>
);

// ─── SECTION: Full Enquiry Form ───────────────────────────────────────────
const EMPTY_FULL = { name: '', phone: '', email: '', config: '', message: '' };

const FullEnquiryForm = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState(EMPTY_FULL);
    const [status, setStatus] = useState('idle');

    const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const onSubmit = async e => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await submitLead({ ...form, form_type: 'full_enquiry' });
            setStatus('success');
            setForm(EMPTY_FULL);
            setTimeout(() => navigate('/thank-you'), 1000);
            setTimeout(() => setStatus('idle'), 8000);
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const inputCls = 'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm transition-all duration-200';
    const labelCls = 'block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest mb-1.5';

    return (
        <section id="sgs-fullform" className="py-16 sm:py-24 bg-gray-900 relative overflow-hidden">
            {/* decorative */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(217,119,6,0.15)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(217,119,6,0.08)_0%,transparent_70%)]" />
            <div className="relative max-w-3xl mx-auto px-5 sm:px-10">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-10">
                    <span className="text-xs text-amber-500 font-bold uppercase tracking-widest border border-amber-700/40 px-3 py-1 rounded-full">Contact Us</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-2">
                        Schedule a <span className="text-amber-400">Site Visit</span>
                    </h2>
                    <p className="text-gray-400 text-sm">Fill in your details and our team will reach out within 2 hours.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-10 shadow-2xl border border-amber-500/20">
                    {status === 'success' ? (
                        <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center gap-4 py-10 text-center">
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                                <FaCheckCircle className="text-green-500 text-4xl" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white">We'll Call You Back!</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">Thank you for your interest in Shree Ganesh Srushti. Our team will reach you within 2 hours.</p>
                            <a href={`https://wa.me/${WHATSAPP}?text=Hi! I just submitted an enquiry for Shree Ganesh Srushti.`}
                                target="_blank" rel="noopener noreferrer"
                                className="mt-2 flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm">
                                <FaWhatsapp /> Also message on WhatsApp
                            </a>
                        </motion.div>
                    ) : (
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelCls}>Full Name *</label>
                                    <input name="name" value={form.name} onChange={onChange} required placeholder="Your name" className={inputCls} />
                                </div>
                                <div>
                                    <label className={labelCls}>Phone Number *</label>
                                    <input name="phone" type="tel" value={form.phone} onChange={onChange} required placeholder="+91 XXXXX XXXXX" className={inputCls} />
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelCls}>Email <span className="text-gray-400 normal-case tracking-normal font-normal text-xs">(optional)</span></label>
                                    <input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" className={inputCls} />
                                </div>
                                <div>
                                    <label className={labelCls}>Interested In *</label>
                                    <select name="config" value={form.config} onChange={onChange} required className={`${inputCls} cursor-pointer`}>
                                        <option value="">Select configuration</option>
                                        <option value="1 BHK">1 BHK</option>
                                        <option value="2 BHK">2 BHK</option>
                                        <option value="Shop">Shop</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className={labelCls}>Message <span className="text-gray-400 normal-case tracking-normal font-normal">(optional)</span></label>
                                <textarea name="message" value={form.message} onChange={onChange} rows={4}
                                    placeholder="Any specific requirements, preferred floor, budget range..."
                                    className={`${inputCls} resize-none`} />
                            </div>

                            {status === 'error' && (
                                <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                                    Submission failed. Please call us directly at <strong>+91 {PHONE}</strong>.
                                </p>
                            )}

                            <AmberBtn type="submit" disabled={status === 'submitting'} className="w-full py-4 text-base">
                                {status === 'submitting' ? 'Sending your enquiry...' : 'Submit Enquiry & Schedule Visit'}
                            </AmberBtn>

                            <p className="text-center text-xs text-gray-400 mt-1">
                                Or call us directly: <a href={`tel:${PHONE}`} className="text-amber-500 font-bold hover:underline">+91 {PHONE}</a>
                            </p>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

// ─── SECTION: Floating Buttons ────────────────────────────────────────────
const SgsFloatingButtons = () => {
    const [showCall, setShowCall] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowCall(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const content = (
        <>
            {/* WhatsApp bubble */}
            <AnimatePresence>
                {showCall && (
                    <motion.a
                        href={`https://wa.me/${WHATSAPP}?text=Hi! I'm interested in Shree Ganesh Srushti.`}
                        target="_blank" rel="noopener noreferrer"
                        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                        style={{ position: 'fixed', bottom: '84px', right: '16px', zIndex: 9000 }}
                        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 shadow-xl flex items-center justify-center text-white transition-colors"
                        aria-label="Chat on WhatsApp"
                    >
                        <FaWhatsapp size={26} />
                        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-green-300 animate-ping" />
                    </motion.a>
                )}
            </AnimatePresence>

            {/* Sticky call bar (mobile) */}
            <AnimatePresence>
                {showCall && (
                    <motion.div
                        initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}
                        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                        style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 8999 }}
                        className="sm:hidden flex items-center gap-0 shadow-2xl"
                    >
                        <a href={`tel:${PHONE}`}
                            className="flex-1 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 transition-colors text-sm">
                            <FaPhoneAlt /> Call Now
                        </a>
                        <a href={`https://wa.me/${WHATSAPP}?text=Hi! I'm interested in Shree Ganesh Srushti.`}
                            target="_blank" rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-4 transition-colors text-sm">
                            <FaWhatsapp /> WhatsApp
                        </a>
                        <button onClick={() => scrollTo('sgs-fullform')}
                            className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 transition-colors text-sm">
                            Enquire
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop floating phone button */}
            <motion.a
                href={`tel:${PHONE}`}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 2, type: 'spring', stiffness: 250, damping: 20 }}
                style={{ position: 'fixed', bottom: '16px', right: '16px', zIndex: 9000 }}
                className="hidden sm:flex w-14 h-14 rounded-full bg-amber-600 hover:bg-amber-500 shadow-xl items-center justify-center text-white transition-colors"
                aria-label="Call Now"
            >
                <FaPhoneAlt size={20} />
                <span className="absolute inset-0 rounded-full border-4 border-amber-400/50 animate-ping" />
            </motion.a>
        </>
    );

    return createPortal(content, document.body);
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────
const SgsLandingPage = () => {
    // Track page load once on mount
    useEffect(() => {
        const meta = captureLeadMeta();
        console.log('[SGS Page Load]', meta);
        // optional: send page-view ping to API
        if (API_ENDPOINT) {
            fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ event: 'page_view', ...meta }),
            }).catch(() => { });
        }
    }, []);

    return (
        <>
            <Helmet>
                <title>Shree Ganesh Srushti – 1, 2 & 3 BHK Homes in Nashik | Ganesh Yeole Builders</title>
                <meta name="description" content="Shree Ganesh Srushti by Ganesh Yeole Builders — premium 1, 2 & 3 BHK homes in Nashik. G+7 structure near Datta Mandir Chowk. Starting ₹17.99 Lakh. RERA registered. Book now!" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={window.location.origin + '/shree-ganesh-srushti'} />
                <meta property="og:title" content="Shree Ganesh Srushti – Nashik's New Language of Living" />
                <meta property="og:description" content="Premium 1, 2 & 3 BHK homes by Ganesh Yeole Builders. Starting ₹17.99 Lakh. Scan QR · Enquire Now." />
                <meta property="og:image" content={window.location.origin + '/assets/shree-ganesh-srushti/gallery/heroweb.webp'} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            <div className="relative bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
                <SgsNavbar />
                <HeroSection />
                <QuickEnquirySection />
                <WelcomeSection />
                <AmenitiesSection />
                <ConfigsSection />
                <GallerySection />
                <LocationSection />
                <FullEnquiryForm />

                {/* Brochure download sticky strip */}
                <section className="bg-gradient-to-r from-amber-700 to-amber-900 py-6 px-5">
                    <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                        <div>
                            <p className="text-white font-bold text-lg">Download the Brochure</p>
                            <p className="text-amber-200 text-sm">Get floor plans, pricing, and amenity details in one PDF.</p>
                        </div>
                        <a href={BROCHURE} download
                            className="flex-shrink-0 flex items-center gap-2 bg-white hover:bg-amber-50 text-amber-800 font-bold px-6 py-3 rounded-xl transition-colors shadow-lg text-sm whitespace-nowrap">
                            <FaDownload /> Download Brochure
                        </a>
                    </div>
                </section>

                <Footer />
                <SgsFloatingButtons />
                {/* bottom padding for mobile sticky bar */}
                <div className="h-14 sm:h-0" />
            </div>
        </>
    );
};

export default SgsLandingPage;
