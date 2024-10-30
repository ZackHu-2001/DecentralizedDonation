'use client';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Edit2, User, DollarSign } from 'lucide-react';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/constants';

const PersonalProfile = () => {
    const [address, setAddress] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState({
        name: '',
        description: '',
        image: '',
        acceptingDonations: true
    });

    // 连接钱包
    const connectWallet = async () => {
        try {
            if (typeof window.ethereum === 'undefined') {
                alert('Please install MetaMask or another Ethereum-compatible wallet.');
                return;
            }
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setAddress(address);
                return { provider, signer };
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    };

    // 获取个人档案
    const fetchProfile = async () => {
        try {
            const { provider } = await connectWallet();
            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                CONTRACT_ABI,
                provider
            );

            const profileData = await contract.getPersonalProfile(address);
            setProfile({
                name: profileData[0],
                description: profileData[1],
                image: profileData[2],
                isVerified: profileData[3],
                acceptingDonations: profileData[4],
                totalReceived: profileData[5]
            });
            setProfileData({
                name: profileData[0],
                description: profileData[1],
                image: profileData[2],
                acceptingDonations: profileData[4]
            });
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setIsLoading(false);
        }
    };

    // 更新个人档案
    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            const { signer } = await connectWallet();
            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                CONTRACT_ABI,
                signer
            );

            const tx = await contract.updateProfile(
                profileData.name,
                profileData.description,
                profileData.image,
                profileData.acceptingDonations
            );
            await tx.wait();

            setIsEditing(false);
            fetchProfile();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            console.log('Ethereum detected');
            connectWallet().then(() => fetchProfile());
        }
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-bold">个人档案</CardTitle>
                    {!isEditing && (
                        <Button
                            variant="outline"
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2"
                        >
                            <Edit2 className="h-4 w-4" />
                            编辑资料
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                    {isEditing ? (
                        <form onSubmit={updateProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">姓名</label>
                                <Input
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    placeholder="输入你的名字"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">简介</label>
                                <Textarea
                                    value={profileData.description}
                                    onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                                    placeholder="介绍一下你自己"
                                    rows={4}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">头像链接</label>
                                <Input
                                    value={profileData.image}
                                    onChange={(e) => setProfileData({ ...profileData, image: e.target.value })}
                                    placeholder="输入头像图片链接"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    checked={profileData.acceptingDonations}
                                    onCheckedChange={(checked) =>
                                        setProfileData({ ...profileData, acceptingDonations: checked })
                                    }
                                />
                                <label>接受捐赠</label>
                            </div>
                            <div className="flex space-x-4">
                                <Button type="submit">保存</Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsEditing(false)}
                                >
                                    取消
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                {profile?.image ? (
                                    <img
                                        src="/api/placeholder/96/96"
                                        alt={profile?.name}
                                        className="w-24 h-24 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                                        <User className="w-12 h-12 text-gray-400" />
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-xl font-semibold">{profile?.name}</h3>
                                    <p className="text-gray-500">{address}</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">简介</h4>
                                <p className="text-gray-700">{profile?.description}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <DollarSign className="w-5 h-5" />
                                    <span>总收到捐赠：</span>
                                    <span className="font-semibold">
                                        {profile?.totalReceived
                                            ? ethers.utils.formatEther(profile.totalReceived)
                                            : '0'
                                        } ETH
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span>接受捐赠：</span>
                                    <Switch
                                        checked={profile?.acceptingDonations}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default PersonalProfile;