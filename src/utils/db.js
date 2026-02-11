import { supabase } from '../supabaseClient'
import { v4 as uuidv4 } from 'uuid'

export const uploadImage = async (file, userId, customName) => {
    try {
        // Upload to Supabase Storage (No Compression)
        const fileExt = file.name.split('.').pop()
        const fileName = `${uuidv4()}.${fileExt}`
        const filePath = `${userId}/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, file)

        if (uploadError) throw uploadError

        // 3. Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath)

        // 4. Save Metadata to Database
        const { data, error: dbError } = await supabase
            .from('photos')
            .insert([
                {
                    name: customName || file.name,
                    url: publicUrl,
                    storage_path: filePath,
                    user_id: userId,
                },
            ])
            .select()
            .single()

        if (dbError) throw dbError

        return { data, error: null }
    } catch (error) {
        console.error('Error uploading image:', error)
        return { data: null, error }
    }
}

export const getImages = async () => {
    try {
        // Fetch all photos, ordered by newest first
        const { data, error } = await supabase
            .from('photos')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error fetching images:', error)
        return { data: null, error }
    }
}

export const deleteImage = async (photoId, storagePath) => {
    try {
        // 1. Delete from Storage
        const { error: storageError } = await supabase.storage
            .from('images')
            .remove([storagePath])

        if (storageError) throw storageError

        // 2. Delete from Database
        const { error: dbError } = await supabase
            .from('photos')
            .delete()
            .eq('id', photoId)

        if (dbError) throw dbError

        return { error: null }
    } catch (error) {
        console.error('Error deleting image:', error)
        return { error }
    }
}
