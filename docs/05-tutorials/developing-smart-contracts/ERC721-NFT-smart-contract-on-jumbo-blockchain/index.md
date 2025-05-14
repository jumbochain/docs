---
title: Building and Deploying Your First NFT (ERC-721) on Jumbochain
---

You'll learn how to create and deploy your very own Non-Fungible Token (NFT) on the Jumbo Blockchain.

We'll be using the popular OpenZeppelin library to create an ERC-721 NFT that supports metadata, meaning your NFTs can have images, names, and descriptions!

Specifically, we will:

    Use OpenZeppelin's ERC721 and ERC721URIStorage contracts to create our NFT.
    Implement NFT minting with support for tokenURI, which links your NFT to its unique metadata.
    Deploy our smart contract to the Jumbo Blockchain using the Hardhat Toolbox, a powerful development environment.

## Let's Get Started

First, we need to set up our project. Open your terminal and follow these steps:

```Bash
mkdir nft-on-jumbochain
cd nft-on-jumbochain
```

This will create a new folder named nft-on-jumbochain and navigate you into it.

Next, we'll initialize a Hardhat project. This will set up the necessary files and folders for our smart contract development.
Bash

```bash
npx hardhat init
```

When prompted, choose the default options for a basic Hardhat project.

Now, we need to install the OpenZeppelin Contracts library, which provides secure and well-tested smart contract implementations.

```bash
npm install @openzeppelin/contracts
```

This command will download and install the OpenZeppelin contracts into your project.

## Writing the Smart Contract

Now, let's write the code for our NFT smart contract.
Create a new folder named contracts in your project directory, and inside it, create a file named nft.sol.
Then, paste the following code into nft.sol:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable(msg.sender) {
    uint256 private _nextTokenId;

    constructor() ERC721("MyNFTCollection", "MNFT") {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId;
        _nextTokenId += 1;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
}
```

Let's break down what this code does:

```bash
    // SPDX-License-Identifier: MIT: This line specifies the licensing of our code.
    pragma solidity ^0.8.20;: This indicates that our contract is written for Solidity version 0.8.20 or higher.
    import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";: This line imports the ERC721URIStorage contract from OpenZeppelin. This contract extends the basic ERC-721 standard and adds functionality for storing metadata URIs (more on this later!).
    import "@openzeppelin/contracts/access/Ownable.sol";: This imports the Ownable contract, which allows us to designate an owner for our NFT contract who has special administrative privileges.
    contract MyNFT is ERC721URIStorage, Ownable(msg.sender) { ... }: This declares our smart contract named MyNFT. It inherits functionalities from both ERC721URIStorage and Ownable. When Ownable is initialized with msg.sender, the address that deploys the contract becomes its initial owner.
    uint256 private _nextTokenId;: This declares a private variable to keep track of the next available token ID. It will automatically increment each time a new NFT is minted, ensuring each NFT has a unique ID.
    constructor() ERC721("MyNFTCollection", "MNFT") {}: This is the constructor of our contract. When the contract is deployed, it initializes the ERC-721 standard with a name ("MyNFTCollection") and a symbol ("MNFT") for our NFT collection.
    function safeMint(address to, string memory uri) public onlyOwner { ... }: This is a custom function we've created to mint new NFTs.
        address to: This specifies the address that will receive the newly minted NFT.
        string memory uri: This is the Uniform Resource Identifier (URI) that points to the metadata JSON file for this specific NFT.
        public onlyOwner: This modifier ensures that only the owner of the contract (the address that deployed it) can call this function.
        Inside the function:
            uint256 tokenId = _nextTokenId;: We get the current value of _nextTokenId and assign it as the ID for the new NFT.
            _nextTokenId += 1;: We increment _nextTokenId so the next NFT will have a different ID.
            _safeMint(to, tokenId);: This function, inherited from ERC721, actually creates and assigns the NFT with the generated tokenId to the specified to address. The safeMint version is recommended as it prevents sending NFTs to contracts that cannot handle them.
            _setTokenURI(tokenId, uri);: This function, inherited from ERC721URIStorage, associates the provided uri with the newly minted tokenId. This is how our NFT gets its metadata!
    ```


## Writing the Deployment Script

Now that our smart contract is ready, we need a way to deploy it to the Jumbo Blockchain. Hardhat makes this easy with deployment scripts.

Create a new folder named scripts in your project directory, and inside it, create a file named deploy.js. Then, paste the following code into deploy.js:

```JavaScript

const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying NFT contract with account:", deployer.address);

    const NFT = await ethers.getContractFactory("MyNFT");
    const nft = await NFT.deploy();
    await nft.waitForDeployment();

    console.log("NFT Contract deployed to:", await nft.getAddress());
}

main();
```

Here's what this script does:

```bash
    const { ethers } = require("hardhat");: This line imports the ethers library, which is used to interact with the Ethereum blockchain. Hardhat provides a wrapped version of ethers.
    async function main() { ... }: This defines an asynchronous function named main, which will contain our deployment logic.
    const [deployer] = await ethers.getSigners();: This line gets the first account provided by Hardhat (usually the default deployer account). We'll use this account to deploy our contract.
    console.log("Deploying NFT contract with account:", deployer.address);: This logs the address of the account that will be used for deployment.
    const NFT = await ethers.getContractFactory("MyNFT");: This line gets a "contract factory," which is an abstraction used to deploy new smart contracts. We specify the name of our contract, "MyNFT".
    const nft = await NFT.deploy();: This is the crucial step where we actually deploy our MyNFT contract to the blockchain. The await keyword ensures that the script waits for the deployment transaction to be sent.
    await nft.waitForDeployment();: This line waits for the deployment transaction to be confirmed on the blockchain.
    console.log("NFT Contract deployed to:", await nft.getAddress());: Once the contract is successfully deployed, this line logs the address where our NFT contract can now be found on the Jumbo Blockchain.
    main(): This line calls the main function to start the deployment process.

To deploy your contract to the Jumbo Blockchain, you'll need to configure Hardhat to connect to the Jumbo network. This usually involves adding network details in your hardhat.config.js file (which was created when you initialized the Hardhat project). You'll need to get the specific RPC URL and potentially other parameters for the Jumbo network. Make sure you have your Jumbo network configured correctly in hardhat.config.js before running the deployment script.

Once configured, you can run the deployment script using the following command in your terminal:

```

```bash
npx hardhat run scripts/deploy.js --network jumbochain
```

Important: Replace jumbochain with the actual network name you configured in your hardhat.config.js for the Jumbo Blockchain.

After successfully running this command, you will see the address where your NFT contract has been deployed on the Jumbo Blockchain!
Minting NFTs with Metadata URI

Congratulations! You've deployed your NFT contract. Now, let's learn how to mint new NFTs and associate them with metadata, such as images, names, and descriptions. This metadata is typically stored off-chain as a JSON file, and the tokenURI in our smart contract points to this file.

Here's the process:

## Create and Save NFT Metadata JSON

Each NFT will have its own metadata JSON file. Here's an example of what this file might look like:

```json

{
    "name": "Jumbo NFT #1",
    "description": "This is the first NFT on JumboChain!",
    "image": "<https://example.com/nft1.png>"
}
```

    name: The name of your NFT.
    description: A brief description of your NFT.
    image: A URL pointing to the image associated with your NFT. This can be an HTTPS URL or an IPFS link.

You need to save this JSON file somewhere it can be accessed via a URL. Here are two common options:

    IPFS (InterPlanetary File System) - Preferred: IPFS is a decentralized storage network. Uploading your metadata JSON to IPFS provides a content-addressed and permanent link (e.g., ipfs://QmXyz...). This is generally considered more robust and decentralized.
    HTTPS Server (Centralized but Simple): You can also host your JSON file on a regular web server (e.g., https://mycdn.com/nfts/1.json). This is simpler to set up initially but relies on the availability of the server.

## Obtain the URL (Token URI) of Your JSON File

Once you've uploaded your metadata JSON, you'll get a unique URL or URI. This is your tokenURI. It's crucial as it tells wallets and marketplaces where to find the metadata for your NFT.

    Example IPFS Token URI: ipfs://QmYourUniqueIPFSHash...
    Example HTTPS Token URI: https://yourdomain.com/metadata/1.json

## Call the safeMint() Function of Your Contract

Now, we'll use a Hardhat script to interact with our deployed NFT contract and call the safeMint() function. This will create a new NFT and associate it with the tokenURI of our metadata.

Create a new file named mint_nft.js in your scripts folder and paste the following code:

```javascript

const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    // Replace with the actual address of your deployed NFT contract
    const nftAddress = "0xYourDeployedNFTContractAddress";
    const NFT = await ethers.getContractAt("MyNFT", nftAddress);

    // Minting details
    const recipient = "0xRecipientAddressHere"; // The address that will receive the NFT
    const tokenURI = "https://mycdn.com/nfts/1.json"; // Replace with your metadata URI (IPFS or HTTPS)

    console.log(`Minting NFT to ${recipient} with metadata URI: ${tokenURI}...`);
    const tx = await NFT.safeMint(recipient, tokenURI);
    await tx.wait();

    console.log(`NFT minted! Transaction hash: ${tx.hash}`);
}

main();
```

Remember to replace the placeholder values:

    "0xYourDeployedNFTContractAddress": with the actual address of your deployed MyNFT contract (the output from your deploy.js script).
    "0xRecipientAddressHere": with the Ethereum address of the person or account you want to send the newly minted NFT to.
    "https://mycdn.com/nfts/1.json": with the actual tokenURI of your metadata JSON file (either your IPFS link or your HTTPS URL).

Now, run this script using Hardhat:

```bash
npx hardhat run scripts/mint_nft.js --network jumbochain
```

Again, ensure that jumbochain matches the network name in your hardhat.config.js.

After the script runs successfully, an NFT will be minted to the specified recipient address, and its metadata URI will be stored on the Jumbo Blockchain! Wallets and marketplaces that support NFTs can now read this tokenURI and fetch the associated metadata to display your NFT correctly.
Viewing and Verifying NFT Metadata

To ensure your NFT's metadata is correctly associated and accessible, you can verify it on-chain and off-chain.

## Retrieve the Token URI On-Chain

We can write a simple Hardhat script to read the tokenURI for a specific NFT ID directly from our deployed contract. Create a new file named view_nft_metadata.js in your scripts folder and paste the following code:

```javascript

const { ethers } = require("hardhat");

async function main() {
    const [viewer] = await ethers.getSigners();

    // Replace with the actual address of your deployed NFT contract
    const nftAddress = "0xYourDeployedNFTContractAddress";
    const NFT = await ethers.getContractAt("MyNFT", nftAddress);

    // Replace with the ID of the NFT you want to check (usually starts from 0)
    const tokenId = 0;

    // Call the tokenURI() function of the contract
    const tokenURI = await NFT.tokenURI(tokenId);

    console.log(`Token ID ${tokenId} has URI: ${tokenURI}`);
}

main();

```

Remember to replace:

```

    "0xYourDeployedNFTContractAddress": with your deployed NFT contract address.
    0: with the ID of the NFT you want to inspect. The first NFT you minted will likely have an ID of 0.
```

Run this script:

```bash

npx hardhat run scripts/view_nft_metadata.js --network jumbochain

```

## Fetch the Metadata JSON (Off-Chain)

The output of the previous script will be the tokenURI. Now, open this URL in your web browser. If it's an HTTPS link, you should see the JSON metadata file displayed in your browser. If it's an IPFS link (e.g., ipfs://QmXyz...), you might need to use an IPFS gateway (like `https://ipfs.io/ipfs/QmXyz>...`) to view the JSON data.

Alternatively, you can use command-line tools like curl or programming libraries like axios to fetch the content of the tokenURI.
Step 3: Verify the Metadata Fields

Once you have the JSON data, verify that it contains the expected information:

```
     NFT display name: The name field should be present and correct.
     NFT description text: The description field should accurately describe your NFT.
     URL to NFT image: The image field should contain a valid URL (HTTPS or IPFS) that points to the image associated with your NFT.
```

If you can successfully retrieve and verify this metadata, congratulations! You've successfully minted an NFT on the Jumbo Blockchain with associated metadata that can be displayed by wallets and marketplaces.
