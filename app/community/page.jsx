// app/community/page.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Construction,
    Bell,
    Clock,
    ArrowRight,
    Github
} from 'lucide-react';

export default function CommunityPage() {
    const upcomingFeatures = [
        {
            title: "Discussion Forums",
            description: "Connect with other donors and campaign creators"
        },
        {
            title: "Event Calendar",
            description: "Stay updated with community events and milestones"
        },
        {
            title: "Resource Sharing",
            description: "Share and access community resources"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <Construction className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                    <Badge variant="secondary" className="mb-4">
                        Coming Soon
                    </Badge>
                    <h1 className="text-3xl font-bold mb-4">
                        Our Community Page is Under Construction
                    </h1>
                    <p className="text-gray-600 text-lg mb-8">
                        We're working hard to build an amazing community platform for our users.
                        Stay tuned for updates!
                    </p>
                </div>

                {/* Progress Card */}
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <Clock className="h-5 w-5 text-blue-500" />
                            <div>
                                <h3 className="font-medium">Estimated Launch</h3>
                                <p className="text-sm text-gray-500">Q2 2024</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-semibold">Upcoming Features</h3>
                            <div className="grid gap-4">
                                {upcomingFeatures.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-lg border bg-white"
                                    >
                                        <h4 className="font-medium mb-1">
                                            {feature.title}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {feature.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Notification Sign-up */}
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="text-center">
                            <Bell className="h-8 w-8 mx-auto text-blue-500 mb-4" />
                            <h3 className="font-semibold mb-2">
                                Get Notified When We Launch
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Be the first to know when our community features go live
                            </p>
                            <Button className="gap-2">
                                Subscribe to Updates
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Alternative Actions */}
                <div className="text-center">
                    <h3 className="font-semibold mb-4">In the meantime...</h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="outline" className="gap-2">
                            <Github className="w-4 h-4" />
                            Follow Development
                        </Button>
                        <Button variant="outline" className="gap-2">
                            Explore Campaigns
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}