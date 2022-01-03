import {
  Connection,
  Keypair,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  PublicKey,
} from '@solana/web3.js';
import bs58 from 'bs58';
import {Wallet} from '@project-serum/anchor';

const getAdminCreateUpdateKeyPairFromDb = async (db) => {
  const keypair = await db.collection('wallets').doc(
      'admin-for-create-update-eventaccount').get();
  if (keypair.exists &&
    'privateKey' in keypair.data() &&
    'publicKey' in keypair.data()) {
    return new Wallet(new Keypair({
      publicKey: new PublicKey(keypair.data().publicKey).toBytes(),
      secretKey: bs58.decode(keypair.data().privateKey),
    }));
  };
};

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
  getAdminCreateUpdateKeyPairFromDb,
};
