import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signUp } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        if (password !== confirmPassword) {
            return setError('Passwords do not match')
        }
        try {
            setError('')
            setLoading(true)
            const { error } = await signUp(email, password)
            if (error) throw error
            alert('Account created! Please check your email/login.')
            navigate('/login')
        } catch (err) {
            setError('Failed to create an account: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    const inputStyle = {
        width: '100%', padding: '12px 14px',
        background: 'var(--color-surface)', border: '1px solid var(--color-border)',
        borderRadius: '10px', color: '#fff', fontSize: '14px',
        outline: 'none', transition: 'border-color 0.2s',
        boxSizing: 'border-box',
    }

    const labelStyle = {
        display: 'block', fontSize: '11px', fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.1em',
        color: 'var(--color-text-muted)', marginBottom: '8px',
    }

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px', position: 'relative',
        }}>
            {/* Background glow */}
            <div style={{
                position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '500px', height: '500px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(74,125,255,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    width: '100%', maxWidth: '420px',
                    background: 'var(--color-card)', border: '1px solid var(--color-border)',
                    borderRadius: '16px', padding: '48px 36px',
                    boxShadow: 'var(--shadow-card)', position: 'relative', zIndex: 1,
                }}
            >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                    <div style={{
                        width: '56px', height: '56px', borderRadius: '14px',
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 20px', overflow: 'hidden',
                    }}>
                        <img src={logo} alt="ATIT" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                    </div>
                    <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 600, letterSpacing: '-0.01em' }}>Create Account</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginTop: '8px' }}>Join us and start hosting</p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(255,68,102,0.1)', border: '1px solid rgba(255,68,102,0.2)',
                        color: '#ff6680', padding: '10px 14px', borderRadius: '8px',
                        fontSize: '13px', marginBottom: '20px', textAlign: 'center',
                    }}>{error}</div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={labelStyle}>Email</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Password</label>
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Confirm Password</label>
                        <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
                    </div>
                    <button
                        disabled={loading} type="submit"
                        style={{
                            width: '100%', padding: '14px',
                            background: 'var(--gradient-primary)', border: 'none',
                            borderRadius: '10px', color: '#fff', fontSize: '14px',
                            fontWeight: 600, cursor: 'pointer', marginTop: '8px',
                            boxShadow: 'var(--shadow-glow)',
                            transition: 'transform 0.2s, opacity 0.2s',
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '28px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: 'var(--color-primary-light)', fontWeight: 600, textDecoration: 'none' }}>
                        Sign In
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}
