// app/campaigns/[id]/page.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DonationForm from '@/components/campaigns/donation-form';
import {
    Calendar,
    Target,
    Users,
    Clock,
    Share2
} from 'lucide-react';

async function getCampaignDetails(id) {
    try {
        // Mock data simulation
        return {
            id,
            title: "Build Library for Rural Children",
            description: "Project to build a library for rural children to promote education and reading.",
            owner: "0x1234567890abcdef1234567890abcdef12345678",
            target: "10",
            deadline: new Date(2024, 11, 31),
            amountCollected: "4.5",
            image: "/library.webp",
            isActive: true,
            donations: [
                {
                    donor: "0xabcdef1234567890abcdef1234567890abcdef12",
                    amount: "1.5",
                    timestamp: new Date(2024, 3, 15),
                    message: "Hope these books bring joy to children!"
                },
                {
                    donor: "0x9876543210abcdef1234567890abcdef12345678",
                    amount: "3.0",
                    timestamp: new Date(2024, 3, 14),
                    message: "Supporting education"
                }
            ]
        };
    } catch (error) {
        console.error('Error fetching campaign details:', error);
        throw error;
    }
}

export default async function CampaignDetailPage({ params }) {
    const campaign = await getCampaignDetails(params.id);
    const progress = (parseFloat(campaign.amountCollected) / parseFloat(campaign.target)) * 100;
    const daysLeft = Math.max(0, Math.ceil(
        (campaign.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    ));

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Campaign Image */}
                        <div className="rounded-lg overflow-hidden">
                            <img
                                src={campaign.image}
                                alt={campaign.title}
                                className="w-full h-[400px] object-cover"
                            />
                        </div>

                        {/* Campaign Content */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">{campaign.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Creator Info */}
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage src="/api/placeholder/40/40" />
                                        <AvatarFallback>UN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">Creator</div>
                                        <div className="text-sm text-gray-500">
                                            {`${campaign.owner.slice(0, 6)}...${campaign.owner.slice(-4)}`}
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="prose max-w-none">
                                    <p>{campaign.description}</p>
                                </div>

                                {/* Campaign Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                                            <Target className="w-4 h-4" />
                                            <span>Target</span>
                                        </div>
                                        <div className="text-lg font-bold">{campaign.target} ETH</div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>Time Left</span>
                                        </div>
                                        <div className="text-lg font-bold">{daysLeft} days</div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                                            <Users className="w-4 h-4" />
                                            <span>Donors</span>
                                        </div>
                                        <div className="text-lg font-bold">{campaign.donations.length}</div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                                            <Clock className="w-4 h-4" />
                                            <span>Progress</span>
                                        </div>
                                        <div className="text-lg font-bold">{progress.toFixed(1)}%</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Donations and Updates */}
                        <Card>
                            <CardContent className="p-6">
                                <Tabs defaultValue="donations">
                                    <TabsList>
                                        <TabsTrigger value="donations">Donations</TabsTrigger>
                                        <TabsTrigger value="updates">Updates</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="donations" className="space-y-4">
                                        {campaign.donations.map((donation, index) => (
                                            <div
                                                key={index}
                                                className="border-b last:border-0 pb-4 last:pb-0"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarImage src="/api/placeholder/32/32" />
                                                            <AvatarFallback>
                                                                {donation.donor.slice(2, 4).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">
                                                                {`${donation.donor.slice(0, 6)}...${donation.donor.slice(-4)}`}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {donation.timestamp.toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-bold">{donation.amount} ETH</div>
                                                    </div>
                                                </div>
                                                {donation.message && (
                                                    <div className="mt-2 text-gray-600 text-sm">
                                                        {donation.message}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </TabsContent>
                                    <TabsContent value="updates">
                                        <div className="text-gray-500 text-center py-8">
                                            No updates yet
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Donation Form */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-4">
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    {/* Progress Bar */}
                                    <div className="space-y-2">
                                        <Progress value={progress} className="h-2" />
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                Raised {campaign.amountCollected} ETH
                                            </span>
                                            <span className="font-medium">{progress.toFixed(1)}%</span>
                                        </div>
                                    </div>

                                    {/* Donation Form */}
                                    <DonationForm
                                        campaignId={params.id}
                                        isActive={campaign.isActive}
                                        deadline={campaign.deadline}
                                    />

                                    {/* Share Button */}
                                    <button className="flex items-center justify-center gap-2 w-full py-2 text-gray-600 hover:text-gray-900">
                                        <Share2 className="w-4 h-4" />
                                        Share Campaign
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
