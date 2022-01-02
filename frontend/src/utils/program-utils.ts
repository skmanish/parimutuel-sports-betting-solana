import {Program, Wallet, Idl, web3} from '@project-serum/anchor';

import {EventMetadata} from '../types/event';
import {getProvider} from './anchor-utils';
import idl from '../idl.json';
import {PublicKey, SystemProgram} from '@solana/web3.js';

const programID = new PublicKey(idl.metadata.address);

const createEventAccount = async (
    event: EventMetadata,
    wallet: Wallet,
) => {
  console.log('In createEventAccount');
  const provider = await getProvider(wallet);
  const program = new Program(idl as Idl, programID, provider);
  const eventAccount = web3.Keypair.generate();
  const existingEventAccounts = await program.account.eventAccount.all();
  console.log('Existing eventAccounts: ', existingEventAccounts);

  try {
    const transactionSignature = await program.rpc.initializeEvent(
        10,
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
    return {
      transactionSignature: transactionSignature,
      eventAccount: eventAccount,
    };
  } catch (err) {
    console.log(err);
  }
};

export {createEventAccount};
