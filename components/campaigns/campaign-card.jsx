'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Target, Users } from 'lucide-react';
import Link from 'next/link';

export const CampaignCard = ({ campaign, index = 0 }) => {
    const daysLeft = Math.max(0, Math.ceil(
        (campaign.deadline - new Date()) / (1000 * 60 * 60 * 24)
    ));

    const progress = (parseFloat(campaign.amountCollected) / parseFloat(campaign.target)) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
            <Link href={`/campaigns/${campaign.id}`}>
                <Card className="overflow-hidden group cursor-pointer border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                    <div className="relative overflow-hidden">
                        <motion.img
                            src="/api/placeholder/400/200"
                            alt={campaign.title}
                            className="w-full h-48 object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.div
                            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow-lg"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                        >
                            {daysLeft} 天剩余
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
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
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(100, progress)}%` }}
                                        transition={{
                                            duration: 1,
                                            delay: 0.3 + index * 0.1,
                                            ease: "easeOut"
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        已筹集 {campaign.amountCollected} ETH
                                    </span>
                                    <span className="font-medium text-blue-600">
                                        {progress.toFixed(1)}%
                                    </span>
                                </div>
                            </div>

                            <Button className="w-full group-hover:bg-blue-600 transition-colors duration-200">
                                查看详情
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
};