import * as anchor from '@project-serum/anchor';
import {Program} from '@project-serum/anchor';
import chai, {assert, expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

const {SystemProgram} = anchor.web3;
import {Keypair, SendTransactionError} from '@solana/web3.js';

describe('EventIntegrity', () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.ChooseOption as Program;

  it('Initialize an EventAccount with random event_id and vault', async () => {
    const dummyEventAccount: Keypair = anchor.web3.Keypair.generate();
    const dummyVaultAccount: Keypair = anchor.web3.Keypair.generate();
    // Returns a random integer from 0 to 99:
    const randomEventId = Math.floor(Math.random() * 100);

    await program.rpc.initializeEvent(
        randomEventId,
        provider.wallet.publicKey,
        dummyVaultAccount.publicKey,
        {
          accounts: {
            eventAccount: dummyEventAccount.publicKey,
            authority: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
          },
          signers: [dummyEventAccount],
        },
    );
    const eventAccount: any = await program.account.eventAccount.fetch(
        dummyEventAccount.publicKey,
    );
    assert.ok(eventAccount.eventId === randomEventId);
    assert.ok(eventAccount.option1BalanceCents === 0);
    assert.ok(eventAccount.option2BalanceCents === 0);
    assert.ok(eventAccount.option3BalanceCents === 0);
    assert.ok(eventAccount.option4BalanceCents === 0);
    assert.ok(eventAccount.option5BalanceCents === 0);
    assert.deepStrictEqual(eventAccount.authority, provider.wallet.publicKey);
    assert.deepStrictEqual(eventAccount.vault, dummyVaultAccount.publicKey);
  });

  it('Initialize an EventAccount with pre-existing event_id should fail',
      async () => {
        const program = anchor.workspace.ChooseOption;
        const dummyEventAccount = anchor.web3.Keypair.generate();
        const dummyVaultAccount = anchor.web3.Keypair.generate();
        const randomEventId = 5;

        const initializeEvent = async () => {
          await program.rpc.initializeEvent(
              randomEventId,
              provider.wallet.publicKey,
              dummyVaultAccount.publicKey,
              {
                accounts: {
                  eventAccount: dummyEventAccount.publicKey,
                  authority: provider.wallet.publicKey,
                  systemProgram: SystemProgram.programId,
                },
                signers: [dummyEventAccount],
              },
          );
          return await program.account.eventAccount.fetch(
              dummyEventAccount.publicKey,
          );
        };
        await initializeEvent();
        try {
          await initializeEvent();
        } catch (e) {
          const error = e as SendTransactionError;
          expect(error.toString()).to.include(
              'This transaction has already been processed',
          );
        }
      });
});
