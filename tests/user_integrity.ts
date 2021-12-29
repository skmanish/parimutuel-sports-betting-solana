import * as anchor from '@project-serum/anchor';
import {Program} from '@project-serum/anchor';

const {SystemProgram} = anchor.web3;
import {Keypair} from '@solana/web3.js';

describe('UserIntegrity', () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.ChooseOption as Program;

  const eventId: Number = 10;
  const eventVaultAccount: Keypair = anchor.web3.Keypair.generate();
  const eventAccount: Keypair = anchor.web3.Keypair.generate();

  const userAccount: Keypair = anchor.web3.Keypair.generate();

  before(async () => {
    await program.rpc.initializeEvent(
        eventId,
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
    await program.rpc.initializeUser({
      accounts: {
        userAccount: userAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [userAccount],
    });
  });
});
