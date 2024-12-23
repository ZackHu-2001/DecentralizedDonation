// components/dialogs/wallet-error-dialog.jsx
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export function WalletErrorDialog({ open, onOpenChange }) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Wallet Connection Required</AlertDialogTitle>
                    <AlertDialogDescription className="space-y-4">
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>MetaMask Not Found</AlertTitle>
                            <AlertDescription>
                                You need to install MetaMask to use this feature.
                            </AlertDescription>
                        </Alert>
                        <p>
                            MetaMask is a crypto wallet & gateway to blockchain apps. You can:
                        </p>
                        <ul className="list-disc pl-4 space-y-2">
                            <li>Connect to our platform</li>
                            <li>Make secure transactions</li>
                            <li>Manage your digital assets</li>
                        </ul>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="space-x-2">
                    <AlertDialogAction asChild>
                        <Button
                            variant="default"
                            onClick={() => window.open('https://metamask.io/download/', '_blank')}
                        >
                            Install MetaMask
                        </Button>
                    </AlertDialogAction>
                    <AlertDialogAction asChild>
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

// Updated useWallet hook
export function useWallet() {
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

    const connectWallet = async () => {
        if (!window.ethereum) {
            setIsWalletModalOpen(true);
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            // Continue with wallet connection...
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        }
    };

    return {
        connectWallet,
        isWalletModalOpen,
        setIsWalletModalOpen
    };
}

// Usage example in a component
function ConnectWalletButton() {
    const { connectWallet, isWalletModalOpen, setIsWalletModalOpen } = useWallet();

    return (
        <>
            <Button onClick={connectWallet} className="gap-2">
                {/* <Wallet className="w-4 h-4" /> */}
                Connect Wallet
            </Button>

            <WalletErrorDialog
                open={isWalletModalOpen}
                onOpenChange={setIsWalletModalOpen}
            />
        </>
    );
}