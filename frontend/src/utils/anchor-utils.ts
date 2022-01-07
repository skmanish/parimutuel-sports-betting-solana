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
import {BLOCKCHAIN_URL} from './config';

const opts = {
  preflightCommitment: 'confirmed',
};

async function getProvider(wallet: Wallet) {
  /* Create the provider and return it to the caller */
  const network: string = BLOCKCHAIN_URL;
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
  const walletBalance = await getBalanceSafe(provider);
  if (await walletBalance <= lamports) return -1;
  const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: destinationPublicKey,
        lamports: lamports,
      }),
  );
  transaction.feePayer = wallet.publicKey;
  const transactionSignature = await provider.send(transaction);
  return transactionSignature;
}

const getBalanceSafe = async (provider: Provider) => {
  // If account has no transaction on blockchain, then getBalance throws.
  try {
    return await provider.connection.getBalance(
        provider.wallet.publicKey);
  } catch (error) {
    console.log(error);
    return 0;
  }
  return 0;
};

export {getProvider, sendLamports};
