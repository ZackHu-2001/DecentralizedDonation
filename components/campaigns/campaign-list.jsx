'use client';
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Target } from 'lucide-react';
import Link from 'next/link';

export const CampaignList = ({ searchParams }) => {
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 加载状态的骨架屏组件
    const CampaignSkeleton = () => (
        <Card className="overflow-hidden">
            <div className="animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-4 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded" />
                        <div className="flex justify-between">
                            <div className="h-4 bg-gray-200 rounded w-1/4" />
                            <div className="h-4 bg-gray-200 rounded w-1/4" />
                        </div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded" />
                </div>
            </div>
        </Card>
    );

    useEffect(() => {
        // 模拟数据加载
        const fetchCampaigns = async () => {
            try {
                setIsLoading(true);
                // 这里应该是实际的合约调用
                const mockData = [
                    {
                        id: 1,
                        title: '示例募捐活动 1',
                        description: '这是一个示例募捐活动的描述...',
                        target: '10.0',
                        deadline: new Date(2024, 11, 31),
                        amountCollected: '5.5',
                        image: '/placeholder.jpg'
                    },
                    {
                        id: 2,
                        title: '示例募捐活动 2',
                        description: '另一个示例募捐活动的描述...',
                        target: '20.0',
                        deadline: new Date(2024, 12, 15),
                        amountCollected: '15.2',
                        image: '/placeholder.jpg'
                    }
                ];

                setTimeout(() => {
                    setCampaigns(mockData);
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error loading campaigns:', error);
                setIsLoading(false);
            }
        };

        fetchCampaigns();
    }, [searchParams]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <CampaignSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
                <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                        <img
                            src="/api/placeholder/400/200"
                            alt={campaign.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-sm font-medium">
                            {Math.ceil((campaign.deadline - new Date()) / (1000 * 60 * 60 * 24))} 天剩余
                        </div>
                    </div>

                    <div className="p-4 space-y-4">
                        <h3 className="font-semibold text-lg line-clamp-1">{campaign.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{campaign.description}</p>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Target className="w-4 h-4" />
                                    <span>{campaign.target} ETH</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{Math.ceil((campaign.deadline - new Date()) / (1000 * 60 * 60 * 24))} 天</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full"
                                        style={{
                                            width: `${Math.min(100, (parseFloat(campaign.amountCollected) / parseFloat(campaign.target)) * 100)}%`
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">已筹集 {campaign.amountCollected} ETH</span>
                                    <span className="font-medium">
                                        {((parseFloat(campaign.amountCollected) / parseFloat(campaign.target)) * 100).toFixed(1)}%
                                    </span>
                                </div>
                            </div>

                            <Link href={`/campaigns/${campaign.id}`}>
                                <Button className="w-full">查看详情</Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};
