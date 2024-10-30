
# DonateChain - Decentralized Fundraising Platform

DonateChain is a blockchain-based fundraising platform focused on disaster relief and environmental causes. The platform enables transparent, efficient, and impactful fundraising through smart contracts.

## Live Demo

Visit our platform: [DonateChain](https://decentralized-donation-40nutaz25-zackhu-2001s-projects.vercel.app/)

## Team - EcoVanguard
- **Carrier**: Project Lead & Smart Contract Development
- **Lucy**: Frontend Development
- **DM**: UX/UI Design
- **Zack**: Backend Integration

## 🌟 Features

### Core Functionality
- **Smart Contract-Based Donations**: Secure and transparent fund transfers
- **Campaign Management**: Create, manage, and track fundraising campaigns
- **Direct Donations**: Support individuals and organizations directly
- **Progress Tracking**: Real-time updates on campaign goals and impact

### User Experience
- **Intuitive Interface**: Modern, responsive design using Next.js and Tailwind CSS
- **Wallet Integration**: Seamless connection with MetaMask and other Web3 wallets
- **Real-Time Updates**: Live tracking of donations and campaign progress
- **Mobile-First Design**: Fully responsive across all devices

### Analytics & Reporting
- **Campaign Analytics**: Detailed insights into campaign performance
- **Impact Metrics**: Track and visualize social impact
- **Donation History**: Comprehensive record of all transactions
- **Rankings System**: Recognition for top donors and successful campaigns

## 🛠️ Technology Stack

- **Frontend**: Next.js 13, React, TailwindCSS
- **Blockchain**: Ethereum, Solidity
- **Web3 Integration**: ethers.js
- **UI Components**: shadcn/ui
- **Data Visualization**: Recharts




## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- MetaMask or similar Web3 wallet

### Installation
```bash
# Clone the repository
git clone https://github.com/ZackHu-2001/DecentralizedDonation

# Install dependencies
cd decentralizeddonation
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Smart Contract Deployment (under testing)
```bash
# Deploy contracts
npx hardhat run scripts/deploy.js --network sepolia

# Update contract addresses
Update lib/contracts/addresses.js with new contract addresses
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Future Roadmap

### Phase 1 
- Error fixing and feature adding
- Multi-chain support
- Advanced analytics dashboard
- Social features integration

### Phase 2 
- Mobile app development
- DAO governance implementation
- Impact verification system

# Apendix

### Project Structure
```
📦 decentralized-fundraising
├── app/
│   ├── layout.jsx                # Root layout
│   ├── page.jsx                  # Home page
│   ├── providers.jsx             # Global providers
│   ├── loading.jsx               # Global loading state
│   ├── error.jsx                 # Global error handling
│   │
│   ├── campaigns/
│   │   ├── page.jsx              # Campaign list page
│   │   ├── loading.jsx           # Campaign list loading state
│   │   ├── [id]/
│   │   │   ├── page.jsx          # Campaign details page
│   │   │   └── loading.jsx       # Details page loading state
│   │   └── create/
│   │       └── page.jsx          # Create campaign page
│   │
│   ├── profile/
│   │   ├── page.jsx              # User profile page
│   │   ├── edit/
│   │   │   └── page.jsx          # Edit profile page
│   │   └── [address]/
│   │       └── page.jsx          # View other user profiles
│   │
│   ├── donate/
│   │   └── [address]/
│   │       └── page.jsx          # Donation page
│   │
│   ├── search/
│   │   └── page.jsx              # Search results page
│   │
│   ├── rankings/
│   │   └── page.jsx              # Rankings page
│   │
│   ├── wallet/
│   │   └── page.jsx              # Wallet page
│   │
│   ├── settings/
│   │   └── page.jsx              # Settings page
│   │
│   ├── notifications/
│   │   └── page.jsx              # Notifications page
│   │
│   └── help/
│       └── page.jsx              # Help center
│
├── components/
│   ├── ui/                       # UI base components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   └── ...
│   │
│   ├── layout/                   # Layout components
│   │   ├── navbar.jsx
│   │   ├── footer.jsx
│   │   └── sidebar.jsx
│   │
│   ├── campaigns/                # Campaign-related components
│   │   ├── campaign-card.jsx
│   │   ├── campaign-form.jsx
│   │   ├── campaign-list.jsx
│   │   └── donation-form.jsx
│   │
│   ├── profile/                  # Profile-related components
│   │   ├── profile-card.jsx
│   │   ├── donation-history.jsx
│   │   └── profile-form.jsx
│   │
│   └── shared/                   # Shared components
│       ├── search-bar.jsx
│       ├── loading-spinner.jsx
│       └── error-message.jsx
│
├── lib/
│   ├── contracts/                # Smart contract related
│   │   ├── abi.js
│   │   └── addresses.js
│   │
│   ├── hooks/                    # Custom hooks
│   │   ├── useContract.js
│   │   ├── useWallet.js
│   │   └── useDonation.js
│   │
│   └── utils/                    # Utility functions
│       ├── ethereum.js
│       ├── format.js
│       └── validation.js
│
├── types/                        # Type definitions
│   ├── campaign.js
│   ├── donation.js
│   └── user.js
│
├── styles/                       # Style files
│   └── globals.css
│
├── public/                       # Static assets
│   ├── images/
│   └── icons/
│
├── .env                          # Environment variables
├── .env.local
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind configuration
└── package.json
```

### Smart Contract
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnhancedDonationPlatform {
    struct Campaign {
        address payable owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donors;
        uint256[] donations;
        bool isActive;
    }

    struct PersonalProfile {
        string name;
        string description;
        string image;
        bool isVerified;
        bool acceptingDonations;
        uint256 totalReceived;
        address[] donors;
        uint256[] donations;
        string[] messages; 
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(address => PersonalProfile) public personalProfiles;
    mapping(address => bool) public hasProfile;
    
    uint256 public numberOfCampaigns = 0;
    
    event ProfileCreated(address indexed user, string name);
    event PersonalDonationReceived(
        address indexed recipient,
        address indexed donor,
        uint256 amount,
        string message
    );
    event CampaignCreated(
        uint256 indexed id,
        address indexed owner,
        string title,
        uint256 target
    );
    event DonationMade(
        uint256 indexed campaignId,
        address indexed donor,
        uint256 amount
    );

    function createPersonalProfile(
        string memory _name,
        string memory _description,
        string memory _image
    ) public {
        require(!hasProfile[msg.sender], "Profile already exists");
        
        PersonalProfile storage profile = personalProfiles[msg.sender];
        profile.name = _name;
        profile.description = _description;
        profile.image = _image;
        profile.acceptingDonations = true;
        profile.totalReceived = 0;
        
        hasProfile[msg.sender] = true;
        
        emit ProfileCreated(msg.sender, _name);
    }

    function updateProfile(
        string memory _name,
        string memory _description,
        string memory _image,
        bool _acceptingDonations
    ) public {
        require(hasProfile[msg.sender], "Profile does not exist");
        
        PersonalProfile storage profile = personalProfiles[msg.sender];
        profile.name = _name;
        profile.description = _description;
        profile.image = _image;
        profile.acceptingDonations = _acceptingDonations;
    }

    function donateToPersonal(address payable _to, string memory _message) public payable {
        require(hasProfile[_to], "Recipient does not have a profile");
        require(personalProfiles[_to].acceptingDonations, "Recipient is not accepting donations");
        
        PersonalProfile storage profile = personalProfiles[_to];
        
        profile.donors.push(msg.sender);
        profile.donations.push(msg.value);
        profile.messages.push(_message);
        profile.totalReceived += msg.value;
        
        (bool sent,) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        
        emit PersonalDonationReceived(_to, msg.sender, msg.value, _message);
    }

    function getPersonalProfile(address _person) public view returns (
        string memory name,
        string memory description,
        string memory image,
        bool isVerified,
        bool acceptingDonations,
        uint256 totalReceived
    ) {
        require(hasProfile[_person], "Profile does not exist");
        PersonalProfile storage profile = personalProfiles[_person];
        
        return (
            profile.name,
            profile.description,
            profile.image,
            profile.isVerified,
            profile.acceptingDonations,
            profile.totalReceived
        );
    }

    function getPersonalDonationHistory(address _person) public view returns (
        address[] memory donors,
        uint256[] memory amounts,
        string[] memory messages
    ) {
        require(hasProfile[_person], "Profile does not exist");
        PersonalProfile storage profile = personalProfiles[_person];
        
        return (profile.donors, profile.donations, profile.messages);
    }

    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(_deadline > block.timestamp, "Deadline should be in the future");

        campaign.owner = payable(msg.sender);
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.isActive = true;

        emit CampaignCreated(numberOfCampaigns, msg.sender, _title, _target);
        
        numberOfCampaigns++;
        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];
        
        require(campaign.isActive, "Campaign is not active");
        require(block.timestamp < campaign.deadline, "Campaign deadline has passed");
        
        campaign.donors.push(msg.sender);
        campaign.donations.push(msg.value);
        
        (bool sent,) = campaign.owner.call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        campaign.amountCollected += msg.value;
        
        emit DonationMade(_id, msg.sender, msg.value);
    }
}
```