/* eslint-disable require-jsdoc */
import {Provider} from '@project-serum/anchor';
import {Wallet} from '@project-serum/anchor/dist/provider';
import {
  Commitment,
  ConfirmOptions,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';

const opts = {
  preflightCommitment: 'confirmed',
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

async function sendLamports(
    wallet: Wallet,
    destinationPublicKey: PublicKey,
    lamports: number) {
  const provider = await getProvider(wallet);
  const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: destinationPublicKey,
        lamports: lamports,
      }),
  );
  transaction.feePayer = wallet.publicKey;
  const transactionSignature = provider.send(transaction);
  console.log('Inside anchor-utils: ', transactionSignature);
  return transactionSignature;
}

export {getProvider, sendLamports};
