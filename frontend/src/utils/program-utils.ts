import {Program, Wallet, Idl, web3} from '@project-serum/anchor';

import {
  EventMetadata,
  FetchedEventAccountType,
} from '../types/event';
import {getProvider} from './anchor-utils';
import idl from '../idl.json';
import {PublicKey, SystemProgram} from '@solana/web3.js';

const programID = new PublicKey(idl.metadata.address);

const populateEventMetadataWithFetchedAccount = (
    event: EventMetadata,
    fetchedAccount: FetchedEventAccountType,
) => {
  event.eventAuthorityPublicKeyBase58 = fetchedAccount.authority.toBase58();
  event.eventVaultPubkey = fetchedAccount.vault.toBase58();
  event.eventState = fetchedAccount.state;
  event.eventOption1Stakes = fetchedAccount.option1BalanceCents;
  event.eventOption2Stakes = fetchedAccount.option2BalanceCents;
  event.eventOption3Stakes = fetchedAccount.option3BalanceCents;
  event.eventOption4Stakes = fetchedAccount.option4BalanceCents;
  event.eventOption5Stakes = fetchedAccount.option5BalanceCents;
  event.correctOptionNumber = fetchedAccount.correctOptionNumber;
  return event;
};

const createEventAccount = async (
    event: EventMetadata,
    wallet: Wallet,
) => {
  const provider = await getProvider(wallet);
  const program = new Program(idl as Idl, programID, provider);
  const eventAccount = web3.Keypair.generate();
  try {
    await program.rpc.initializeEvent(
        provider.wallet.publicKey,
        new PublicKey(event.eventVaultPubkey),
        {
          accounts: {
            eventAccount: new PublicKey(eventAccount.publicKey),
            authority: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
          },
          signers: [eventAccount],
        },
    );
    const fetchedEventAccount = await program.account.eventAccount.fetch(
        eventAccount.publicKey) as FetchedEventAccountType;
    event = populateEventMetadataWithFetchedAccount(event, fetchedEventAccount);
    event.eventAccountPublicKeyBase58 = eventAccount.publicKey.toBase58();
    event.eventAccountSecretKeyByteArray = new TextDecoder().decode(
        eventAccount.secretKey);
    return event;
  } catch (err) {
    console.log(err);
  }
};

const setEventStarted = async (event: EventMetadata, wallet: Wallet) => {
  const provider = await getProvider(wallet);
  const program = new Program(idl as Idl, programID, provider);
  const eventAccountPubkey = event.eventAccountPublicKeyBase58;
  if (!eventAccountPubkey) {
    console.log('Invalid event account pubkey');
    return;
  }
  try {
    await program.rpc.setEventStarted(
        {
          accounts: {
            eventAccount: eventAccountPubkey,
            authority: provider.wallet.publicKey,
          },
        },
    );
    const fetchedEventAccount = await program.account.eventAccount.fetch(
        eventAccountPubkey) as FetchedEventAccountType;
    event = populateEventMetadataWithFetchedAccount(event, fetchedEventAccount);
    return event;
  } catch (err) {
    console.log(err);
  }
};

const setEventEnded = async (event: EventMetadata, wallet: Wallet) => {
  const provider = await getProvider(wallet);
  const program = new Program(idl as Idl, programID, provider);
  const eventAccountPubkey = event.eventAccountPublicKeyBase58;
  if (!eventAccountPubkey) {
    console.log('Invalid event account pubkey');
    return;
  }
  try {
    await program.rpc.setEventEnded(
        {
          accounts: {
            eventAccount: eventAccountPubkey,
            authority: provider.wallet.publicKey,
          },
        },
    );
    const fetchedEventAccount = await program.account.eventAccount.fetch(
        eventAccountPubkey) as FetchedEventAccountType;
    console.log(fetchedEventAccount);
    event = populateEventMetadataWithFetchedAccount(event, fetchedEventAccount);
    return event;
  } catch (err) {
    console.log(err);
  }
};

const setEventResolved = async (
    event: EventMetadata,
    wallet: Wallet,
    correctOptionNumber: Number, // is 0-indexed.
) => {
  const provider = await getProvider(wallet);
  const program = new Program(idl as Idl, programID, provider);
  const eventAccountPubkey = event.eventAccountPublicKeyBase58;
  if (!eventAccountPubkey) {
    console.log('Invalid event account pubkey');
    return;
  }
  if (correctOptionNumber >=5 || correctOptionNumber <0) {
    console.log('Invalid correctOptionNumber');
    return;
  }
  try {
    await program.rpc.setEventResolved(
        correctOptionNumber,
        {
          accounts: {
            eventAccount: eventAccountPubkey,
            authority: provider.wallet.publicKey,
          },
        },
    );
    const fetchedEventAccount = await program.account.eventAccount.fetch(
        eventAccountPubkey) as FetchedEventAccountType;
    console.log(fetchedEventAccount);
    event = populateEventMetadataWithFetchedAccount(event, fetchedEventAccount);
    return event;
  } catch (err) {
    console.log(err);
  }
};

const fetchEvent = async (event: EventMetadata, wallet: Wallet) => {
  const provider = await getProvider(wallet);
  const program = new Program(idl as Idl, programID, provider);
  const eventAccountPubkey = event.eventAccountPublicKeyBase58;
  if (!eventAccountPubkey) {
    console.log('Invalid event account pubkey');
    return;
  }
  try {
    const fetchedEventAccount = await program.account.eventAccount.fetch(
        eventAccountPubkey) as FetchedEventAccountType;
    event = populateEventMetadataWithFetchedAccount(event, fetchedEventAccount);
    return event;
  } catch (err) {
    console.log(err);
  }
};

export {
  createEventAccount,
  setEventStarted,
  setEventEnded,
  setEventResolved,
  fetchEvent,
};
