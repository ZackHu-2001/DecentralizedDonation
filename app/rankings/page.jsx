// app/rankings/page.jsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Trophy,
    Medal,
    Crown,
    TrendingUp,
    Heart,
    Target,
    Calendar,
    ArrowRight,
    Flame,
    BarChart3
} from 'lucide-react';

export default function RankingsPage() {
    const [timeframe, setTimeframe] = useState('all'); // all, month, week

    const topCampaigns = [
        {
            id: 1,
            title: "Turkey Earthquake Recovery Fund",
            amount: "385.5",
            donors: 250,
            progress: 77,
            image: "/api/placeholder/400/200",
            owner: "0x1234...5678",
            category: "Disaster Relief",
            verified: true
        },
        {
            id: 2,
            title: "Flood Recovery - Southeast Asia",
            amount: "218.3",
            donors: 180,
            progress: 72,
            image: "/api/placeholder/400/200",
            owner: "0x8765...4321",
            category: "Infrastructure",
            verified: true
        },
        {
            id: 3,
            title: "Wildfire Community Rebuild",
            amount: "289.7",
            donors: 210,
            progress: 64,
            image: "/api/placeholder/400/200",
            owner: "0x5432...8765",
            category: "Community",
            verified: false
        }
    ];

    const topDonors = [
        {
            address: "0xabcd...efgh",
            totalDonated: "45.5",
            campaigns: 12,
            avatar: "/api/placeholder/32/32",
            badge: "Diamond",
            lastActive: "2 hours ago"
        },
        {
            address: "0xijkl...mnop",
            totalDonated: "38.2",
            campaigns: 8,
            avatar: "/api/placeholder/32/32",
            badge: "Gold",
            lastActive: "5 hours ago"
        },
        {
            address: "0xqrst...uvwx",
            totalDonated: "32.7",
            campaigns: 15,
            avatar: "/api/placeholder/32/32",
            badge: "Silver",
            lastActive: "1 day ago"
        }
    ];

    const impactLeaders = [
        {
            address: "0x1234...5678",
            metric: "People Helped",
            value: "1,250",
            category: "Health",
            verified: true
        },
        {
            address: "0x8765...4321",
            metric: "Houses Rebuilt",
            value: "45",
            category: "Infrastructure",
            verified: true
        },
        {
            address: "0x5432...8765",
            metric: "Communities Served",
            value: "8",
            category: "Community",
            verified: false
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Rankings</h1>
                        <p className="text-gray-500">
                            Recognizing top contributors and impactful campaigns
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={timeframe === 'all' ? 'default' : 'outline'}
                            onClick={() => setTimeframe('all')}
                        >
                            All Time
                        </Button>
                        <Button
                            variant={timeframe === 'month' ? 'default' : 'outline'}
                            onClick={() => setTimeframe('month')}
                        >
                            This Month
                        </Button>
                        <Button
                            variant={timeframe === 'week' ? 'default' : 'outline'}
                            onClick={() => setTimeframe('week')}
                        >
                            This Week
                        </Button>
                    </div>
                </div>

                {/* Rankings Tabs */}
                <Tabs defaultValue="campaigns" className="space-y-8">
                    <TabsList>
                        <TabsTrigger value="campaigns" className="gap-2">
                            <Trophy className="w-4 h-4" />
                            Top Campaigns
                        </TabsTrigger>
                        <TabsTrigger value="donors" className="gap-2">
                            <Heart className="w-4 h-4" />
                            Top Donors
                        </TabsTrigger>
                        <TabsTrigger value="impact" className="gap-2">
                            <Target className="w-4 h-4" />
                            Impact Leaders
                        </TabsTrigger>
                    </TabsList>

                    {/* Top Campaigns */}
                    <TabsContent value="campaigns">
                        <div className="grid gap-6">
                            {topCampaigns.map((campaign, index) => (
                                <Card key={campaign.id}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-6">
                                            <div className="flex-shrink-0">
                                                {index === 0 && <Crown className="h-8 w-8 text-yellow-500" />}
                                                {index === 1 && <Medal className="h-8 w-8 text-gray-400" />}
                                                {index === 2 && <Medal className="h-8 w-8 text-amber-600" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-semibold truncate">
                                                        {campaign.title}
                                                    </h3>
                                                    {campaign.verified && (
                                                        <Badge variant="secondary">Verified</Badge>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-3 gap-4 mb-4">
                                                    <div>
                                                        <div className="text-sm text-gray-500">Raised</div>
                                                        <div className="font-semibold">{campaign.amount} ETH</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-500">Donors</div>
                                                        <div className="font-semibold">{campaign.donors}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-500">Progress</div>
                                                        <div className="font-semibold">{campaign.progress}%</div>
                                                    </div>
                                                </div>
                                                <Progress value={campaign.progress} className="h-2" />
                                            </div>
                                            <Button variant="outline" className="flex-shrink-0">
                                                View Details
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Top Donors */}
                    <TabsContent value="donors">
                        <div className="grid gap-6">
                            {topDonors.map((donor, index) => (
                                <Card key={donor.address}>
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-6">
                                            <div className="flex-shrink-0">
                                                {index === 0 && <Crown className="h-8 w-8 text-yellow-500" />}
                                                {index === 1 && <Medal className="h-8 w-8 text-gray-400" />}
                                                {index === 2 && <Medal className="h-8 w-8 text-amber-600" />}
                                            </div>
                                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={donor.avatar} />
                                                    <AvatarFallback>
                                                        {donor.address.slice(2, 4)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-semibold">{donor.address}</div>
                                                    <div className="text-sm text-gray-500">
                                                        Last active {donor.lastActive}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-8 flex-shrink-0">
                                                <div>
                                                    <div className="text-sm text-gray-500">Total Donated</div>
                                                    <div className="font-semibold">{donor.totalDonated} ETH</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-500">Campaigns</div>
                                                    <div className="font-semibold">{donor.campaigns}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-500">Badge</div>
                                                    <Badge variant="secondary">{donor.badge}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Impact Leaders */}
                    <TabsContent value="impact">
                        <div className="grid gap-6">
                            {impactLeaders.map((leader, index) => (
                                <Card key={leader.address}>
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-6">
                                            <div className="flex-shrink-0">
                                                <BarChart3 className="h-8 w-8 text-blue-500" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-semibold">{leader.address}</h3>
                                                    {leader.verified && (
                                                        <Badge variant="secondary">Verified</Badge>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div>
                                                        <div className="text-sm text-gray-500">Impact Metric</div>
                                                        <div className="font-semibold">{leader.metric}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-500">Value</div>
                                                        <div className="font-semibold">{leader.value}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-500">Category</div>
                                                        <div className="font-semibold">{leader.category}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="outline" className="flex-shrink-0">
                                                View Profile
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}