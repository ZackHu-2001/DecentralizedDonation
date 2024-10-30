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
        string[] messages;  // 捐赠者留言
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(address => PersonalProfile) public personalProfiles;
    mapping(address => bool) public hasProfile;
    
    uint256 public numberOfCampaigns = 0;
    
    // 事件定义
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

    // 创建个人档案
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

    // 更新个人档案
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

    // 向个人进行捐赠
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

    // 获取个人档案信息
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

    // 获取个人捐赠历史
    function getPersonalDonationHistory(address _person) public view returns (
        address[] memory donors,
        uint256[] memory amounts,
        string[] memory messages
    ) {
        require(hasProfile[_person], "Profile does not exist");
        PersonalProfile storage profile = personalProfiles[_person];
        
        return (profile.donors, profile.donations, profile.messages);
    }

    // Campaign相关函数保持不变...
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