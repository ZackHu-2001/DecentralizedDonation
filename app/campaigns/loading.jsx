import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CampaignsLoading() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-6">
                    {/* 页面标题和搜索栏骨架屏 */}
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-10 w-64" />
                    </div>

                    {/* 主要内容区域 */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* 左侧筛选器骨架屏 */}
                        <div className="w-full lg:w-64 flex-shrink-0">
                            <Card className="p-4">
                                <div className="space-y-6">
                                    {/* 筛选器标题 */}
                                    <Skeleton className="h-6 w-20" />

                                    {/* 筛选选项 */}
                                    <div className="space-y-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <Skeleton className="h-4 w-4 rounded-full" />
                                                <Skeleton className="h-4 w-24" />
                                            </div>
                                        ))}
                                    </div>

                                    {/* 金额范围 */}
                                    <div className="space-y-3">
                                        <Skeleton className="h-6 w-24" />
                                        <Skeleton className="h-4 w-full" />
                                        <div className="flex justify-between">
                                            <Skeleton className="h-4 w-12" />
                                            <Skeleton className="h-4 w-12" />
                                        </div>
                                    </div>

                                    {/* 按钮 */}
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </Card>
                        </div>

                        {/* 右侧活动列表骨架屏 */}
                        <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <CampaignCardSkeleton key={i} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 活动卡片骨架屏组件
const CampaignCardSkeleton = () => {
    return (
        <Card className="overflow-hidden">
            {/* 图片占位 */}
            <Skeleton className="w-full h-48" />

            {/* 内容区域 */}
            <div className="p-4 space-y-4">
                {/* 标题 */}
                <Skeleton className="h-6 w-3/4" />

                {/* 描述 */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>

                {/* 数据展示 */}
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-20" />
                    </div>

                    {/* 进度条 */}
                    <Skeleton className="h-2 w-full rounded-full" />

                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                </div>

                {/* 按钮 */}
                <Skeleton className="h-10 w-full" />
            </div>
        </Card>
    );
};