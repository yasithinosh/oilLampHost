import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signIn } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            const { error } = await signIn(email, password)
            if (error) throw error
            navigate('/gallery')
        } catch (err) {
            setError('Failed to log in: ' + err.message)
        } finally {
            setLoading(false)
        }
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
                    <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 600, letterSpacing: '-0.01em' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginTop: '8px' }}>Sign in to your account</p>
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
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Email</label>
                        <input
                            type="email" required value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            style={{
                                width: '100%', padding: '12px 14px',
                                background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                                borderRadius: '10px', color: '#fff', fontSize: '14px',
                                outline: 'none', transition: 'border-color 0.2s',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Password</label>
                        <input
                            type="password" required value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{
                                width: '100%', padding: '12px 14px',
                                background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                                borderRadius: '10px', color: '#fff', fontSize: '14px',
                                outline: 'none', transition: 'border-color 0.2s',
                                boxSizing: 'border-box',
                            }}
                        />
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
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '28px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ color: 'var(--color-primary-light)', fontWeight: 600, textDecoration: 'none' }}>
                        Sign Up
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}
