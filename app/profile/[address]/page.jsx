// app/profile/[address]/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    ArrowLeft,
    Share2,
    DollarSign,
    Target,
    Calendar,
    CheckCircle2,
    ExternalLink
} from 'lucide-react';

async function getUserProfile(address) {
    // Mock data - replace with actual contract call
    return {
        name: "User Profile",
        description: "Web3 Enthusiast & Developer",
        image: "/api/placeholder/400/400",
        address: address,
        isVerified: true,
        totalReceived: "12.5",
        campaigns: [
            {
                id: 1,
                title: "Innovation Fund",
                description: "Supporting innovative blockchain projects",
                target: "20",
                amountCollected: "12.5",
                deadline: new Date(2024, 6, 15),
                image: "/api/placeholder/400/200"
            }
        ],
        donations: [
            {
                campaign: "Community Health Center",
                amount: "2.5",
                timestamp: new Date(2024, 3, 15),
                message: "Great initiative!"
            }
        ]
    };
}

export default function UserProfilePage({ params: paramsPromise }) {
    const params = React.use(paramsPromise);
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (params.address) {
            loadProfile(params.address);
        }
    }, [params.address]);

    const loadProfile = async (address) => {
        try {
            const data = await getUserProfile(address);
            setProfile(data);
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Button
                    variant="outline"
                    className="mb-6 gap-2"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>

                {/* Profile Header */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={profile.image} />
                                <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                                    {profile.isVerified && (
                                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                                    )}
                                </div>
                                <p className="text-gray-600 mb-2">{profile.description}</p>
                                <div className="text-sm text-gray-500 mb-4">
                                    {profile.address}
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <Link href={`/donate/${profile.address}`}>
                                        <Button className="gap-2">
                                            <DollarSign className="w-4 h-4" />
                                            Donate
                                        </Button>
                                    </Link>
                                    <Button variant="outline" className="gap-2">
                                        <Share2 className="w-4 h-4" />
                                        Share Profile
                                    </Button>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="text-sm text-gray-500">Total Received</div>
                                <div className="text-2xl font-bold">{profile.totalReceived} ETH</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs Content */}
                <Tabs defaultValue="campaigns" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                        <TabsTrigger value="donations">Donations</TabsTrigger>
                    </TabsList>

                    <TabsContent value="campaigns">
                        <div className="grid md:grid-cols-2 gap-6">
                            {profile.campaigns.map((campaign) => (
                                <Link href={`/campaigns/${campaign.id}`} key={campaign.id}>
                                    <Card className="hover:shadow-lg transition-shadow">
                                        <div className="relative">
                                            <img
                                                src={campaign.image}
                                                alt={campaign.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                                                {Math.ceil((campaign.deadline - new Date()) / (1000 * 60 * 60 * 24))} days left
                                            </div>
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold text-lg mb-2">{campaign.title}</h3>
                                            <p className="text-gray-600 text-sm mb-4">{campaign.description}</p>
                                            <div className="space-y-2">
                                                <Progress
                                                    value={(parseFloat(campaign.amountCollected) / parseFloat(campaign.target)) * 100}
                                                    className="h-2"
                                                />
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">
                                                        {campaign.amountCollected} / {campaign.target} ETH
                                                    </span>
                                                    <span className="font-medium">
                                                        {((parseFloat(campaign.amountCollected) / parseFloat(campaign.target)) * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="donations">
                        <Card>
                            <CardContent className="p-6">
                                {profile.donations.map((donation, index) => (
                                    <div key={index} className="border-b last:border-0 py-4">
                                        <div className="flex justify-between mb-1">
                                            <span className="font-medium">{donation.campaign}</span>
                                            <span className="font-medium">{donation.amount} ETH</span>
                                        </div>
                                        {donation.message && (
                                            <p className="text-gray-600 text-sm mb-1">{donation.message}</p>
                                        )}
                                        <div className="text-sm text-gray-500">
                                            {donation.timestamp.toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}