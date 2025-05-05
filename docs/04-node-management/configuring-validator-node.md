---
title: Configuring Validator Node
sidebar_label: Configuring Validator Node
sidebar_position: 2
---

Validator nodes are pivotal elements within Jumbo Blockchain’s Proof of Nexus (PoN) consensus mechanism, instrumental in the validation of transactions and the proposal of new blocks for incorporation into the blockchain. These nodes undertake the critical responsibility of ensuring transaction adherence to network regulations, actively participating in the consensus mechanism, and upholding network integrity. Validator nodes are rewarded for their contributions with transaction fees or block rewards, bolstering network security and decentralization. PoN blockchain network employs a system of periodic selection and rotation of validator nodes to prevent centralization and foster inclusivity and diversity.

## System Requirements

System prerequisites to become a validator node:

- **CPU**: 12 Core (16 core recommended for high performance)

- **RAM**: 32 GB

- **Storage**: Solid State Drive (SSD) with a minimum capacity of 100GB

## Configuring

**Download the following files from github [https://github.com/jumbochain/go-jumbo-setup](https://github.com/jumbochain/go-jumbo-setup)**

- jumbo
- config.toml
- genesis.json

#### Initialize genesis to “directory”

```bash
./jumbo --datadir "directory" init genesis.json
```

#### For creating a new account

```bash
./jumbo --datadir "directory" account new
```

:::warning
Remember or save your password as you won't be able to retrieve it later is lost. We recommend writing it on a paper.
:::

:::warning
Remember to backup your keystore, to prevent losing keystore on data loss. We recommend storing it separately.
:::

# Start Validator Node

#### Run the below command to start node syncing

```bash
nohup ./jumbo --config ./config.toml --datadir "directory" --syncmode "full" --unlock "address" --password password.txt --allow-insecure-unlock --mine --miner.jumbobase="address" &
```

#### To check logs

```bash
tail -f "directory"/jumbo.log
```

## Output

```bash
t=2024-03-04T09:27:55+0000 lvl=info msg="Imported new chain segment"          number=1,048,931 hash=0xa97277aa16f7305055e1573ee0c8c12123ac9a550a098098f31aafc8e0fe971a miner=0xb5209d412248c5A5e359D9D2e64b57dB32fE059F blocks=1 txs=255  mgas=0.190   elapsed=5.452ms  mgasps=34.781 dirty="374.17 KiB"

t=2024-03-04T09:27:55+0000 lvl=info msg="Commit new sealing work"             number=1,048,932 sealhash=0x6e3ba50e401a262bbfbb8b5ef3d7c9f0dde4604be4a9a34b594e057a0bbe5ea5 txs=39   gas=39832  fees=0 elapsed=12.181ms

t=2024-03-04T09:27:56+0000 lvl=info msg="Imported new chain segment"          number=1,048,933 hash=0x63d3c732c7da59eed8587108bb64b7daa30ae266bf93b7daec775d36a13a1927 miner=0x6705d39bbFeA1504caBD6dA639f87da935A9efE9 blocks=1 txs=29   mgas=0.031   elapsed=1.757ms  mgasps=17.887 dirty="376.71 KiB"
```

# Check Status

After chain is successfully initiated.

```bash
./jumbo attach "directory"/jumbo.ipc
```

#### In the terminal enter the following command

```bash
Jumbo.syncing
```

if `false` then chain is synced successfully
