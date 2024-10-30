import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CampaignDetailLoading() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Campaign Image Skeleton */}
                        <Skeleton className="w-full h-[400px] rounded-lg" />

                        {/* Campaign Info Card */}
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-8 w-2/3" />
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Creator Info */}
                                <div className="flex items-center space-x-4">
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>

                                {/* Campaign Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="p-4 bg-gray-50 rounded-lg">
                                            <Skeleton className="h-4 w-16 mb-2" />
                                            <Skeleton className="h-6 w-20" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Donation History */}
                        <Card>
                            <CardContent className="p-6">
                                {/* Tabs */}
                                <div className="border-b mb-4">
                                    <div className="flex space-x-4">
                                        <Skeleton className="h-8 w-20" />
                                        <Skeleton className="h-8 w-20" />
                                    </div>
                                </div>

                                {/* Donation List */}
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-start justify-between border-b pb-4">
                                            <div className="flex items-center space-x-4">
                                                <Skeleton className="h-10 w-10 rounded-full" />
                                                <div className="space-y-2">
                                                    <Skeleton className="h-4 w-32" />
                                                    <Skeleton className="h-4 w-24" />
                                                </div>
                                            </div>
                                            <Skeleton className="h-6 w-20" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Donation Form */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-4">
                            <CardContent className="p-6 space-y-6">
                                {/* Progress Bar */}
                                <div className="space-y-2">
                                    <Skeleton className="h-2 w-full rounded-full" />
                                    <div className="flex justify-between">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                </div>

                                {/* Donation Form Fields */}
                                <div className="space-y-4">
                                    <Skeleton className="h-10 w-full" />
                                    <div className="grid grid-cols-4 gap-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <Skeleton key={i} className="h-9 w-full" />
                                        ))}
                                    </div>
                                    <Skeleton className="h-24 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                </div>

                                {/* Share Button */}
                                <Skeleton className="h-9 w-full" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
