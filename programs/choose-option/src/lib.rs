pub use anchor_lang::prelude::*;
pub use event::*;

pub mod event;

declare_id!("6zHwdgEhvbYQ7H3Rf3kc3pQSsQcctv89QnoNYQpquVHM");

#[program]
mod choose_option {
    use super::*;

    pub fn initialize_event(
        ctx: Context<InitializeEventAccount>, 
        event_id: u32,
        authority: Pubkey, 
        vault: Pubkey
    ) -> ProgramResult {
        let event_account = &mut ctx.accounts.event_account;
        event_account.event_id = event_id;
        event_account.authority = authority;
        event_account.vault = vault;
        event_account.option_1_balance_cents = 0;
        event_account.option_2_balance_cents = 0;
        event_account.option_3_balance_cents = 0;
        event_account.option_4_balance_cents = 0;
        event_account.option_5_balance_cents = 0;
        event_account.correct_option_number = std::u8::MAX;
        event_account.state = 0;
        Ok(())
    }

    pub fn set_event_started(ctx: Context<StartEvent>) -> ProgramResult {
        let event_account = &mut ctx.accounts.event_account;
        event_account.option_1_balance_cents = 0;
        event_account.option_2_balance_cents = 0;
        event_account.option_3_balance_cents = 0;
        event_account.option_4_balance_cents = 0;
        event_account.option_5_balance_cents = 0;
        event_account.correct_option_number = std::u8::MAX;
        event_account.state = 1;
        Ok(())
    }

    pub fn set_event_ended(ctx: Context<EndEvent>) -> ProgramResult {
        let event_account = &mut ctx.accounts.event_account;
        event_account.correct_option_number = std::u8::MAX;
        event_account.state = 2;
        Ok(())
    }
}
