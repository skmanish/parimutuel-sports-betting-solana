const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SendTransactionError, SystemProgram } = anchor.web3;

describe("ChooseOption", () => {
  let _baseAccount;
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  it("It initializes the account", async () => {
    const program = anchor.workspace.ChooseOption;
    const baseAccount = anchor.web3.Keypair.generate();
    await program.rpc.initialize("Hello World", {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Data: ', account.data);
    assert.ok(account.data === "Hello World");
    _baseAccount = baseAccount;

  });

  it("Updates a previously created account", async () => {
    const baseAccount = _baseAccount;
    const program = anchor.workspace.ChooseOption;

    await program.rpc.update("Some new data", {
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });
  
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Updated data: ', account.data)
    assert.ok(account.data === "Some new data");
    console.log('all account data:', account)
    console.log('All data: ', account.dataList);
    assert.ok(account.dataList.length === 2);
  });

  // EventAccount Instructions.
  it("Initialize an EventAccount with random event_id and vault", async () => {
    const program = anchor.workspace.ChooseOption;
    const dummyEventAccount = anchor.web3.Keypair.generate();
    const dummyVaultAccount = anchor.web3.Keypair.generate();
    // Returns a random integer from 0 to 99:
    const randomEventId = Math.floor(Math.random() * 100);
    await program.rpc.initializeEvent(randomEventId, provider.wallet.publicKey, dummyVaultAccount.publicKey, {
      accounts: {
        eventAccount: dummyEventAccount.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [dummyEventAccount],
    });
    const eventAccount = await program.account.eventAccount.fetch(dummyEventAccount.publicKey);
    assert.ok(eventAccount.eventId === randomEventId);
    assert.ok(eventAccount.option1BalanceCents === 0);
    assert.ok(eventAccount.option2BalanceCents === 0);
    assert.ok(eventAccount.option3BalanceCents === 0);
    assert.ok(eventAccount.option4BalanceCents === 0);
    assert.ok(eventAccount.option5BalanceCents === 0);
    assert.deepStrictEqual(eventAccount.authority, provider.wallet.publicKey);
    assert.deepStrictEqual(eventAccount.vault, dummyVaultAccount.publicKey);
  });
  it("Initialize an EventAccount with pre-existing event_id should fail", async () => {
    const program = anchor.workspace.ChooseOption;
    const dummyEventAccount = anchor.web3.Keypair.generate();
    const dummyVaultAccount = anchor.web3.Keypair.generate();
    const randomEventId = 5;

    const initializeEvent = async () => {
      await program.rpc.initializeEvent(randomEventId, provider.wallet.publicKey, dummyVaultAccount.publicKey, {
        accounts: {
          eventAccount: dummyEventAccount.publicKey,
          authority: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [dummyEventAccount],
      });
      return await program.account.eventAccount.fetch(dummyEventAccount.publicKey);
    }
    await initializeEvent();
    await assert.rejects(initializeEvent, SendTransactionError)
  });
});


// For a UserAccount, implement JoinEvent, ChooseOption
// Alongside ChooseOption instruction, EventAccount should also be touched