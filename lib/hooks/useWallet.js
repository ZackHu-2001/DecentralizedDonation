// hooks/useWallet.js
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export function useWallet() {
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState('0');
    const [chainId, setChainId] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(null);

    const connectWallet = async () => {
        try {
            setIsConnecting(true);
            setError(null);

            if (!window.ethereum) {
                throw new Error('Please install MetaMask');
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const balance = await provider.getBalance(address);
            const network = await provider.getNetwork();

            setAccount(address);
            setBalance(ethers.utils.formatEther(balance));
            setChainId(network.chainId);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnectWallet = () => {
        setAccount('');
        setBalance('0');
        setChainId(null);
    };

    // Listen for account changes
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                } else {
                    disconnectWallet();
                }
            });

            window.ethereum.on('chainChanged', (chainId) => {
                window.location.reload();
            });
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', () => { });
                window.ethereum.removeListener('chainChanged', () => { });
            }
        };
    }, []);

    return {
        account,
        balance,
        chainId,
        isConnecting,
        error,
        connectWallet,
        disconnectWallet
    };
}