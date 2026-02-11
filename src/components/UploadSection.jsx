import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import { uploadImage } from '../utils/db'

export default function UploadSection({ onUploadSuccess }) {
    const [file, setFile] = useState(null)
    const [customName, setCustomName] = useState('')
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const { user } = useAuth()

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0])
            setCustomName(e.target.files[0].name.replace(/\.[^/.]+$/, ''))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!file) return
        setUploading(true)
        setError('')
        const { data, error } = await uploadImage(file, user.id, customName)
        setUploading(false)
        if (error) {
            setError('Upload failed: ' + error.message)
        } else {
            onUploadSuccess(data)
            setFile(null)
            setCustomName('')
        }
    }

    const clearFile = () => {
        setFile(null)
        setCustomName('')
        setError('')
    }

    return (
        <div style={{
            background: 'var(--color-card)', border: '1px solid var(--color-border)',
            borderRadius: '14px', padding: '24px',
            boxShadow: 'var(--shadow-card)',
        }}>
            <h3 style={{
                margin: '0 0 18px', fontSize: '14px', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                color: 'var(--color-text-muted)',
            }}>
                <FaCloudUploadAlt style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Upload Image
            </h3>

            {error && (
                <div style={{
                    background: 'rgba(255,68,102,0.1)', border: '1px solid rgba(255,68,102,0.2)',
                    color: '#ff6680', padding: '8px 12px', borderRadius: '8px',
                    fontSize: '12px', marginBottom: '14px',
                }}>{error}</div>
            )}

            <form onSubmit={handleSubmit}>
                {!file ? (
                    <div style={{ position: 'relative' }}>
                        <input
                            type="file" accept="image/*"
                            onChange={handleFileChange}
                            style={{
                                position: 'absolute', inset: 0, width: '100%', height: '100%',
                                opacity: 0, cursor: 'pointer', zIndex: 2,
                            }}
                        />
                        <div style={{
                            border: '2px dashed var(--color-border)',
                            borderRadius: '10px', padding: '32px',
                            textAlign: 'center', transition: 'border-color 0.2s',
                        }}>
                            <FaCloudUploadAlt style={{ fontSize: '32px', color: 'var(--color-primary)', marginBottom: '10px' }} />
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', margin: 0 }}>
                                Click or drag an image here
                            </p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            background: 'var(--color-surface)', padding: '10px 14px',
                            borderRadius: '8px', marginBottom: '12px',
                        }}>
                            <span style={{ fontSize: '13px', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>{file.name}</span>
                            <button type="button" onClick={clearFile} style={{
                                background: 'none', border: 'none', color: 'var(--color-text-muted)',
                                cursor: 'pointer', padding: '4px',
                            }}>
                                <FaTimes />
                            </button>
                        </div>

                        <input
                            type="text" value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            placeholder="Rename (optional)"
                            style={{
                                width: '100%', padding: '10px 12px',
                                background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                                borderRadius: '8px', color: '#fff', fontSize: '13px',
                                outline: 'none', marginBottom: '12px', boxSizing: 'border-box',
                            }}
                        />

                        <button
                            type="submit" disabled={uploading}
                            style={{
                                width: '100%', padding: '12px',
                                background: 'var(--gradient-primary)', border: 'none',
                                borderRadius: '8px', color: '#fff', fontSize: '13px',
                                fontWeight: 600, cursor: 'pointer',
                                opacity: uploading ? 0.7 : 1,
                                transition: 'opacity 0.2s',
                            }}
                        >
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                )}
            </form>
        </div>
    )
}
