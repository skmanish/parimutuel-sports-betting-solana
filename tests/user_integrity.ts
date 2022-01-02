import * as anchor from '@project-serum/anchor';
import {Program} from '@project-serum/anchor';
import {assert} from 'chai';

const {SystemProgram} = anchor.web3;
import {Keypair} from '@solana/web3.js';

describe('UserIntegrity', () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.ChooseOption as Program;

  const eventVaultAccount: Keypair = anchor.web3.Keypair.generate();
  const eventAccount: Keypair = anchor.web3.Keypair.generate();

  const userAccount: Keypair = anchor.web3.Keypair.generate();

  before(async () => {
    await program.rpc.initializeEvent(
        provider.wallet.publicKey,
        eventVaultAccount.publicKey,
        {
          accounts: {
            eventAccount: eventAccount.publicKey,
            authority: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
          },
          signers: [eventAccount],
        },
    );
  });

  it('Initialize a UserAccount for given event', async () => {
    await program.rpc.initializeUser(
        provider.wallet.publicKey,
        eventAccount.publicKey, {
          accounts: {
            userAccount: userAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
          },
          signers: [userAccount],
        });
  });

  it('Registers a user choice for a given event', async () => {
    const chosenOption = Math.floor(Math.random() * 5);
    await program.rpc.registerUserChoice(chosenOption, 5, {
      accounts: {
        userAuthority: provider.wallet.publicKey,
        userAccount: userAccount.publicKey,
        eventAccount: eventAccount.publicKey,
      },
    });
    const updatedUserAccount: any = await program.account.userAccount.fetch(
        userAccount.publicKey,
    );
    assert.ok(updatedUserAccount.chosenOption === chosenOption);
    assert.ok(updatedUserAccount.betAmountInSolCents === 5);
  });
});
