import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCopy, FaTrash, FaCheck } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import { deleteImage } from '../utils/db'
import ConfirmModal from './ConfirmModal'

export default function ImageCard({ image, onDelete }) {
    const { user } = useAuth()
    const [copied, setCopied] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const handleCopy = (e) => {
        e.stopPropagation()
        navigator.clipboard.writeText(image.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const openConfirm = (e) => {
        e.stopPropagation()
        setShowConfirm(true)
    }

    const handleDelete = async () => {
        setDeleting(true)
        setShowConfirm(false)
        const { error } = await deleteImage(image.id, image.storage_path)
        if (error) {
            alert('Failed to delete')
            setDeleting(false)
        } else {
            onDelete(image.id)
        }
    }

    const isOwner = user && user.id === image.user_id

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    background: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.4)' }}
            >
                {/* Image Preview */}
                <div style={{
                    height: '160px', width: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--color-surface)',
                    padding: '8px',
                }}>
                    <img
                        src={image.url}
                        alt={image.name}
                        style={{
                            maxWidth: '100%', maxHeight: '100%',
                            objectFit: 'contain', borderRadius: '6px',
                        }}
                        loading="lazy"
                    />
                </div>

                {/* Card Footer */}
                <div style={{ padding: '12px 14px' }}>
                    <p style={{
                        margin: '0 0 10px', fontSize: '12px', fontWeight: 500,
                        color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}>
                        {image.name}
                    </p>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={handleCopy}
                            style={{
                                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                gap: '6px', padding: '8px',
                                background: copied ? 'rgba(74,255,130,0.15)' : 'var(--color-surface)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '8px', color: copied ? '#4aff82' : 'var(--color-text-muted)',
                                fontSize: '10px', fontWeight: 600, textTransform: 'uppercase',
                                letterSpacing: '0.05em', cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                        >
                            {copied ? <FaCheck size={10} /> : <FaCopy size={10} />}
                            {copied ? 'Copied!' : 'Copy URL'}
                        </button>

                        {isOwner && (
                            <button
                                onClick={openConfirm}
                                disabled={deleting}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    padding: '8px 12px',
                                    background: 'rgba(255,68,102,0.1)',
                                    border: '1px solid rgba(255,68,102,0.2)',
                                    borderRadius: '8px', color: 'var(--color-danger)',
                                    cursor: 'pointer', transition: 'all 0.2s',
                                    opacity: deleting ? 0.5 : 1,
                                }}
                                title="Delete"
                            >
                                <FaTrash size={11} />
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Custom Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={showConfirm}
                title="Delete Image"
                message={`Are you sure you want to delete "${image.name}"? This action cannot be undone.`}
                onConfirm={handleDelete}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    )
}
