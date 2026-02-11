import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FaSignOutAlt } from 'react-icons/fa'

export default function Navbar() {
    const { user, signOut } = useAuth()
    const navigate = useNavigate()

    const handleSignOut = async () => {
        await signOut()
        navigate('/login')
    }

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '16px 32px',
            background: 'rgba(10, 10, 15, 0.85)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--color-border)',
        }}>
            <Link to="/" style={{
                fontSize: '18px', fontWeight: 700, letterSpacing: '0.15em', color: '#fff',
                textDecoration: 'none',
            }}>
                ATIT
            </Link>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <Link to="/" style={{
                    fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em',
                    color: 'var(--color-text-muted)', textDecoration: 'none',
                }}>Home</Link>
                {user ? (
                    <>
                        <Link to="/gallery" style={{
                            fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em',
                            color: 'var(--color-text-muted)', textDecoration: 'none',
                        }}>Gallery</Link>
                        <button onClick={handleSignOut} style={{
                            background: 'none', border: 'none', color: 'var(--color-text-muted)',
                            fontSize: '16px', cursor: 'pointer',
                        }} title="Sign Out">
                            <FaSignOutAlt />
                        </button>
                    </>
                ) : (
                    <Link to="/login" style={{
                        fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em',
                        padding: '8px 20px', border: '1px solid var(--color-primary)',
                        borderRadius: '6px', color: 'var(--color-primary)', textDecoration: 'none',
                    }}>Login</Link>
                )}
            </div>
        </nav>
    )
}
