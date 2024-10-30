'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DollarSign, Send, Loader2 } from 'lucide-react';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/constants';

const DonationForm = ({ recipientAddress, recipientName }) => {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [error, setError] = useState('');

    const handleDonate = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setError('');

        try {
            if (!window.ethereum) {
                throw new Error('请先安装MetaMask钱包');
            }

            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // await provider.send("eth_requestAccounts", []);
            // const signer = provider.getSigner();

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // 创建合约实例
            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                CONTRACT_ABI,
                signer
            );

            // 转换ETH金额为Wei
            const amountInWei = ethers.parseEther(amount);

            // 发送捐赠交易
            const tx = await contract.donateToPersonal(
                recipientAddress,
                message,
                { value: amountInWei }
            );

            // 等待交易确认
            await tx.wait();
            setStatus('success');

            // 重置表单
            setAmount('');
            setMessage('');

            // 3秒后重置状态
            setTimeout(() => setStatus('idle'), 3000);

        } catch (err) {
            setStatus('error');
            setError(err.message);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    向 {recipientName} 捐赠
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleDonate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            捐赠金额 (ETH)
                        </label>
                        <div className="relative">
                            <Input
                                type="number"
                                step="0.001"
                                min="0"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.01"
                                className="pl-8"
                                required
                            />
                            <span className="absolute left-3 top-2.5 text-gray-500">Ξ</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            留言（可选）
                        </label>
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="写下你想说的话..."
                            rows={3}
                            className="resize-none"
                        />
                    </div>

                    {status === 'error' && (
                        <Alert variant="destructive">
                            <AlertDescription>
                                {error || '捐赠失败，请重试'}
                            </AlertDescription>
                        </Alert>
                    )}

                    {status === 'success' && (
                        <Alert className="bg-green-50 text-green-700 border-green-200">
                            <AlertDescription>
                                捐赠成功！感谢你的支持
                            </AlertDescription>
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={status === 'loading' || !amount}
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                处理中...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" />
                                确认捐赠
                            </>
                        )}
                    </Button>

                    <div className="text-sm text-gray-500 text-center">
                        当前 Gas 费用由捐赠者承担
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default DonationForm;