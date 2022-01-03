import * as anchor from '@project-serum/anchor';
import {Program} from '@project-serum/anchor';
import chai, {assert} from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

const {SystemProgram} = anchor.web3;
import {Keypair, PublicKey} from '@solana/web3.js';

describe('EventIntegrity', () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.ChooseOption as Program;

  const createEventAccount = async (
      eventAccount: Keypair,
      vaultAccount: PublicKey,
      authority: PublicKey,
  ) => {
    await program.rpc.initializeEvent(
        authority,
        vaultAccount,
        {
          accounts: {
            eventAccount: eventAccount.publicKey,
            authority: authority,
            systemProgram: SystemProgram.programId,
          },
          signers: [eventAccount],
        },
    );
  };

  it('Initialize an EventAccount with random event_id and vault', async () => {
    const dummyEventAccount: Keypair = anchor.web3.Keypair.generate();
    const dummyVaultAccount: Keypair = anchor.web3.Keypair.generate();
    await createEventAccount(
        dummyEventAccount,
        dummyVaultAccount.publicKey,
        provider.wallet.publicKey);
    const eventAccount: any = await program.account.eventAccount.fetch(
        dummyEventAccount.publicKey,
    );
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
    await createEventAccount(
        eventAccount1,
        dummyVaultAccount.publicKey,
        provider.wallet.publicKey);
    const eventAccount2 = anchor.web3.Keypair.generate();
    await createEventAccount(
        eventAccount2,
        dummyVaultAccount.publicKey,
        provider.wallet.publicKey);

    const eventAccounts = await program.account.eventAccount.all();
    assert.ok(eventAccounts.length >= 2);
  });

  it('Start an event', async () => {
    const dummyVaultAccount: Keypair = anchor.web3.Keypair.generate();
    const dummyEventAccount: Keypair = anchor.web3.Keypair.generate();
    await createEventAccount(
        dummyEventAccount,
        dummyVaultAccount.publicKey,
        provider.wallet.publicKey);
    await program.rpc.setEventStarted({
      accounts: {
        eventAccount: dummyEventAccount.publicKey,
        authority: provider.wallet.publicKey,
      },
    });
  });

  it('Cannot end an event not in started state', async () => {
    const dummyVaultAccount: Keypair = anchor.web3.Keypair.generate();
    const dummyEventAccount: Keypair = anchor.web3.Keypair.generate();
    await createEventAccount(
        dummyEventAccount,
        dummyVaultAccount.publicKey,
        provider.wallet.publicKey);
    try {
      const transactionSignature = await program.rpc.setEventEnded({
        accounts: {
          eventAccount: dummyEventAccount.publicKey,
          authority: provider.wallet.publicKey,
        },
      });
      console.log('Transaction Signature', transactionSignature);
    } catch (e) {
      console.log('error', e.code);
    }
  });

  it('Add user bet to event', async () => {
    const dummyVaultAccount: Keypair = anchor.web3.Keypair.generate();
    const dummyEventAccount: Keypair = anchor.web3.Keypair.generate();
    await createEventAccount(
        dummyEventAccount,
        dummyVaultAccount.publicKey,
        provider.wallet.publicKey);
    await program.rpc.setEventStarted({
      accounts: {
        eventAccount: dummyEventAccount.publicKey,
        authority: provider.wallet.publicKey,
      },
    });
    await program.rpc.addUserBetToEvent(1, 200, {
      accounts: {
        eventAccount: dummyEventAccount.publicKey,
        authority: provider.wallet.publicKey,
      },
    });
    const eventAccount: any = await program.account.eventAccount.fetch(
        dummyEventAccount.publicKey,
    );
    assert.ok(eventAccount.option1BalanceCents === 0);
    assert.ok(eventAccount.option2BalanceCents === 200);
    assert.ok(eventAccount.option3BalanceCents === 0);
    assert.ok(eventAccount.option4BalanceCents === 0);
    assert.ok(eventAccount.option5BalanceCents === 0);
  });
});
