---
title: Truffle
---
## Installation

- For instructions on installing truffle, please refer to the official documentation available [here](https://trufflesuite.com/docs/truffle/how-to/install/).

- After installing the truffle suite, Open your terminal or command prompt.

- Open, or create the project directory where you want to create your Truffle project in VS code.

- Run the following command to initialise a new Truffle project:

```bash
truffle init
```

- You will see the following output after initialising the project

```bash
Starting init...
================

> Copying project files to C:\Users\truffle_tests

Init successful, sweet!

Try our scaffold commands to get started:
  $ truffle create contract YourContractName # scaffold a contract
  $ truffle create test YourTestName         # scaffold a test
```

- After initialising the project, Truffle will set up the necessary project structure and configuration files.<br></br>

  ![alt text](<../../../static/img/truffle folder.png>)

## Configuring Truffle

- **Configuration File Setup**: Create or modify the Truffle configuration file `(truffle-config.js)` to include settings specific to the Jumbo Blockchain network. This may involve specifying the network name, endpoint URL, chain ID, and other relevant parameters required to connect to the Jumbo Blockchain node.

  ```javascript
  const HDWalletProvider = require("@truffle/hdwallet-provider");
  const privatekey = ["Enter_Your_Private_Key"]; //Private key of your wallet
  module.exports = {
    networks: {
      jumbochain: {
        provider: () =>
          new HDWalletProvider(privatekey, "https://testnode.jumbochain.org"),
        network_id: "234",
        skipDryRun: true,
      },
    },

    compilers: {
      //Specify the different versions of compilers you have used in your contracts
      solc: {
        version: ">=0.7.0 <0.9.0",
        settings: {
          optimizer: { enabled: true, runs: 800 },
          viaIR: true,
        },
      },
    },
  };
  ```

- **Network Configuration**: Here, we can specify the Jumbo Blockchain network details to connect truffle suit with the Jumbo Blockchain.

  Add your private key to the `privatekey`

- **Compiler Configuration**: Optionally, configure the Solidity compiler settings in the Truffle configuration file to match the version compatibility with Jumbo Blockchain. This ensures that smart contracts are compiled using the appropriate compiler version compatible with the Jumbo Blockchain network.

## Compiling Smart Contracts

:::tip

Before you compile the contracts you need to install all the dependencies required. You can do so by running:

```bash
npm i
```

or, If you face errors while running the above command, try force running this command.

```bash
npm i -f
```

Now once all the dependencies are installed you can proceed with the compilation process.
:::

- **Invoke Truffle Compile Command**: Execute the following command in the terminal to trigger the compilation process for your smart contracts. The command instructs Truffle to compile all Solidity contracts found within the designated directory.

```bash
truffle compile
```

- **Compilation Output**: Truffle will display the compilation output in the terminal, including information about the compiled contracts such as contract name, bytecode, and ABI (Application Binary Interface).

- **Compilation Artifacts**: After successful compilation, Truffle generates compilation artifacts for each contract in the build/contracts directory within your project. These artifacts contain metadata about the compiled contracts, including their bytecode, ABI, and other relevant information.

## Deploying Smart Contracts

- **Migration Scripts**: In order to deploy contract, create a **javascript** file each for every contract conventionally known as **ContractName_migration.js**. Paste the followiing code according to the contract.

  ```javascript
  const SampleContract = artifacts.require("Auction"); //Specify the contract to be deployed

  module.exports = function (deployer) {
    deployer.deploy(SampleContract); // pass  the values required for the constructor if any
  };
  ```

  Ensure that the migration scripts are properly configured to deploy contracts to the Jumbo Blockchain network. Update any network-specific parameters or deployment steps accordingly within the migration scripts.

- **Deploy Contract**: Execute the deployment process using the following command, specifying the target network as Jumbo Blockchain. Truffle will deploy the compiled smart contracts to the Jumbo Blockchain network using the configured accounts and network settings :

```bash
truffle migrate --network jumbochain
```

- **Transaction Confirmation**: During the deployment process, Truffle will display transaction hashes for each contract deployment transaction.<br></br>

```bash
Starting migrations...
======================
> Network name:    'jumbochain'
> Network id:      234
> Block gas limit: 5000000 (0x4c4b40)


1_Auction_migrations.js
=======================

   Replacing 'Auction'
   -------------------
   > transaction hash:    0xbe08f8704d0dd6c81cffe36696f8539c892864561593501a020ccd22266cbe39
   > Blocks: 32           Seconds: 10
   > contract address:    0x5FD98968E94A495C237c2302FcC033Fe2bD17514
   > block number:        3789665
   > block timestamp:     1709110996
   > account:             0x6592927982FF9305a84bDEE6B207f3435ED6CE91
   > balance:             489.9882527499
   > gas used:            482791 (0x75de7)
   > gas price:           0.1 gwei
   > value sent:          0 ETH
   > total cost:          0.0000482791 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:        0.0000482791 ETH
```

## Verifying your Contracts

- Optionally,we can verify the deployed contracts on the [Jumbo Blockchain explorer.](https://protojumbo.jumbochain.org/)

- Enter deployed contract transaction hash. <br></br>

  ![alt text](./img/search-tx.png)

- We can see the transaction details in the window.<br></br>

  ![alt text](./img/confirmation.png)
