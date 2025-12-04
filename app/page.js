// app/page.jsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  TrendingUp,
  Target,
  Users,
  Calendar,
  ArrowRight,
  Search,
  Plus
} from 'lucide-react';


// lib/data/homePageData.js
export async function getHomePageData() {
  // Mock data - replace with actual API/contract calls
  return {
    stats: {
      totalRaised: "2150.5",
      activeCampaigns: 86,
      totalDonors: 3250,
      successRate: 92
    },
    featuredCampaigns: [
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
        }
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
        }
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
        }
      }
    ],
    recentDonations: [
      {
        donor: "0xabcd...efgh",
        amount: "15.5",
        campaign: "Turkey Earthquake Recovery Fund",
        timestamp: new Date(2024, 9, 28),
        message: "Stay strong! We're here to help rebuild."
      },
      {
        donor: "0xijkl...mnop",
        amount: "8.2",
        campaign: "Flood Recovery - Southeast Asia",
        timestamp: new Date(2024, 9, 28),
        message: "Supporting the recovery efforts!"
      },
      {
        donor: "0xqrst...uvwx",
        amount: "25.0",
        campaign: "School Reconstruction Project",
        timestamp: new Date(2024, 9, 27),
        message: "Education must continue despite disasters."
      },
      {
        donor: "0xyzab...cdef",
        amount: "12.8",
        campaign: "Hurricane Response Initiative",
        timestamp: new Date(2024, 9, 27),
        message: "For immediate relief efforts"
      }
    ],
    emergencyAlerts: [
      {
        id: 1,
        type: "Earthquake",
        location: "Central Turkey",
        severity: "High",
        timestamp: new Date(2024, 3, 15),
        status: "Active Response",
        fundingNeeded: "450",
        fundingReceived: "285.5"
      },
      {
        id: 2,
        type: "Flooding",
        location: "Mekong Delta",
        severity: "Moderate",
        timestamp: new Date(2024, 3, 10),
        status: "Early Recovery",
        fundingNeeded: "300",
        fundingReceived: "165.8"
      }
    ],
    impactMetrics: {
      totalPeopleHelped: 25000,
      communitiesSupported: 85,
      infrastructureProjects: 120,
      homesRebuilt: 450,
      disasterResponseTime: "24h",
      volunteerCount: 3500
    },
    resourceDistribution: {
      emergency: 35,
      reconstruction: 40,
      medical: 15,
      education: 10
    }
  };
}
export default function HomePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getHomePageData().then(setData);
  }, []);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Decentralized Fundraising Platform
            </motion.h1>
            <motion.p
              className="text-xl lg:text-2xl text-gray-600 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Support meaningful causes through transparent and secure blockchain donations
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/campaigns/create">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="gap-2 shadow-xl hover:shadow-2xl transition-shadow w-full sm:w-auto">
                    <Plus className="w-5 h-5" />
                    Start Campaign
                  </Button>
                </motion.div>
              </Link>
              <Link href="/campaigns">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="gap-2 border-2 hover:border-blue-400 w-full sm:w-auto">
                    <Search className="w-5 h-5" />
                    Browse Campaigns
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Raised</p>
                    <h3 className="text-2xl font-bold text-gray-900">{data.stats.totalRaised} ETH</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Active Campaigns</p>
                    <h3 className="text-2xl font-bold text-gray-900">{data.stats.activeCampaigns}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Donors</p>
                    <h3 className="text-2xl font-bold text-gray-900">{data.stats.totalDonors}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-yellow-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Success Rate</p>
                    <h3 className="text-2xl font-bold text-gray-900">{data.stats.successRate}%</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Data Visualization Section */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Impact & Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {data && <DataVisualization
              resourceDistribution={data.resourceDistribution}
              impactMetrics={data.impactMetrics}
              emergencyAlerts={data.emergencyAlerts}
            />}
          </CardContent>
        </Card>
      </div> */}

      {/* Featured Campaigns */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Campaigns
          </h2>
          <Link href="/campaigns">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="gap-2 border-2 hover:border-blue-400">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.featuredCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -8 }}
            >
              <Link href={`/campaigns/${campaign.id}`}>
                <Card className="overflow-hidden group cursor-pointer border border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-video relative overflow-hidden">
                    <motion.img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div
                      className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      {Math.ceil((campaign.deadline - new Date()) / (1000 * 60 * 60 * 24))} days left
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {campaign.description}
                    </p>
                    <div className="space-y-3">
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(parseFloat(campaign.amountCollected) / parseFloat(campaign.target)) * 100}%`
                          }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 font-medium">
                          Raised {campaign.amountCollected} ETH
                        </span>
                        <span className="font-bold text-blue-600">
                          {((parseFloat(campaign.amountCollected) / parseFloat(campaign.target)) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <CardTitle className="text-2xl">Recent Donations</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {data.recentDonations.map((donation, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between py-4 border-b last:border-b-0 hover:bg-gray-50 px-4 rounded-lg transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 border-2 border-blue-200">
                        <AvatarImage src="/api/placeholder/48/48" />
                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-600 text-white font-bold">
                          {donation.donor.slice(2, 4).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-gray-900">{donation.campaign}</div>
                        <div className="text-sm text-gray-500">
                          by {donation.donor}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-blue-600">{donation.amount} ETH</div>
                      <div className="text-sm text-gray-500">
                        {donation.timestamp.toLocaleDateString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}