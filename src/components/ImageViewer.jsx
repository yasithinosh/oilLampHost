import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function ImageViewer({ images, currentIndex, onClose, onNext, onPrev }) {
    if (currentIndex === null) return null
    const currentImage = images[currentIndex]

    return (
        <AnimatePresence>
            <div
                onClick={onClose}
                style={{
                    position: 'fixed', inset: 0, zIndex: 60,
                    background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
            >
                {/* Close */}
                <button onClick={onClose} style={{
                    position: 'absolute', top: '20px', right: '20px',
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%', width: '40px', height: '40px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', cursor: 'pointer', zIndex: 20,
                }}>
                    <FaTimes />
                </button>

                {/* Prev */}
                <button onClick={onPrev} style={{
                    position: 'absolute', left: '20px',
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%', width: '48px', height: '48px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', cursor: 'pointer', zIndex: 20, fontSize: '20px',
                }}>
                    <FaChevronLeft />
                </button>

                {/* Next */}
                <button onClick={onNext} style={{
                    position: 'absolute', right: '20px',
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%', width: '48px', height: '48px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', cursor: 'pointer', zIndex: 20, fontSize: '20px',
                }}>
                    <FaChevronRight />
                </button>

                {/* Image */}
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px',
                    }}
                >
                    <img
                        src={currentImage.url}
                        alt={currentImage.name}
                        style={{
                            maxHeight: '80vh', maxWidth: '90vw', objectFit: 'contain',
                            borderRadius: '8px', boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                        }}
                    />
                    <p style={{
                        marginTop: '16px', fontSize: '14px', fontWeight: 500, color: '#fff',
                    }}>
                        {currentImage.name}
                    </p>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
