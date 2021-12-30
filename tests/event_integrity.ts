import * as anchor from '@project-serum/anchor';
import {Program} from '@project-serum/anchor';
import chai, {assert, expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

const {SystemProgram} = anchor.web3;
import {Keypair, PublicKey} from '@solana/web3.js';

describe('EventIntegrity', () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.ChooseOption as Program;

  const createEventAccount = async (
      eventId: Number, eventAccount: Keypair, vaultAccount: PublicKey) => {
    await program.rpc.initializeEvent(
        eventId,
        provider.wallet.publicKey,
        vaultAccount,
        {
          accounts: {
            eventAccount: eventAccount.publicKey,
            authority: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
          },
          signers: [eventAccount],
        },
    );
  };
  it('Initialize an EventAccount with random event_id and vault', async () => {
    const dummyEventAccount: Keypair = anchor.web3.Keypair.generate();
    const dummyVaultAccount: Keypair = anchor.web3.Keypair.generate();
    // Returns a random integer from 0 to 99:
    const randomEventId = Math.floor(Math.random() * 100);
    await createEventAccount(
        randomEventId,
        dummyEventAccount,
        dummyVaultAccount.publicKey);
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

  it('Initialize multiple EventAccount and fetch', async () => {
    const dummyVaultAccount: Keypair = anchor.web3.Keypair.generate();

    const eventAccount1 = anchor.web3.Keypair.generate();
    await createEventAccount(1, eventAccount1, dummyVaultAccount.publicKey);
    const eventAccount2 = anchor.web3.Keypair.generate();
    await createEventAccount(2, eventAccount2, dummyVaultAccount.publicKey);

    const eventAccounts = await program.account.eventAccount.all();
    assert.ok(eventAccounts.length >= 2);
  });
});
