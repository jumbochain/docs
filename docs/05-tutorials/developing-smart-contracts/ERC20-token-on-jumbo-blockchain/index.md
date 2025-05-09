---
title: Create and deploy a standard ERC-20 token on the Jumbo Blockchain
---

In this tutorial we will learn how to develop and deploy a fungible token
(ERC-20 standard compliant) with a name and symbol using `OpenZeppelin` on Jumbo Blockchain using
hardhat, with an initial supply minted to deployer's
wallet.

## Setup

Initialise you project directory.

```bash
hardhat init
```

If hardhat is not installed on your system, you can use following command to install it globally.

```bash
npm install -g hardhat
```

Add open `OpenZeppelin` module to your project.

```bash
npm install @openzeppelin/contracts
```

We will also need dotenv.

```bash
npm install dotenv
```

## Update hardhat config

- Update solidity compiler version.
- Add network.

:::tip
Search `ProtoJumbo` on [chainlist](https://chainlist.org/?chain=1009&testnets=true&search=protojumbo) to find rpc url.
:::

- Add accounts private key, we need three accounts owner, spender & recipient.

:::tip
You can use metamask to create accounts, and find your private key for particular account in metamask Options>Account Details>Show Private Key after password authentication.
:::

- Get testnet JNFTC, it is required to make transactions.
  Use [faucet](https://protojumbo.jumbochain.org/faucet-smart) to aquire it on protojumbo testnet.

Your hardhat config should look similar to this:

```javascript title="hardhat.config.js"
 
require("@nomicfoundation/hardhat-toolbox");

const owner = "2a3569dbc2f6afb8ad94eb65ac23d8530538b3ed153d8dfae26e163c80fcbbad";
const spender = "55782da8d496f78c228cb15afcaa6f222f6d17c231d72bb12ac97153394e7074";
const recipient = "4a0665930111bf18c0c6618db483ec7d58ee4fcb9caef790f2177d37b06b7e9f"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",

  networks: {
    jumbochain: {
      url: `https://testnode.jumbochain.org`, // RPC URL which you can get from
      //the chainlist, as mentioned in the documentation.
      accounts: [`${owner}`, `${spender}`, `${recipient}`],
    },
  },
};

```

## Smart contract

Now copy following contract code to your contracts/token.sol file.

```solidity title="contracts/token.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("JumboToken", "JBT") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
}

```

Project directory should now look like this:

```bash
➜  tree --gitignore
.
├── contracts
│   └── token.sol
├── hardhat.config.js
├── ignition
│   └── modules
│       └── Lock.js
├── package.json
├── package-lock.json
├── README.md
└── test
    └── Lock.js

5 directories, 7 files
```

## Deploy Script

Create scripts directory and following script there.
This will be used to deploy your token contract.

```javascript title="scripts/deploy_token.js"
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy();

  await myToken.waitForDeployment();

  console.log("MyToken deployed to:", myToken.target);

  const balance = await myToken.balanceOf(deployer.address);

  console.log("Balance of deployer:", balance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Use following command to deploy:

```bash
npx hardhat run scripts/deploy_token.js --network jumbochain
```

If execution was successful output should look similar to this:

```bash

➜  npx hardhat run scripts/deploy_token.js --network jumbochain
Deploying contracts with the account: 0x9cBe7967327992e51Cc01f77d7ECafA6D623667f
MyToken deployed to: 0x06F624C71331F45AeE4f24E9F40B1369489C8d09
Balance of deployer: 1000000000000000000000

```

Now, the token contract is deployed on Jumbo Blockchain and the deployer wallet
received initial minted JBT tokens.

Note the address where tokens are deployed. We will need it to transfer tokens.

Tokens are standard-compliant (ERC-20) and ready for transfer.

Now that we have smart contract address for out smart contract lets add it to the .env file in the project root directory.

This is used in upcoming scripts.

```bash
➜  cat .env
TOKEN_ADDRESS="0x06F624C71331F45AeE4f24E9F40B1369489C8d09"

```

## Notes and Best Practices

- **Initial Supply:** You can change the initial supply as needed by adjusting the _mint value.

- **Decimals:** By default, ERC-20 uses 18 decimals. Override decimals() if you want a different setting.

- **Security:** Always verify and test token behavior on JumboChain Testnet before deploying to Mainnet.

- **Gas Fees:** Ensure the deployer has sufficient JNFTC to pay for the deployment transaction.

- **Naming:** Choose unique token names and symbols to avoid confusion on block explorers.

## Transfer ERC20 Tokens

Following script transfers tokens directly from sender account to recipient account.

```javascript title="scripts/transfer_tokens.js"

const hre = require("hardhat");

async function main() {
  const [owner, recipient] = await hre.ethers.getSigners();

  // Replace with the actual address of your deployed MyToken contract
  const tokenAddress = "0x06F624C71331F45AeE4f24E9F40B1369489C8d09";
  const amountToSend = hre.ethers.parseUnits("100", 18); // Sending 100 tokens (assuming 18 decimals)

  const MyToken = await hre.ethers.getContractAt("MyToken", tokenAddress);

  console.log("Initiating transfer from:", owner.address);
  console.log("Recipient address:", recipient.address);
  console.log("Amount to send:", hre.ethers.formatUnits(amountToSend, 18), "JBT");

  const transferTx = await MyToken.transfer(recipient.address, amountToSend);
  await transferTx.wait();

  console.log("Transfer successful!");
  console.log("Transaction hash:", transferTx.hash);

  const ownerBalance = await MyToken.balanceOf(owner.address);
  const recipientBalance = await MyToken.balanceOf(recipient.address);

  console.log("Owner's new balance:", hre.ethers.formatUnits(ownerBalance, 18), "JBT");
  console.log("Recipient's new balance:", hre.ethers.formatUnits(recipientBalance, 18), "JBT");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

```

Run the script with:

```bash
npx hardhat run scripts/transfer_tokens.js --network jumbochain
```

Output should look like this:

```bash
➜  npx hardhat run scripts/transfer_tokens.js --network jumbochain
Initiating transfer from: 0x9cBe7967327992e51Cc01f77d7ECafA6D623667f
Recipient address: 0x9e1ef0F92cc2E17FEe8B5E13183cf9668695DB56
Amount to send: 100.0 JBT
Transfer successful!
Transaction hash: 0xcfb4e86611ea7760404cdac8906216a52430966b0b87ae85f538ebd4694c1382
Owner's new balance: 900.0 JBT
Recipient's new balance: 100.0 JBT

```

## Approve a Spender

Allows someone else (spender) to spend tokens on your behalf.

```javascript title="scripts/approve_tokens.js"

require("dotenv").config(); // Load environment variables

const hre = require("hardhat");

async function main() {
  const [owner, spender] = await hre.ethers.getSigners();

  // Load token address from environment variables
  const tokenAddress = process.env.TOKEN_ADDRESS;

  if (!tokenAddress) {
    console.error("Error: TOKEN_ADDRESS not found in .env file.");
    return;
  }

  //Approve 50 tokens
  const amountToApprove = hre.ethers.parseUnits("50", 18);

  const MyToken = await hre.ethers.getContractAt("MyToken", tokenAddress);

  console.log("Owner address (approving):", owner.address);
  console.log("Spender address (to be approved):", spender.address);
  console.log(
    "Amount to approve:",
    hre.ethers.formatUnits(amountToApprove),
    "JBT"
  );

  const approveTx = await MyToken.approve(spender.address, amountToApprove);
  await approveTx.wait();

  console.log("Approval successful!");
  console.log("Transaction hash:", approveTx.hash);

  const allowance = await MyToken.allowance(owner.address, spender.address);
  console.log(
    "Allowance granted to spender:",
    hre.ethers.formatUnits(allowance),
    "JBT"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

```

Run the script with:

```bash
npx hardhat run scripts/approve_tokens.js --network jumbochain

```

And output should look similar to this:

```bash
➜  npx hardhat run scripts/approve_tokens.js --network jumbochain
Owner address (approving): 0x9cBe7967327992e51Cc01f77d7ECafA6D623667f
Spender address (to be approved): 0x9e1ef0F92cc2E17FEe8B5E13183cf9668695DB56
Amount to approve: 50.0 JBT
Approval successful!
Transaction hash: 0x9fcc7b1bede4ee0054b1a3a749ea5d8b9c099d531ea8b0bf057e686b68a0e4a1
Allowance granted to spender: 50.0 JBT

```

## Transfer Tokens via transferFrom()

Spender calls transferFrom() to move tokens from owner → recipient (after approval).

```javascript title="scripts/spend_approved_tokens.js"
require("dotenv").config();

const hre = require("hardhat");

async function main() {
  // We need a different signer here - the one we approved (the spender)
  const [owner, spender, recipient] = await hre.ethers.getSigners();

  const tokenAddress = process.env.TOKEN_ADDRESS;
  const amountToSpend = hre.ethers.parseUnits(
    "25", // lets spend 25 out of allowed tokens
  );

  if (!tokenAddress) {
    console.error("Error: TOKEN_ADDRESS not found in .env file.");
    return;
  }

  const MyToken = await hre.ethers.getContractAt("MyToken", tokenAddress);

  console.log("Spender address (spending):", spender.address);
  console.log("Recipient address:", recipient.address);
  console.log(
    "Amount to spend:",
    hre.ethers.formatUnits(amountToSpend),
    "JBT"
  );

  // The spender needs to call the transferFrom function
  const spendTx = await MyToken.connect(spender).transferFrom(
    owner.address,     // The address whose tokens are being spent
    recipient.address, // The address to receive the tokens
    amountToSpend      // The amount of tokens to transfer
  );
  await spendTx.wait();

  console.log("Spend successful!");
  console.log("Transaction hash:", spendTx.hash);

  const spenderBalance = await MyToken.balanceOf(spender.address);
  const recipientBalance = await MyToken.balanceOf(recipient.address);
  const ownerBalance = await MyToken.balanceOf(owner.address);

  console.log(
    "Spender's new balance:",
    hre.ethers.formatUnits(spenderBalance),
    "JBT"
  );
  console.log(
    "Recipient's new balance:",
    hre.ethers.formatUnits(recipientBalance),
    "JBT"
  );
  console.log(
    "Owner's new balance:",
    hre.ethers.formatUnits(ownerBalance),
    "JBT"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Run the Scripts:

```bash

npx hardhat run scripts/spend_approved_tokens.js --network jumbochain

```

Output should look similar to this:

```bash
➜  npx hardhat run scripts/spend_approved_tokens.js --network jumbochain
Spender address (spending): 0x9e1ef0F92cc2E17FEe8B5E13183cf9668695DB56
Recipient address: 0x7C28f3755c268ff050D25Ca2afCc83a2b84FEF4F
Amount to spend: 25.0 JBT
Spend successful!
Transaction hash: 0xc5ab6fb97e169d00f6befee6d429d70fe84c91ad0011a9e8ae61f974b1e7eb63
Spender's new balance: 125.0 JBT
Recipient's new balance: 25.0 JBT
Owner's new balance: 850.0 JBT

```

With this we have learned:

- How to build and deploy a ERC20 token on Jumbo Blockchain.
- How to use hardhat tools, protojumbo faucet effectively test contracts on testnet.
