// components/layout/footer.jsx
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-white border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">DonateChain</h3>
                        <p className="text-sm text-gray-500">
                            A decentralized donation platform powered by blockchain technology.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/campaigns" className="text-gray-500 hover:text-gray-900">
                                    Browse Campaigns
                                </Link>
                            </li>
                            <li>
                                <Link href="/campaigns/create" className="text-gray-500 hover:text-gray-900">
                                    Start a Campaign
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" className="text-gray-500 hover:text-gray-900">
                                    My Profile
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-gray-500 hover:text-gray-900">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-500 hover:text-gray-900">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-500 hover:text-gray-900">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="text-gray-500">
                                support@donatechain.com
                            </li>
                            <li className="text-gray-500">
                                Join our community
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} DonateChain. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}