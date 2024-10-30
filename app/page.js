// app/page.jsx
import React from 'react';
import Link from 'next/link';
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
export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Decentralized Fundraising Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Support meaningful causes through transparent and secure blockchain donations
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/campaigns/create">
                <Button size="lg" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Start Campaign
                </Button>
              </Link>
              <Link href="/campaigns">
                <Button variant="outline" size="lg" className="gap-2">
                  <Search className="w-4 h-4" />
                  Browse Campaigns
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Raised</p>
                  <h3 className="text-2xl font-bold">{data.stats.totalRaised} ETH</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Campaigns</p>
                  <h3 className="text-2xl font-bold">{data.stats.activeCampaigns}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Donors</p>
                  <h3 className="text-2xl font-bold">{data.stats.totalDonors}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Success Rate</p>
                  <h3 className="text-2xl font-bold">{data.stats.successRate}%</h3>
                </div>
              </div>
            </CardContent>
          </Card>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Campaigns</h2>
          <Link href="/campaigns">
            <Button variant="outline" className="gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {data.featuredCampaigns.map((campaign) => (
            <Link href={`/campaigns/${campaign.id}`} key={campaign.id}>
              <Card className="hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {Math.ceil((campaign.deadline - new Date()) / (1000 * 60 * 60 * 24))} days left
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {campaign.description}
                  </p>
                  <div className="space-y-2">
                    <Progress
                      value={(parseFloat(campaign.amountCollected) / parseFloat(campaign.target)) * 100}
                      className="h-2"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Raised {campaign.amountCollected} ETH
                      </span>
                      <span className="font-medium">
                        {((parseFloat(campaign.amountCollected) / parseFloat(campaign.target)) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentDonations.map((donation, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/api/placeholder/32/32" />
                      <AvatarFallback>
                        {donation.donor.slice(2, 4)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{donation.campaign}</div>
                      <div className="text-sm text-gray-500">
                        by {donation.donor}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{donation.amount} ETH</div>
                    <div className="text-sm text-gray-500">
                      {donation.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}