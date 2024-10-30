'use client';
import DonationForm from "./DonationForm";

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Heart,
  Users,
  TrendingUp,
  Calendar,
  Search,
  Plus
} from 'lucide-react';

const HomePage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [topDonors, setTopDonors] = useState([]);
  const [stats, setStats] = useState({
    totalDonations: '0',
    activeCampaigns: 0,
    totalUsers: 0
  });

  // 数据加载状态
  const [isLoading, setIsLoading] = useState(true);

  // 获取数据的函数将在实际实现中添加
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部横幅 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Heart className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">总捐赠金额</p>
                    <h3 className="text-2xl font-bold">{stats.totalDonations} ETH</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">进行中的活动</p>
                    <h3 className="text-2xl font-bold">{stats.activeCampaigns}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">注册用户</p>
                    <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">发现项目</h1>
          <div className="flex space-x-4">
            <Button variant="outline" className="flex items-center">
              <Search className="h-4 w-4 mr-2" />
              搜索
            </Button>
            <Button className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              发起募捐
            </Button>
          </div>
        </div>

        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList>
            <TabsTrigger value="campaigns">募捐活动</TabsTrigger>
            <TabsTrigger value="personal">个人募捐</TabsTrigger>
            <TabsTrigger value="trending">排行榜</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))
              ) : campaigns.map((campaign, index) => (
                <CampaignCard key={index} campaign={campaign} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="personal" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 个人募捐者卡片将在这里显示 */}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  捐赠排行榜
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topDonors.map((donor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                        <img
                          src="/api/placeholder/40/40"
                          alt={donor.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{donor.name}</p>
                          <p className="text-sm text-gray-500">{donor.address.slice(0, 6)}...{donor.address.slice(-4)}</p>
                        </div>
                      </div>
                      <span className="font-bold">{donor.amount} ETH</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// 活动卡片子组件
const CampaignCard = ({ campaign }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <div className="aspect-video relative">
      <img
        src="/api/placeholder/400/225"
        alt={campaign?.title}
        className="w-full h-full object-cover"
      />
      {campaign?.deadline && (
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          剩余 {campaign.deadline} 天
        </div>
      )}
    </div>
    <CardContent className="p-4">
      <h3 className="font-semibold text-lg mb-2">{campaign?.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {campaign?.description}
      </p>
      <div className="space-y-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{
              width: `${(campaign?.amountCollected / campaign?.target) * 100}%`
            }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">已筹集 {campaign?.amountCollected} ETH</span>
          <span className="font-medium">
            {((campaign?.amountCollected / campaign?.target) * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default HomePage;