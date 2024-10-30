// app/settings/page.jsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    User,
    Bell,
    Shield,
    Wallet,
    Globe,
    CheckCircle2,
    AlertCircle,
    Loader2
} from 'lucide-react';

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, success, error
    const [profileSettings, setProfileSettings] = useState({
        email: 'user@example.com',
        username: 'cryptouser',
        bio: 'Blockchain enthusiast and humanitarian supporter',
        language: 'en',
        timezone: 'UTC'
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        campaignUpdates: true,
        donationReceipts: true,
        newsletterSubscription: false
    });

    const [privacySettings, setPrivacySettings] = useState({
        publicProfile: true,
        showDonations: true,
        showCampaigns: true
    });

    const handleSave = async () => {
        setLoading(true);
        setStatus('idle');
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold mb-6">Settings</h1>

                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="profile" className="gap-2">
                            <User className="w-4 h-4" />
                            Profile
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="gap-2">
                            <Bell className="w-4 h-4" />
                            Notifications
                        </TabsTrigger>
                        <TabsTrigger value="privacy" className="gap-2">
                            <Shield className="w-4 h-4" />
                            Privacy
                        </TabsTrigger>
                        <TabsTrigger value="wallet" className="gap-2">
                            <Wallet className="w-4 h-4" />
                            Wallet
                        </TabsTrigger>
                    </TabsList>

                    {/* Profile Settings */}
                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        value={profileSettings.email}
                                        onChange={(e) => setProfileSettings({
                                            ...profileSettings,
                                            email: e.target.value
                                        })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        value={profileSettings.username}
                                        onChange={(e) => setProfileSettings({
                                            ...profileSettings,
                                            username: e.target.value
                                        })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Input
                                        id="bio"
                                        value={profileSettings.bio}
                                        onChange={(e) => setProfileSettings({
                                            ...profileSettings,
                                            bio: e.target.value
                                        })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="language">Language</Label>
                                    <select
                                        id="language"
                                        value={profileSettings.language}
                                        onChange={(e) => setProfileSettings({
                                            ...profileSettings,
                                            language: e.target.value
                                        })}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="fr">French</option>
                                        <option value="de">German</option>
                                    </select>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notification Settings */}
                    <TabsContent value="notifications">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Preferences</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Email Notifications</Label>
                                        <div className="text-sm text-gray-500">
                                            Receive email updates about your activity
                                        </div>
                                    </div>
                                    <Switch
                                        checked={notificationSettings.emailNotifications}
                                        onCheckedChange={(checked) => setNotificationSettings({
                                            ...notificationSettings,
                                            emailNotifications: checked
                                        })}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Campaign Updates</Label>
                                        <div className="text-sm text-gray-500">
                                            Get updates about campaigns you support
                                        </div>
                                    </div>
                                    <Switch
                                        checked={notificationSettings.campaignUpdates}
                                        onCheckedChange={(checked) => setNotificationSettings({
                                            ...notificationSettings,
                                            campaignUpdates: checked
                                        })}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Donation Receipts</Label>
                                        <div className="text-sm text-gray-500">
                                            Receive receipts for your donations
                                        </div>
                                    </div>
                                    <Switch
                                        checked={notificationSettings.donationReceipts}
                                        onCheckedChange={(checked) => setNotificationSettings({
                                            ...notificationSettings,
                                            donationReceipts: checked
                                        })}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Newsletter</Label>
                                        <div className="text-sm text-gray-500">
                                            Subscribe to our newsletter
                                        </div>
                                    </div>
                                    <Switch
                                        checked={notificationSettings.newsletterSubscription}
                                        onCheckedChange={(checked) => setNotificationSettings({
                                            ...notificationSettings,
                                            newsletterSubscription: checked
                                        })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Privacy Settings */}
                    <TabsContent value="privacy">
                        <Card>
                            <CardHeader>
                                <CardTitle>Privacy Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Public Profile</Label>
                                        <div className="text-sm text-gray-500">
                                            Make your profile visible to others
                                        </div>
                                    </div>
                                    <Switch
                                        checked={privacySettings.publicProfile}
                                        onCheckedChange={(checked) => setPrivacySettings({
                                            ...privacySettings,
                                            publicProfile: checked
                                        })}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Show Donations</Label>
                                        <div className="text-sm text-gray-500">
                                            Display your donation history publicly
                                        </div>
                                    </div>
                                    <Switch
                                        checked={privacySettings.showDonations}
                                        onCheckedChange={(checked) => setPrivacySettings({
                                            ...privacySettings,
                                            showDonations: checked
                                        })}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Show Campaigns</Label>
                                        <div className="text-sm text-gray-500">
                                            Display campaigns you&aposve created
                                        </div>
                                    </div>
                                    <Switch
                                        checked={privacySettings.showCampaigns}
                                        onCheckedChange={(checked) => setPrivacySettings({
                                            ...privacySettings,
                                            showCampaigns: checked
                                        })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Wallet Settings */}
                    <TabsContent value="wallet">
                        <Card>
                            <CardHeader>
                                <CardTitle>Wallet Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="font-medium">Connected Wallet</div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        0x1234...5678
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Default Network</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="ethereum">Ethereum Mainnet</option>
                                        <option value="polygon">Polygon</option>
                                        <option value="bsc">BSC</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Gas Price Preference</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="slow">Slow (Cheapest)</option>
                                        <option value="medium">Medium</option>
                                        <option value="fast">Fast</option>
                                    </select>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Save Button and Status */}
                <div className="mt-6 space-y-4">
                    <Button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Saving Changes...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>

                    {status === 'success' && (
                        <Alert className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertDescription>
                                Settings saved successfully
                            </AlertDescription>
                        </Alert>
                    )}

                    {status === 'error' && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                Failed to save settings. Please try again.
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
}