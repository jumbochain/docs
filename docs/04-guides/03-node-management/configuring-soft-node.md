---
title: Configuring Soft Node
sidebar_label: Configuring Soft Node
sidebar_position: 1
---

Soft nodes are a type of node in a blockchain network that maintains only a partial copy of the blockchain instead of a full copy. These nodes rely on other nodes, typically full nodes, to provide them with necessary information such as block headers or transaction data. Light nodes consume fewer resources compared to full nodes, making them suitable for devices with limited computational power or storage capacity. While light nodes sacrifice some level of security and independence compared to full nodes, they still contribute to the decentralization of the network by verifying transactions and participating in the consensus process.

## System Requirements

System prerequisites to become a soft node:

- **CPU**: 8 Core

- **RAM**: 16 GB

- **Storage**: Solid State Drive (SSD) with a minimum capacity of 50GB

## Configuring

**Download the following files from github [https://github.com/jumbochain/go-jumbo-setup](https://github.com/jumbochain/go-jumbo-setup)**

- jumbo
- config.toml
- genesis.json

#### Initialize genesis to “directory”

```bash
./jumbo --datadir "directory" init genesis.json
```

#### For creating a new account: (Optional)

```bash
./jumbo --datadir "directory" account new
```

:::warning
Remember to save your password as you won't be able to retrieve it later is lost. We recommend writing it on a paper.
:::

:::warning
Remember to backup your keystore, to prevent losing keystore on data loss. We recommend storing it separately.
:::

## Start Soft Node

#### Run the below command to start node syncing

```bash
nohup ./jumbo --config ./config.toml --datadir "directory" --syncmode full --cache 2048 --rpc.allow-unprotected-txs --txlookuplimit 0 &
```

#### To check logs

```bash
tail -f "directory"/jumbo.log
```

#### Output

```bash
t=2024-03-04T09:32:12+0000 lvl=info msg="Imported new chain segment"         number=5,138,681 hash=0x5a47f5c9e65b6a4c68a27945e2379a70785172b93daf753dc1cd05a84be48069 miner=0x460aB6854781A2898fFA053547e81bb6565EEDDD blocks=1   txs=322  mgas=0.237   elapsed=72.198ms mgasps=3.276   dirty="3.41 MiB"


t=2024-03-04T09:32:12+0000 lvl=info msg="Imported new chain segment"         number=5,138,682 hash=0x56665836cb78ed71b0bdd2f173abf43f7063e0a67bba2a3923c8d49f6da88af2 miner=0x9fAf0D000985FC4183d607648311c641d096D02C blocks=1   txs=1967 mgas=0.139   elapsed=23.499ms mgasps=5.925   dirty="3.38 MiB" ignored=4
……………. t=2024-03-04T09:32:12+0000 lvl=info msg="Imported new chain segment"         number=5,138,683 hash=0x759431c944d6014070fc4b85c5a7bc522b8599111758f80d6962f919d4debf9f miner=0x4B312752B8C1989d9de8EA6a3956dc002747d5c8 blocks=1   txs=327  mgas=0.240   elapsed=6.860ms  mgasps=34.987  dirty="3.40 MiB"
```

## Check Status

After chain is successfully initiated.

```bash
./jumbo attach "directory"/jumbo.ipc
```

#### In the terminal enter the following command

```bash
Jumbo.syncing
```

if `false` then chain is synced successfully
