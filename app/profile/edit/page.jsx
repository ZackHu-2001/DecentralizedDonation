// app/profile/edit/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    ArrowLeft,
    Loader2,
    Upload,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';

export default function EditProfilePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null
    });
    const [preview, setPreview] = useState(null);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            // Load current profile data
            const profile = await getPersonalProfile();
            setFormData({
                name: profile.name,
                description: profile.description,
                image: profile.image
            });
            setPreview(profile.image);
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setError('');

        try {
            // Update profile logic here
            await new Promise(resolve => setTimeout(resolve, 1000));
            setStatus('success');
            setTimeout(() => {
                router.push('/profile');
            }, 1500);
        } catch (err) {
            setStatus('error');
            setError(err.message || 'Failed to update profile');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <Button
                    variant="outline"
                    className="mb-6 gap-2"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle>Edit Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Profile Image */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Profile Image</label>
                                <div className="border-2 border-dashed rounded-lg overflow-hidden">
                                    {preview ? (
                                        <div className="relative">
                                            <img
                                                src={preview}
                                                alt="Profile preview"
                                                className="w-full h-48 object-cover"
                                            />
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                size="sm"
                                                className="absolute bottom-2 right-2"
                                                onClick={() => {
                                                    setPreview(null);
                                                    setFormData(prev => ({ ...prev, image: null }));
                                                }}
                                            >
                                                Change Image
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="p-8">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="text-center">
                                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="mt-4">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        Upload a file
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    PNG, JPG up to 10MB
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Name */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Name</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Description</label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Tell others about yourself..."
                                    rows={4}
                                />
                            </div>

                            {status === 'error' && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {status === 'success' && (
                                <Alert className="bg-green-50 text-green-700 border-green-200">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <AlertDescription>Profile updated successfully!</AlertDescription>
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}