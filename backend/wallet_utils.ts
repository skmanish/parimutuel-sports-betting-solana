import {Wallet} from '@project-serum/anchor';
import {
  Keypair,
  PublicKey,
} from '@solana/web3.js';
import bs58 from 'bs58';

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

export {
  getAdminCreateUpdateKeyPairFromDb,
  getVaultKeyPairFromDb,
};

