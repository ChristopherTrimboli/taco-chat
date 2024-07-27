# taco-chat

Dapp chat example using TACo SDK threshold encryption protocol.

```bash
npm i
npm run dev
```

## Goal

Make a decentralized chat app where I can add list of friend's addresses and send private DMs back and forth in realtime.

## Dev Notes

### Conditions

#### Time Conditions

These allow data access past a certain timestamp date. Not bound to any certain address. Public once unlocked. Not useful for private chat app alone, possibly useful in conjunction with Compound Conditions.

#### Rpc Conditions

TACo docs shows 1 main example:

1. Condition upon: `eth_getBalance` where can test if a user has a certain amount of tokens.

For chat app, we would need to mint 1 off NFTs and send as balance, or fake a fantasy token balance to send private DMs. Complicated.

We need a more direct way of mapping to single user addresses without token balances. Looking at `eth_accounts` RPC call, I experimented with calling this for a direct user address comparison.

#### Contract Conditions

Again the main docs show a `method: balanceOf` being used for logic.
This requires us to mint a NFT or send a token balance for communication. Contract Conditions with a proxy in-between NFT seems like the path to taco-chat.

### @nucypher/taco

1. Dependency on ethers v5, would be nice to upgrade to v6. Web3Provider example is deprecated.

2. Feels like needs a `useTaco()` React SDK. `initialize()` procedure in useEffect is vanilla-JS and in strict mode initializes twice.

3. Could offer pre-made network provider configs in wagmi / usedapp libraries. Some pain finding all the custom network details needed among the docs and examples.

### Ritual IDs

The RitualID whitelist discord Beta program for mainnet is good first step for company, however this method of access means this is a centralized VIP access only system. People usually do this for spam and abuse reasons, understandable, but in web3 we are supposed to: "use Math". Build a system to prevent abuse by the implicit nature of the protocol, else gonna go offline like Solana every week and deal with "who is allowed" on the network drama. Someone makes a popular web3 chat-app that slows down TXs to 5 minute resolutions on your network. How will this be handled?

I would suggest a solution that consists of:

- Rate limits on account senders and nodes, only allow say 100 TXs per minute per address.
- Gas fee optimizations, make it more expensive during peak use.
- High enough staking pool to run a node, filter out the brokies and spammers.
- Banning / blacklisting of truly bad actors through a transparent DAO voting process.
