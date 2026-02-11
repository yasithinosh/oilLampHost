import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getImages } from '../utils/db'
import ImageCard from '../components/ImageCard'
import UploadSection from '../components/UploadSection'
import ImageViewer from '../components/ImageViewer'

export default function Gallery() {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [viewerIndex, setViewerIndex] = useState(null)

    useEffect(() => {
        loadImages()
    }, [])

    async function loadImages() {
        const { data } = await getImages()
        if (data) setImages(data)
        setLoading(false)
    }

    const handleUploadSuccess = (newImage) => {
        setImages([newImage, ...images])
    }

    const handleDelete = (deletedId) => {
        setImages(images.filter(img => img.id !== deletedId))
        if (viewerIndex !== null) setViewerIndex(null)
    }

    const openViewer = (index) => setViewerIndex(index)

    const nextImage = (e) => {
        e.stopPropagation()
        setViewerIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = (e) => {
        e.stopPropagation()
        setViewerIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>

                {/* Upload Section - Top Left */}
                <div style={{ maxWidth: '360px', marginBottom: '32px' }}>
                    <UploadSection onUploadSuccess={handleUploadSuccess} />
                </div>

                {/* Gallery Section */}
                <div style={{
                    background: 'var(--color-card)', border: '1px solid var(--color-border)',
                    borderRadius: '14px', padding: '24px',
                    boxShadow: 'var(--shadow-card)',
                }}>
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        marginBottom: '20px',
                    }}>
                        <h2 style={{
                            margin: 0, fontSize: '18px', fontWeight: 600, letterSpacing: '0.05em',
                        }}>
                            Gallery
                        </h2>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                            {images.length} {images.length === 1 ? 'image' : 'images'}
                        </span>
                    </div>

                    {loading ? (
                        <div style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center', padding: '80px 0', gap: '14px',
                        }}>
                            <div style={{
                                width: '36px', height: '36px',
                                border: '3px solid var(--color-border)',
                                borderTopColor: 'var(--color-primary)',
                                borderRadius: '50%',
                                animation: 'spin 0.8s linear infinite',
                            }} />
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>Loading...</span>
                            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                        </div>
                    ) : images.length === 0 ? (
                        <div style={{
                            textAlign: 'center', padding: '60px 20px',
                            color: 'var(--color-text-muted)',
                        }}>
                            <p style={{ fontSize: '15px', marginBottom: '8px' }}>No images uploaded yet</p>
                            <p style={{ fontSize: '12px' }}>Use the upload section above to get started</p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '16px',
                        }}>
                            {images.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => openViewer(index)}
                                >
                                    <ImageCard image={image} onDelete={handleDelete} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Full-screen Image Viewer */}
            <ImageViewer
                images={images}
                currentIndex={viewerIndex}
                onClose={() => setViewerIndex(null)}
                onNext={nextImage}
                onPrev={prevImage}
            />
        </div>
    )
}
