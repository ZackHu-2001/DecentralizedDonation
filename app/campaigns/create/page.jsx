// app/campaigns/create/page.jsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ethers } from 'ethers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Calendar,
    Target,
    Upload,
    Loader2,
    ArrowLeft,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';

export default function CreateCampaignPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: null,
        category: ''
    });
    const [preview, setPreview] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));

            // Create image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setFormData(prev => ({
            ...prev,
            image: null
        }));
        setPreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setError('');

        try {
            // Validation
            if (!formData.title || !formData.description || !formData.target || !formData.deadline) {
                throw new Error('Please fill in all required fields');
            }

            if (!window.ethereum) {
                throw new Error('Please install MetaMask to create a campaign');
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();

            // Create contract instance
            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                CONTRACT_ABI,
                signer
            );

            // Convert target to Wei
            const targetInWei = ethers.parseEther(formData.target);

            // Convert deadline to timestamp
            const deadlineTimestamp = Math.floor(new Date(formData.deadline).getTime() / 1000);

            // Upload image (mock for now)
            const imageUrl = '/api/placeholder/800/400'; // Replace with actual image upload

            // Create campaign transaction
            const tx = await contract.createCampaign(
                formData.title,
                formData.description,
                targetInWei,
                deadlineTimestamp,
                imageUrl
            );

            await tx.wait();
            setStatus('success');

            // Redirect after successful creation
            setTimeout(() => {
                router.push('/campaigns');
            }, 2000);

        } catch (err) {
            setStatus('error');
            setError(err.message || 'Failed to create campaign');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <Link href="/campaigns">
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Campaigns
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Create Campaign</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Campaign Image */}
                            {/* Campaign Image */}
                            <div className="space-y-2">
                                <Label>Campaign Image</Label>
                                <div className="border-2 border-dashed rounded-lg overflow-hidden p-4">
                                    {preview ? (
                                        <div className="relative">
                                            <img
                                                src={preview}
                                                alt="Campaign preview"
                                                className="w-full aspect-video object-cover"
                                            />
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                size="sm"
                                                className="absolute bottom-2 right-2"
                                                onClick={removeImage}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="mt-4">
                                                <label className="text-sm font-medium text-gray-900 cursor-pointer">
                                                    Drop your image here, or{" "}
                                                    <span className="text-blue-600 underline">browse</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="hidden" // Hides the input itself
                                                    />
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                PNG, JPG up to 10MB
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>


                            {/* Campaign Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">Campaign Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Give your campaign a title"
                                    required
                                />
                            </div>

                            {/* Campaign Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Campaign Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe your campaign and its goals..."
                                    rows={6}
                                    required
                                />
                            </div>

                            {/* Target Amount */}
                            <div className="space-y-2">
                                <Label htmlFor="target">Target Amount (ETH)</Label>
                                <div className="relative">
                                    <Target className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="target"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={formData.target}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            {/* End Date */}
                            <div className="space-y-2">
                                <Label htmlFor="deadline">End Date</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="deadline"
                                        type="date"
                                        value={formData.deadline}
                                        onChange={handleInputChange}
                                        className="pl-10"
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <select
                                    id="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <option value="education">Education</option>
                                    <option value="health">Health</option>
                                    <option value="environment">Environment</option>
                                    <option value="technology">Technology</option>
                                    <option value="community">Community</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Error Message */}
                            {status === 'error' && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Success Message */}
                            {status === 'success' && (
                                <Alert className="bg-green-50 text-green-700 border-green-200">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <AlertDescription>
                                        Campaign created successfully! Redirecting...
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating Campaign...
                                    </>
                                ) : (
                                    'Create Campaign'
                                )}
                            </Button>

                            {/* Terms Notice */}
                            <p className="text-sm text-gray-500 text-center">
                                By creating a campaign, you agree to our Terms of Service and Platform Guidelines
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}