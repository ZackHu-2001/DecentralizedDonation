'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Target } from 'lucide-react';
import Link from 'next/link';

export const CampaignCard = ({ campaign }) => {
    const daysLeft = Math.max(0, Math.ceil(
        (campaign.deadline - new Date()) / (1000 * 60 * 60 * 24)
    ));

    const progress = (parseFloat(campaign.amountCollected) / parseFloat(campaign.target)) * 100;

    return (
        <Link href={`/campaigns/${campaign.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                    <img
                        src="/api/placeholder/400/200"
                        alt={campaign.title}
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {daysLeft} days left
                    </div>
                </div>

                <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                        {campaign.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {campaign.description}
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <Target className="w-4 h-4" />
                                <span>{campaign.target} ETH</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{daysLeft} days</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Progress value={progress} className="h-2" />
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
    );
};