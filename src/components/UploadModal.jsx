import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import { uploadImage } from '../utils/db'

export default function UploadModal({ isOpen, onClose, onUploadSuccess }) {
    const [file, setFile] = useState(null)
    const [customName, setCustomName] = useState('')
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const { user } = useAuth()

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0])
            setCustomName(e.target.files[0].name.replace(/\.[^/.]+$/, ""))
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
            handleClose()
        }
    }

    const handleClose = () => {
        setFile(null)
        setCustomName('')
        setError('')
        setUploading(false)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-md relative shadow-2xl shadow-black/50"
            >
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                >
                    <FaTimes size={20} />
                </button>

                <h3 className="text-2xl font-light mb-8 tracking-[0.2em] text-center">UPLOAD PHOTO</h3>

                {error && <div className="mb-6 text-red-400 text-sm bg-red-900/10 border border-red-900/50 p-3 rounded">{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="relative group">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 ${file ? 'border-white bg-white/5' : 'border-gray-800 hover:border-gray-600 hover:bg-white/5'}`}>
                            <div className="flex flex-col items-center gap-4 pointer-events-none">
                                <FaCloudUploadAlt className={`text-5xl transition-colors duration-300 ${file ? 'text-white' : 'text-gray-600 group-hover:text-gray-400'}`} />
                                <span className={`text-xs uppercase tracking-widest ${file ? 'text-white' : 'text-gray-500'}`}>
                                    {file ? file.name : 'Click or Drag Image'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {file && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                            <label className="block text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-bold">Rename (Optional)</label>
                            <input
                                type="text"
                                value={customName}
                                onChange={(e) => setCustomName(e.target.value)}
                                className="w-full bg-transparent border-b border-gray-800 text-white p-2 focus:outline-none focus:border-white transition-colors font-light tracking-wide"
                                placeholder="Enter image name"
                            />
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={!file || uploading}
                        className="mt-2 w-full py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-gray-200 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                    >
                        {uploading ? 'Uploading...' : 'Confirm Upload'}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}
