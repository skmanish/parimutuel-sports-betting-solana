import {
  Connection,
  Keypair,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  PublicKey,
} from '@solana/web3.js';

const transferSolToAccount = async (
    fromKeypair: Keypair,
    destinationPublicKey: PublicKey,
    lamportsToSend: number) => {
  const connection = new Connection(process.env.BLOCKCHAIN_URL, 'confirmed');
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
  const connection = new Connection(process.env.BLOCKCHAIN_URL, 'confirmed');
  const tx = (await connection.getConfirmedTransaction(transactionSignature));
  console.log(tx);
};

export {
  transferSolToAccount,
  inspectTransaction,
};
