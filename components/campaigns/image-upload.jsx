// components/campaigns/image-upload.jsx
'use client';

import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ImageUpload({ onImageChange }) {
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Handle file upload
        try {
            setUploading(true);
            // Here you would typically upload to IPFS or your preferred storage
            // const uploadedUrl = await uploadToStorage(file);
            // onImageChange(uploadedUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        setPreview(null);
        onImageChange(null);
    };

    return (
        <div className="border-2 border-dashed rounded-lg overflow-hidden">
            {preview ? (
                <div className="relative">
                    <img
                        src={preview}
                        alt="Campaign preview"
                        className="w-full aspect-video object-cover"
                    />
                    <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-2 right-2"
                        onClick={removeImage}
                    >
                        <X className="w-4 h-4 mr-2" />
                        Remove
                    </Button>
                </div>
            ) : (
                <div className="p-8">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                                Upload a file
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                            PNG, JPG up to 10MB
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}