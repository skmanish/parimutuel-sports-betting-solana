/* eslint-disable require-jsdoc */
import {Provider} from '@project-serum/anchor';
import {Wallet} from '@project-serum/anchor/dist/provider';
import {
  Commitment,
  ConfirmOptions,
  Connection,
} from '@solana/web3.js';

const opts = {
  preflightCommitment: 'processed',
};

async function getProvider(wallet: Wallet) {
  /* Create the provider and return it to the caller */
  const network: string = process.env.REACT_APP_BLOCKCHAIN_URL as string;
  const connection = new Connection(
      network,
      opts.preflightCommitment as Commitment);

  const provider = new Provider(
      connection,
      wallet,
      opts.preflightCommitment as ConfirmOptions,
  );
  return provider;
}

export {getProvider};
