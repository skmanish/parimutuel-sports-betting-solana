/* eslint-disable require-jsdoc */
import {
  Connection,
  PublicKey,
  ConfirmOptions,
} from '@solana/web3.js';
import {Provider, Wallet, Program, Idl} from '@project-serum/anchor';
import idl from '../idl.json';
import {getAdminCreateUpdateKeyPairFromDb} from './solana';

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
    userChoice: number, // 0-indexed.
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
    return fetchedEventAccount;
  } catch (err) {
    console.log(err);
  }
};

const getTotalWinningsForUserInSol = (
    eventAccount: any,
    userChoice: number,
    userSolCents: number,
) => {
  const totalSolCents = (
    eventAccount.option1BalanceCents +
    eventAccount.option2BalanceCents +
    eventAccount.option3BalanceCents +
    eventAccount.option4BalanceCents +
    eventAccount.option5BalanceCents
  );
  if (userChoice != eventAccount.correctOptionNumber) return 0;

  let correctOptionSolCents = 0;
  if (eventAccount.correctOptionNumber == 0) {
    correctOptionSolCents = eventAccount.option1BalanceCents;
  } else if (eventAccount.correctOptionNumber == 1) {
    correctOptionSolCents = eventAccount.option2BalanceCents;
  } else if (eventAccount.correctOptionNumber == 2) {
    correctOptionSolCents = eventAccount.option3BalanceCents;
  } else if (eventAccount.correctOptionNumber == 3) {
    correctOptionSolCents = eventAccount.option4BalanceCents;
  } else if (eventAccount.correctOptionNumber == 4) {
    correctOptionSolCents = eventAccount.option5BalanceCents;
  }
  return userSolCents*totalSolCents*0.0099/correctOptionSolCents;
};

export {
  registerUserBetOnEventAccount,
  fetchEvent,
  getTotalWinningsForUserInSol,
};
