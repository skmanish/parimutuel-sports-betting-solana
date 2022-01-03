/* eslint-disable require-jsdoc */
import {
  Connection,
  PublicKey,
  ConfirmOptions,
} from '@solana/web3.js';
import {Provider, Wallet, Program, Idl} from '@project-serum/anchor';
import idl from '../idl.json';
import { getAdminCreateUpdateKeyPairFromDb } from './solana';

const programID = new PublicKey(idl.metadata.address);

async function getProvider(wallet: Wallet) {
  /* Create the provider and return it to the caller */
  const connection = new Connection(process.env.BLOCKCHAIN_URL, 'confirmed');

  const provider = new Provider(
      connection,
      wallet,
      'confimed' as ConfirmOptions,
  );
  return provider;
}

const registerUserBetOnEventAccount = async (
    wallet: Wallet,
    eventAccountPublicKeyBase58: string,
    userChoice: number,
    userBetInSolCents: number,
) => {
  const provider = await getProvider(wallet);
  const program = new Program(idl as Idl, programID, provider);
  if (userChoice > 4 || userChoice < 0) return false;
  await program.rpc.addUserBetToEvent(1, userBetInSolCents, {
    accounts: {
      eventAccount: new PublicKey(eventAccountPublicKeyBase58),
      authority: provider.wallet.publicKey,
    },
  });
  return true;
};

const fetchEvent = async (eventId: string, db: any) => {
  const wallet = await getAdminCreateUpdateKeyPairFromDb(db);
  const provider = await getProvider(wallet);
  const program = new Program(idl as Idl, programID, provider);
  try {
    const fetchedEventAccount = await program.account.eventAccount.fetch(
        new PublicKey(eventId));
    console.log(fetchedEventAccount);
    return fetchedEventAccount;
  } catch (err) {
    console.log(err);
  }
};

export {registerUserBetOnEventAccount, fetchEvent};
