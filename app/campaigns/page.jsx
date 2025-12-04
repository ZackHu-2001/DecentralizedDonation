// app/campaigns/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Search,
    Plus,
    Target,
    Calendar,
    TrendingUp,
    Filter,
    Loader2
} from 'lucide-react';

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: 'all',
        category: 'all',
        sortBy: 'newest'
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchCampaigns();
    }, [filters]);

    const fetchCampaigns = async () => {
        try {
            setIsLoading(true);
            // Mock data for demonstration
            const mockCampaigns = [
                {
                    id: 1,
                    title: "Turkey Earthquake Recovery Fund",
                    description: "Supporting immediate relief and reconstruction efforts for communities affected by the recent earthquake. Funds will provide temporary housing, medical supplies, and rebuilding assistance.",
                    target: "500",
                    amountCollected: "385.5",
                    deadline: new Date(2024, 11, 15),
                    image: "/turkey.webp",
                    owner: "0x1234...5678",
                    category: "Disaster Relief",
                    location: "Turkey",
                    impactStats: {
                        familiesHelped: 250,
                        housesRebuilt: 45,
                        medicalAidProvided: 1200
                    },
                    isActive: true
                },
                {
                    id: 2,
                    title: "Flood Recovery - Southeast Asia",
                    description: "Emergency assistance and infrastructure restoration for communities impacted by severe flooding. Focus on clean water access, sanitation, and rebuilding essential facilities.",
                    target: "300",
                    amountCollected: "218.3",
                    deadline: new Date(2024, 10, 20),
                    image: "/flood.webp",
                    owner: "0x9876...4321",
                    category: "Infrastructure",
                    location: "Vietnam",
                    impactStats: {
                        peopleAssisted: 1500,
                        waterSystemsRestored: 12,
                        emergencyShelters: 35
                    },
                    isActive: true
                },
                {
                    id: 3,
                    title: "Wildfire Community Rebuild",
                    description: "Supporting families who lost homes in recent wildfires. Funds support rebuilding homes, restoring local businesses, and implementing fire prevention measures.",
                    target: "450",
                    amountCollected: "289.7",
                    deadline: new Date(2024, 12, 10),
                    image: "/wildfire.webp",
                    owner: "0x5432...8765",
                    category: "Community Rebuild",
                    location: "California, USA",
                    impactStats: {
                        homesRebuilt: 28,
                        businessesRestored: 15,
                        firebreaksCreated: 8
                    },
                    isActive: true
                },
                {
                    id: 4,
                    title: "Education Support Program",
                    description: "Supporting education initiatives for underprivileged students.",
                    target: "20",
                    amountCollected: "12.5",
                    deadline: new Date(2024, 5, 15),
                    image: "/api/placeholder/400/200",
                    owner: "0x1234...5678",
                    category: "education",
                    isActive: false
                },
                {
                    id: 5,
                    title: "Community Health Center",
                    description: "Building a health center for remote communities.",
                    target: "30",
                    amountCollected: "18.3",
                    deadline: new Date(2024, 6, 20),
                    image: "/api/placeholder/400/200",
                    owner: "0x9876...4321",
                    category: "health",
                    isActive: false
                },
                // Add more mock campaigns...
            ];

            setTimeout(() => {
                setCampaigns(mockCampaigns);
                setIsLoading(false);
            }, 1000);

        } catch (error) {
            console.error('Error fetching campaigns:', error);
            setIsLoading(false);
        }
    };

    const filteredCampaigns = campaigns.filter(campaign => {
        const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            campaign.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = filters.status === 'all' ||
            (filters.status === 'active' && campaign.isActive) ||
            (filters.status === 'ended' && !campaign.isActive);

        const matchesCategory = filters.category === 'all' ||
            filters.category === campaign.category;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
        switch (filters.sortBy) {
            case 'amount':
                return parseFloat(b.amountCollected) - parseFloat(a.amountCollected);
            case 'deadline':
                return new Date(a.deadline) - new Date(b.deadline);
            case 'newest':
            default:
                return new Date(b.deadline) - new Date(a.deadline);
        }
    });

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Active Campaigns
                    </h1>
                    <Link href="/campaigns/create">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className="gap-2 shadow-lg hover:shadow-xl transition-shadow">
                                <Plus className="w-4 h-4" />
                                Create Campaign
                            </Button>
                        </motion.div>
                    </Link>
                </motion.div>

                {/* Filters and Search */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search campaigns..."
                            className="pl-9 border-gray-200 focus:border-blue-400 transition-colors"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <Select
                        value={filters.status}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                    >
                        <SelectTrigger className="border-gray-200 focus:border-blue-400">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="ended">Ended</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select
                        value={filters.category}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                    >
                        <SelectTrigger className="border-gray-200 focus:border-blue-400">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="health">Health</SelectItem>
                            <SelectItem value="environment">Environment</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="community">Community</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select
                        value={filters.sortBy}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
                    >
                        <SelectTrigger className="border-gray-200 focus:border-blue-400">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="amount">Amount Raised</SelectItem>
                            <SelectItem value="deadline">End Date</SelectItem>
                        </SelectContent>
                    </Select>
                </motion.div>

                {/* Campaigns Grid */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <CampaignSkeleton key={i} index={i} />
                            ))}
                        </motion.div>
                    ) : sortedCampaigns.length > 0 ? (
                        <motion.div
                            key="campaigns"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {sortedCampaigns.map((campaign, index) => (
                                <CampaignCard key={campaign.id} campaign={campaign} index={index} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            className="text-center py-12"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <div className="text-gray-500 text-lg">No campaigns found</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

function CampaignCard({ campaign, index = 0 }) {
    const progress = (parseFloat(campaign.amountCollected) / parseFloat(campaign.target)) * 100;
    const daysLeft = Math.max(0, Math.ceil(
        (campaign.deadline - new Date()) / (1000 * 60 * 60 * 24)
    ));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
            <Link href={`/campaigns/${campaign.id}`}>
                <Card className="overflow-hidden group cursor-pointer border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                    <div className="relative overflow-hidden">
                        <motion.img
                            src={campaign.image}
                            alt={campaign.title}
                            className="w-full h-48 object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.div
                            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-lg"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                        >
                            {daysLeft} days left
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
                            {campaign.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {campaign.description}
                        </p>

                        <div className="space-y-4">
                            <div className="flex justify-between text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Target className="w-4 h-4 mr-1" />
                                    <span>{campaign.target} ETH</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>{daysLeft} days</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(100, progress)}%` }}
                                        transition={{
                                            duration: 1,
                                            delay: 0.3 + index * 0.1,
                                            ease: "easeOut"
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Raised {campaign.amountCollected} ETH
                                    </span>
                                    <span className="font-medium text-blue-600">
                                        {progress.toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}

function CampaignSkeleton({ index = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.1
            }}
        >
            <Card className="overflow-hidden">
                <div className="animate-pulse">
                    <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-48 w-full" />
                    <CardContent className="p-4">
                        <div className="space-y-4">
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4" />
                            <div className="space-y-2">
                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full" />
                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-5/6" />
                            </div>
                            <div className="flex justify-between">
                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/4" />
                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/4" />
                            </div>
                            <div className="h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full" />
                            <div className="flex justify-between">
                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/3" />
                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/4" />
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </motion.div>
    );
}