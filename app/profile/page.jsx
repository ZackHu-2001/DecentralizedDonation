// app/profile/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Edit,
    Share2,
    ExternalLink,
    Clock,
    DollarSign,
    Target
} from 'lucide-react';
import Link from 'next/link';

async function getPersonalProfile() {
    // Mock data - replace with actual contract call
    return {
        name: "John Doe",
        description: "Web3 Developer & Open Source Contributor",
        image: "/api/placeholder/400/400",
        totalReceived: "5.5",
        address: "0x1234...5678",
        isVerified: true,
        campaigns: [
            {
                id: 1,
                title: "Education Support Program",
                description: "Supporting education initiatives",
                target: "10",
                amountCollected: "5.5",
                deadline: new Date(2024, 5, 15),
            }
        ],
        donations: [
            {
                to: "Community Health Center",
                amount: "1.2",
                timestamp: new Date(2024, 3, 15)
            }
        ],
        receivedDonations: [
            {
                from: "0xabcd...1234",
                amount: "0.8",
                message: "Great work!",
                timestamp: new Date(2024, 3, 14)
            }
        ]
    };
}

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await getPersonalProfile();
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
                                </div>
                                <p className="text-gray-600 mb-4">{profile.description}</p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/profile/edit">
                                        <Button variant="outline" className="gap-2">
                                            <Edit className="w-4 h-4" />
                                            Edit Profile
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
                        <TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
                        <TabsTrigger value="donations">My Donations</TabsTrigger>
                        <TabsTrigger value="received">Received Donations</TabsTrigger>
                    </TabsList>

                    <TabsContent value="campaigns">
                        <div className="grid md:grid-cols-2 gap-6">
                            {profile.campaigns.map((campaign) => (
                                <Card key={campaign.id}>
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold mb-2">{campaign.title}</h3>
                                        <p className="text-gray-600 text-sm mb-4">{campaign.description}</p>
                                        <Progress
                                            value={(parseFloat(campaign.amountCollected) / parseFloat(campaign.target)) * 100}
                                            className="h-2 mb-2"
                                        />
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                {campaign.amountCollected} / {campaign.target} ETH
                                            </span>
                                            <span className="text-gray-600">
                                                {Math.ceil((campaign.deadline - new Date()) / (1000 * 60 * 60 * 24))} days left
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="donations">
                        <Card>
                            <CardContent className="p-6">
                                {profile.donations.map((donation, index) => (
                                    <div key={index} className="border-b last:border-0 py-4">
                                        <div className="flex justify-between mb-1">
                                            <span className="font-medium">{donation.to}</span>
                                            <span className="font-medium">{donation.amount} ETH</span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {donation.timestamp.toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="received">
                        <Card>
                            <CardContent className="p-6">
                                {profile.receivedDonations.map((donation, index) => (
                                    <div key={index} className="border-b last:border-0 py-4">
                                        <div className="flex justify-between mb-1">
                                            <span className="font-medium">{donation.from}</span>
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