import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';

export const CampaignFilters = () => {
    return (
        <Card className="sticky top-4">
            <CardContent className="p-4 space-y-6">
                {/* 活动状态筛选 */}
                <div className="space-y-4">
                    <h3 className="font-medium">活动状态</h3>
                    <RadioGroup defaultValue="all" className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="all" />
                            <Label htmlFor="all">全部活动</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="active" id="active" />
                            <Label htmlFor="active">进行中</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="completed" id="completed" />
                            <Label htmlFor="completed">已完成</Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* 金额范围筛选 */}
                <div className="space-y-4">
                    <h3 className="font-medium">目标金额</h3>
                    <Slider
                        defaultValue={[0]}
                        max={100}
                        step={1}
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>0 ETH</span>
                        <span>100 ETH</span>
                    </div>
                </div>

                {/* 排序方式 */}
                <div className="space-y-4">
                    <h3 className="font-medium">排序方式</h3>
                    <RadioGroup defaultValue="latest" className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="latest" id="latest" />
                            <Label htmlFor="latest">最新创建</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="popular" id="popular" />
                            <Label htmlFor="popular">最受欢迎</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="endingSoon" id="endingSoon" />
                            <Label htmlFor="endingSoon">即将结束</Label>
                        </div>
                    </RadioGroup>
                </div>

                <Button className="w-full">应用筛选</Button>
            </CardContent>
        </Card>
    );
};