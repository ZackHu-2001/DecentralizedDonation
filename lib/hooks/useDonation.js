
// hooks/useDonation.js
import { useState } from 'react';
import { ethers } from 'ethers';
import { useContract } from './useContract';
import { useWallet } from './useWallet';

export function useDonation() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { contract, getContractWithSigner } = useContract();
    const { account } = useWallet();

    const donate = async (campaignId, amount, message = '') => {
        try {
            setIsLoading(true);
            setError(null);

            if (!account) {
                throw new Error('Please connect your wallet');
            }

            const contractWithSigner = await getContractWithSigner();
            if (!contractWithSigner) {
                throw new Error('Contract not initialized');
            }

            const amountInWei = ethers.parseEther(amount.toString());
            const tx = await contractWithSigner.donateToCampaign(
                campaignId,
                message,
                { value: amountInWei }
            );

            const receipt = await tx.wait();
            return receipt;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const donateToPersonal = async (address, amount, message = '') => {
        try {
            setIsLoading(true);
            setError(null);

            if (!account) {
                throw new Error('Please connect your wallet');
            }

            const contractWithSigner = await getContractWithSigner();
            if (!contractWithSigner) {
                throw new Error('Contract not initialized');
            }

            const amountInWei = ethers.parseEther(amount.toString());
            const tx = await contractWithSigner.donateToPersonal(
                address,
                message,
                { value: amountInWei }
            );

            const receipt = await tx.wait();
            return receipt;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const getDonationHistory = async (campaignId) => {
        try {
            if (!contract) {
                throw new Error('Contract not initialized');
            }

            const donations = await contract.getDonations(campaignId);
            return donations.map(donation => ({
                donor: donation.donor,
                amount: ethers.utils.formatEther(donation.amount),
                message: donation.message,
                timestamp: new Date(donation.timestamp.toNumber() * 1000)
            }));
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const getPersonalDonations = async (address) => {
        try {
            if (!contract) {
                throw new Error('Contract not initialized');
            }

            const donations = await contract.getPersonalDonations(address);
            return donations.map(donation => ({
                donor: donation.donor,
                amount: ethers.utils.formatEther(donation.amount),
                message: donation.message,
                timestamp: new Date(donation.timestamp.toNumber() * 1000)
            }));
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    return {
        donate,
        donateToPersonal,
        getDonationHistory,
        getPersonalDonations,
        isLoading,
        error
    };
}