pub use anchor_lang::prelude::*;
pub use user::*;
pub use event::*;

pub mod user;
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

    pub fn initialize_user(
        ctx: Context<InitializeUserAccount>, 
        authority: Pubkey,
        market_reference: Pubkey,
    ) -> ProgramResult {
        let user_account = &mut ctx.accounts.user_account;
        user_account.user_authority = authority;
        user_account.market_reference = market_reference;
        user_account.chosen_option = std::u8::MAX;
        user_account.bet_amount_in_sol_cents = 0;
        Ok(())
    }

    pub fn register_user_choice(
        ctx: Context<RegisterUserChoice>,
        chosen_option: u8,
        bet_amount_in_sol_cents: u16,
    ) -> ProgramResult {
        let user_account = &mut ctx.accounts.user_account;
        let event_account = &mut ctx.accounts.event_account;

        user_account.chosen_option = chosen_option;
        user_account.bet_amount_in_sol_cents = bet_amount_in_sol_cents;
        Ok(())
    }
}
