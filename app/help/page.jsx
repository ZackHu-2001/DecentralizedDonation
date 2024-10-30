// app/help/page.jsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Search,
    Book,
    HelpCircle,
    MessageCircle,
    Mail,
    ArrowRight,
    FileText,
    Headphones
} from 'lucide-react';

export default function HelpCenter() {
    const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        {
            question: "How do I create a campaign?",
            answer: "To create a campaign, click the 'Create Campaign' button in the navigation bar. Fill in the required details including campaign title, description, target amount, and deadline. Make sure to provide clear information about your cause and how the funds will be used."
        },
        {
            question: "How are funds distributed?",
            answer: "Funds are distributed automatically through smart contracts directly to campaign creators once a donation is made. The process is transparent and traceable on the blockchain. Campaign creators can withdraw funds as they are received."
        },
        {
            question: "What are the platform fees?",
            answer: "Our platform charges a minimal 2% fee on successful donations to cover operational costs and maintain the platform. All gas fees are paid by the donors at the time of donation."
        },
        {
            question: "How can I withdraw my funds?",
            answer: "Funds can be withdrawn directly to your connected wallet address. Navigate to your campaign dashboard and click the 'Withdraw' button. Make sure your wallet is connected and has enough balance for gas fees."
        },
        {
            question: "Is my donation tax-deductible?",
            answer: "Tax deductibility depends on your jurisdiction and the status of the campaign organizer. We provide donation receipts that you can use for tax purposes, but please consult with a tax professional for specific advice."
        }
    ];

    const guides = [
        {
            title: "Getting Started Guide",
            description: "Learn the basics of using our platform",
            icon: Book
        },
        {
            title: "Campaign Creation Guide",
            description: "Step-by-step guide to creating successful campaigns",
            icon: FileText
        },
        {
            title: "Wallet Setup Guide",
            description: "How to set up and connect your crypto wallet",
            icon: Headphones
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold mb-4">How can we help you?</h1>
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search for help..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <Book className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Documentation</h3>
                                    <p className="text-sm text-gray-500">
                                        Browse detailed guides
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <MessageCircle className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Community Support</h3>
                                    <p className="text-sm text-gray-500">
                                        Join our community forum
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <Mail className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Contact Support</h3>
                                    <p className="text-sm text-gray-500">
                                        Get direct assistance
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Popular Guides */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Popular Guides</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {guides.map((guide, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <guide.icon className="h-8 w-8 text-blue-600 mb-4" />
                                    <h3 className="font-semibold mb-2">{guide.title}</h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        {guide.description}
                                    </p>
                                    <Button variant="outline" className="w-full">
                                        Read More
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                    <Card>
                        <CardContent className="p-6">
                            <Accordion type="single" collapsible>
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="text-left">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Support */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
                    <p className="text-gray-600 mb-6">
                        Our support team is always ready to assist you
                    </p>
                    <Button className="gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Contact Support
                    </Button>
                </div>
            </div>
        </div>
    );
}