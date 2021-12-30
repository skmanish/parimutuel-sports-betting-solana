pub use anchor_lang::prelude::*;
pub use crate::event::*;

#[account]
pub struct UserAccount {
    pub user_authority: Pubkey,
    pub market_reference: Pubkey,
    pub chosen_option: u8,
    pub bet_amount_in_sol_cents: u16,
}

#[derive(Accounts)]
pub struct InitializeUserAccount<'info> {
    #[account(init, payer = user, space = 76)]
    pub user_account: Account<'info, UserAccount>,
    #[account(mut)]
    pub user: Signer<'info>,  // WHY SHOULD THIS BE MUTABLE?
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RegisterUserChoice<'info> {
    pub user_authority: Signer<'info>,

    #[account(mut, has_one = user_authority)]
    pub user_account: Account<'info, UserAccount>,

    #[account(mut)]
    pub event_account: Account<'info, EventAccount>,
}