import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import logo from '../assets/logo.png'

export default function Home() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            textAlign: 'center', padding: '40px 20px',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Background glow */}
            <div style={{
                position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
                width: '600px', height: '600px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(74,125,255,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        width: '120px', height: '120px', borderRadius: '50%',
                        background: 'var(--color-card)',
                        border: '2px solid var(--color-border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '32px',
                        boxShadow: 'var(--shadow-glow)',
                        overflow: 'hidden',
                    }}
                >
                    <img src={logo} alt="ATIT Logo" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700,
                        margin: '0 0 16px', letterSpacing: '-0.02em',
                        background: 'linear-gradient(to right, #ffffff, #8888aa)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}
                >
                    Association of Technology IT
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    style={{
                        color: 'var(--color-text-muted)', fontSize: '16px',
                        maxWidth: '400px', lineHeight: 1.7, margin: '0 0 40px',
                        fontWeight: 300,
                    }}
                >
                    Upload, manage, and share your images. <br />
                    A simple and elegant hosting solution.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <Link to="/gallery" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '10px',
                        padding: '14px 36px', background: 'var(--gradient-primary)',
                        color: '#fff', borderRadius: '10px', fontWeight: 600,
                        fontSize: '14px', textDecoration: 'none', letterSpacing: '0.05em',
                        boxShadow: 'var(--shadow-glow)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                    }}>
                        View Gallery <FaArrowRight size={12} />
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}
