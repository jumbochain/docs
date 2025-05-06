---
title: Building and Deploying an NFT (ERC-721) Smart Contract
---

We will use OpenZeppelin ERC721 + ERC721URIStorage to create ERC-721 NFT which
supports metadata URIs(meaning have images, names and descriptions).

We will also implement NFT minting with tokenURI support.

Deploy it on Jumbo Blockchain using Hardhat Toolbox.

## Let's start

Initialise a project using hardhat.

```bash
hardhat init
```

Install dependency

```bash
npm install @openzeppelin/contracts
```

## Smart Contract

```solidity title="contracts/nft.sol"
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

`ERC721URIStorage` Supports metadata URIs (JSON files with name/image/etc.)

`_nextTokenId`  Auto-incrementing unique token IDs

`safeMint()` Mints NFT + sets metadata URI in one call

## Deployment Script

```javascript title="deploy.js"
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

You have deployed an ERC-721 NFT contract on Jumbo Blockchain

Now, you want to mint NFTs:
With metadata URI pointing to JSON (image, name, description)

## Example NFT Metadata JSON (Stored Off-Chain)

### ✅ Step 1: Save NFT Metadata JSON

Example metadata:

```json
{
  "name": "Jumbo NFT #1",
  "description": "This is the first NFT on JumboChain!",
  "image": "<https://example.com/nft1.png>"
}
```

You save this JSON file:
On IPFS (preferred, decentralized)
e.g., `ipfs://QmXyz...`

Or on HTTPS server (centralized but simple)
e.g., `https://mycdn.com/nfts/1.json`

### ✅ Step 2: Get the URL/URI of that JSON

This above URL of asset/data becomes your token URI

It tells wallets/marketplaces where to fetch NFT metadata (name, description, image).

### ✅ Step 3: Call Your Contract’s safeMint() Function

Pass:

```
to: <recipient address>

uri: <link to the JSON file>
```

Minting NFTs with Metadata URI (IPFS / HTTPS)

So that wallets and marketplaces show your NFTs properly 🎨

We will:
Upload NFT metadata JSON (to IPFS or HTTPS)

Use Hardhat script to call safeMint() with the metadata URI

Mint NFTs that display correctly on-chain and off-chain

Prerequisites
Your NFT contract (e.g., MyNFT) is deployed

JSON metadata file is uploaded on:

✅ IPFS (preferred)

or ✅ HTTPS server (optional)

Example NFT Metadata JSON (Token Metadata)
Save this as 1.json and upload to IPFS or HTTPS server:

```json
{
  "name": "Jumbo NFT #1",
  "description": "This is the first NFT on JumboChain!",
  "image": "<https://example.com/nft1.png>"
}

```

✅ Example Token URI:
If IPFS: ipfs://QmXyz123...

If HTTPS: `https://mycdn.com/nfts/1.json`
Minting Script (Hardhat)

```javascript title="scripts/mint_nft.js"
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  //  Replace with your deployed contract address
  const nftAddress = "0xYourDeployedNFTContractAddress";
  const NFT = await ethers.getContractAt("MyNFT", nftAddress);

  // Minting details
  const recipient = "0xRecipientAddressHere"; // Who gets the NFT
  const tokenURI = "<https://mycdn.com/nfts/1.json>"; // Or IPFS link e.g., ipfs://QmXyz...

  console.log(`Minting NFT to ${recipient} with metadata ${tokenURI}...`);
  const tx = await NFT.safeMint(recipient, tokenURI);
  await tx.wait();

  console.log(`NFT minted! Check transaction: ${tx.hash}`);
}

main();
```

📦 Run the Script-

```bash
npx hardhat run scripts/mint_nft.js --network jumbochain
```

After running this:

- NFT is minted to the recipient address ✅

- Token’s metadata URI points to your JSON file

- Wallets & marketplaces can fetch and display NFT image, name, and description 🎨

- Viewing and Verifying of NFT Metadata can be done On-Chain

## Confirm the tokenURI is correctly stored on-chain

This must be done to

- To fetch and verify the metadata JSON (name, description, image)

- To ensure NFT displays correctly in wallets and marketplaces

### Step 1: Get the Token URI On-Chain

```javascript title="scripts/view_nft_metadata.js"

const { ethers } = require("hardhat");

async function main() {
  const [viewer] = await ethers.getSigners();

  // Replace with your deployed NFT contract address
  const nftAddress = "0xYourDeployedNFTContractAddress";
  const NFT = await ethers.getContractAt("MyNFT", nftAddress);

  //  Replace with your minted token ID
  const tokenId = 0;

  // Call tokenURI()
  const tokenURI = await NFT.tokenURI(tokenId);

  console.log(`Token ID ${tokenId} has URI: ${tokenURI}`);
}

main();
```

📦 Run the Script

```bash
npx hardhat run scripts/view_nft_metadata.js --network jumbochain
```

🛠 Expected Output

Token ID 0 has URI: `https://mycdn.com/nfts/1.json`
Or if IPFS:
Token ID 0 has URI: ipfs://QmXyz123…

### Step 2: Fetch the Metadata JSON (Off-Chain)

Open the tokenURI in browser or fetch with curl or axios

### Step 3: Verify Metadata Fields

```
✅ Yes    NFT display name
✅ Yes    NFT description text
✅ Yes    URL to NFT image (HTTPS or IPFS link)
```
