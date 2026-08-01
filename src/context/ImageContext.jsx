import { createContext, useContext, useState } from 'react'
import { Upload, DeleteImage, GetAllImage, UpdateImage } from '../services/apiService'

export const ImageContext = createContext()

export const ImageProvider = ({ children }) => {
    const [images, setImages] = useState([])

    const upload = async (image) => {
        const response = await Upload(image)
        if (response?.newImage) {
            setImages([...images, response.newImage])
        }
    }

    const deleteImage = async (id) => {
        const response = await DeleteImage(id)
        setImages(images.filter((image) => image._id !== id))
    }

    const updateImage = async (id, caption) => {
        const response = await UpdateImage(id, caption)
        if (response?.updatedImage) {
            setImages(images.map((image) => image._id === id ? response.updatedImage : image))
        }
    }

    const getAllImages = async () => {
        const response = await GetAllImage()
        setImages(response?.images || [])
    }

    return (
        <ImageContext.Provider value={{ images, upload, deleteImage, getAllImages, updateImage }}>
            {children}
        </ImageContext.Provider>
    )
}

export const useImages = () => {
    return useContext(ImageContext)
}