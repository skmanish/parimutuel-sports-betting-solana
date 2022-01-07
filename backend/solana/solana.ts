import {
  Connection,
  Keypair,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  // TransactionInstruction,
  // SystemInstruction,
  PublicKey,
} from '@solana/web3.js';
// import bs58 from 'bs58';
import axios from 'axios';
import {NETWORK_CONFIG} from '../config';


const transferSolToAccount = async (
    fromKeypair: Keypair,
    destinationPublicKey: PublicKey,
    lamportsToSend: number) => {
  const connection = new Connection(NETWORK_CONFIG.BLOCKCHAIN_URL, 'confirmed');
  const transferTransaction = new Transaction()
      .add(SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: destinationPublicKey,
        lamports: lamportsToSend,
      }));
  const transactionSignature = await sendAndConfirmTransaction(
      connection,
      transferTransaction,
      [fromKeypair]);
  return transactionSignature;
};

const inspectTransaction = async (transactionSignature: string) => {
  await axios.post(NETWORK_CONFIG.BLOCKCHAIN_URL, {
    'jsonrpc': '2.0',
    'id': 1,
    'method': 'getTransaction',
    'params': [
      transactionSignature,
      'json',
    ],
  }).then((response) => {
    console.log(response.data);
  });
};

export {
  transferSolToAccount,
  inspectTransaction,
};
