// app/donate/[address]/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Loader2,
    AlertCircle,
    CheckCircle2,
    DollarSign,
    ArrowLeft
} from 'lucide-react';

async function getProfileData(address) {
    // Mock data - replace with actual contract call
    return {
        name: "John Doe",
        description: "Web3 Developer & Open Source Contributor",
        image: "/api/placeholder/400/400",
        totalReceived: "5.5",
        isVerified: true,
        acceptingDonations: true,
        recentDonations: [
            {
                donor: "0xabcd...1234",
                amount: "1.5",
                timestamp: new Date(2024, 3, 15),
                message: "Keep up the great work!"
            },
            {
                donor: "0xefgh...5678",
                amount: "0.8",
                timestamp: new Date(2024, 3, 14),
                message: "Thanks for your contributions"
            }
        ]
    };
}

export default function DonationPage({ params: paramsPromise }) {
    const params = React.use(paramsPromise);
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [error, setError] = useState('');

    useEffect(() => {
        if (params.address) {
            loadProfile(params.address);
        }
    }, [params.address]);

    const loadProfile = async (address) => {
        try {
            const data = await getProfileData(address);
            setProfile(data);
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDonate = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setError('');

        try {
            if (!window.ethereum) {
                throw new Error('Please install MetaMask to make donations');
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

            // Convert amount to Wei
            const amountInWei = ethers.parseEther(amount);

            // Send donation transaction
            const tx = await contract.donateToPersonal(
                params.address,
                message,
                { value: amountInWei }
            );

            await tx.wait();
            setStatus('success');

            // Reset form
            setAmount('');
            setMessage('');

            // Reload profile data
            loadProfile(params.address);

            // Reset status after delay
            setTimeout(() => {
                setStatus('idle');
            }, 3000);

        } catch (err) {
            setStatus('error');
            setError(err.message || 'Failed to process donation');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Button
                    variant="outline"
                    className="mb-6 gap-2"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Profile Info */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={profile.image} />
                                    <AvatarFallback>
                                        {profile.name.slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {profile.name}
                                        {profile.isVerified && (
                                            <CheckCircle2 className="inline-block ml-2 h-5 w-5 text-blue-500" />
                                        )}
                                    </h2>
                                    <p className="text-gray-500 text-sm">
                                        {params.address}
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-6">
                                {profile.description}
                            </p>

                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <div className="text-sm text-gray-500">Total Received</div>
                                <div className="text-2xl font-bold">{profile.totalReceived} ETH</div>
                            </div>

                            {/* Recent Donations */}
                            {profile.recentDonations.length > 0 && (
                                <div>
                                    <h3 className="font-medium mb-4">Recent Donations</h3>
                                    <div className="space-y-4">
                                        {profile.recentDonations.map((donation, index) => (
                                            <div key={index} className="border-b pb-4 last:border-0">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-gray-600">{donation.donor}</span>
                                                    <span className="font-medium">{donation.amount} ETH</span>
                                                </div>
                                                {donation.message && (
                                                    <p className="text-sm text-gray-500">{donation.message}</p>
                                                )}
                                                <div className="text-xs text-gray-400 mt-1">
                                                    {donation.timestamp.toLocaleDateString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Donation Form */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Make a Donation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleDonate} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Amount (ETH)
                                        </label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                            <Input
                                                type="number"
                                                step="0.001"
                                                min="0"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                placeholder="0.00"
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Message (Optional)
                                        </label>
                                        <Textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Add a message..."
                                            rows={4}
                                        />
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
                                                Donation successful! Thank you for your support.
                                            </AlertDescription>
                                        </Alert>
                                    )}

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={status === 'loading' || !amount}
                                    >
                                        {status === 'loading' ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            'Send Donation'
                                        )}
                                    </Button>

                                    <p className="text-sm text-gray-500 text-center">
                                        Network fees apply to all donations
                                    </p>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}