import {PublicKey} from '@solana/web3.js';

export type User = {
    userPublicKey?: PublicKey,

    // Base58 encoded PublicKey of all events the user has participated in.
    userEvents?: string[],
    // Base58 encoded PublicKey of all events the user has redeemed.
    userEventsRedeemed?: string[],
};
