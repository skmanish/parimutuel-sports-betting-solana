import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import BN from 'bn.js';
import { assert } from 'chai';

const { SystemProgram } = anchor.web3;
import { PublicKey, Keypair } from '@solana/web3.js';

describe('UserIntegrity', () => {
    const provider = anchor.Provider.env();
    anchor.setProvider(provider);
    const program = anchor.workspace.ChooseOption as Program;

    const event_id: Number = 10;
    const event_vault_account: Keypair = anchor.web3.Keypair.generate();
    const event_account: Keypair = anchor.web3.Keypair.generate();

    const user_account: Keypair = anchor.web3.Keypair.generate();

    before(async () => {
        await program.rpc.initializeEvent(event_id, provider.wallet.publicKey, event_vault_account.publicKey, {
            accounts: {
              eventAccount: event_account.publicKey,
              authority: provider.wallet.publicKey,
              systemProgram: SystemProgram.programId,
            },
            signers: [event_account],
          });
    });

    it('Initialize a UserAccount for given event', async () => {
        await program.rpc.initializeUser({
            accounts: {
                userAccount: user_account.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            },
            signers: [user_account],
        })
	});
});
