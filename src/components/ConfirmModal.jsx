import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaExclamationTriangle } from 'react-icons/fa'

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onCancel}
                style={{
                    position: 'fixed', inset: 0, zIndex: 100,
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '20px',
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        width: '100%', maxWidth: '380px',
                        background: 'var(--color-card)', border: '1px solid var(--color-border)',
                        borderRadius: '16px', padding: '32px',
                        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                    }}
                >
                    {/* Icon */}
                    <div style={{
                        width: '48px', height: '48px', borderRadius: '12px',
                        background: 'rgba(255,68,102,0.1)', border: '1px solid rgba(255,68,102,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 20px',
                    }}>
                        <FaExclamationTriangle style={{ color: 'var(--color-danger)', fontSize: '20px' }} />
                    </div>

                    {/* Title */}
                    <h3 style={{
                        margin: '0 0 8px', textAlign: 'center',
                        fontSize: '18px', fontWeight: 600, color: '#fff',
                    }}>
                        {title || 'Delete Image'}
                    </h3>

                    {/* Message */}
                    <p style={{
                        margin: '0 0 28px', textAlign: 'center',
                        fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6,
                    }}>
                        {message || 'Are you sure you want to delete this image? This action cannot be undone.'}
                    </p>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={onCancel}
                            style={{
                                flex: 1, padding: '12px',
                                background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                                borderRadius: '10px', color: '#fff',
                                fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                                transition: 'background 0.2s',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            style={{
                                flex: 1, padding: '12px',
                                background: 'var(--color-danger)', border: 'none',
                                borderRadius: '10px', color: '#fff',
                                fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                                transition: 'opacity 0.2s',
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
