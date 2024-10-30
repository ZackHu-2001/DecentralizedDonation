// hooks/useContract.js
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export function useContract() {
    const [contract, setContract] = useState(null);
    const [address, setAddress] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const initContract = async (address, abi) => {
        try {
            if (!window.ethereum) {
                alert('Please install MetaMask or another Ethereum-compatible wallet.');
                return;
                // throw new Error('Please install MetaMask');
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // await provider.send('eth_requestAccounts', []);
            // const signer = provider.getSigner();
            const contractInstance = new ethers.Contract(address, abi, signer);

            setContract(contractInstance);
            setError(null);
            return contractInstance;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const getContractWithSigner = async () => {
        if (!contract) return null;

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        return contract.connect(signer);
    };

    return {
        contract,
        error,
        isLoading,
        initContract,
        getContractWithSigner
    };
}
