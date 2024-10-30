import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Target, Users } from 'lucide-react';
import Link from 'next/link';

export const CampaignCard = ({ campaign }) => {
    const daysLeft = Math.max(0, Math.ceil(
        (campaign.deadline - new Date()) / (1000 * 60 * 60 * 24)
    ));

    const progress = (parseFloat(campaign.amountCollected) / parseFloat(campaign.target)) * 100;

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
                <img
                    src="/api/placeholder/400/200"
                    alt={campaign.title}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-sm font-medium">
                    {daysLeft} 天剩余
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
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                            <Target className="w-4 h-4" />
                            <span>{campaign.target} ETH</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{daysLeft} 天</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${Math.min(100, progress)}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                                已筹集 {campaign.amountCollected} ETH
                            </span>
                            <span className="font-medium">
                                {progress.toFixed(1)}%
                            </span>
                        </div>
                    </div>

                    <Link href={`/campaigns/${campaign.id}`}>
                        <Button className="w-full">查看详情</Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};