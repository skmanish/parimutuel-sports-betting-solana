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

const walletsDb = process.env.WALLETS_DB;
const getAdminCreateUpdateKeyPairFromDb = async (db) => {
  const keypair = await db.collection(walletsDb).doc(
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

const getVaultKeyPairFromDb = async (db, vaultPublicKey) => {
  const snapshot = await db.collection(walletsDb).where(
      'publicKey', '==', vaultPublicKey).limit(1).get();
  if (snapshot.empty) {
    console.log('Keypair not found for vault', vaultPublicKey);
  } else {
    const keypair = snapshot.docs[0].data();
    return new Keypair({
      publicKey: bs58.decode(keypair.publicKey),
      secretKey: bs58.decode(keypair.privateKey),
    });
  }
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
  getVaultKeyPairFromDb,
};
