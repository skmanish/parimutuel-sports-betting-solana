use anchor_lang::prelude::*;
pub use crate::errors::ErrorCode;


// IF YOU CHANGE THIS, PLEASE ALSO CHANGE in frontend/types/events.ts.
#[account]
pub struct EventAccount {
    pub authority: Pubkey,
    pub vault: Pubkey,

    // Event State must be oneof 
    // 0: CREATED,
    // 1: STARTED,
    // 2: ENDED, 
    // 3: RESOLVED,
    pub state: u8,  

    // Balance in cents means SOL*100. So, 0.1 SOL means 10 SOL cents.
    pub option_1_balance_cents: u32,
    pub option_2_balance_cents: u32,
    pub option_3_balance_cents: u32,
    pub option_4_balance_cents: u32,
    pub option_5_balance_cents: u32,

    // This field is meaningfully set only after event is finished.
    pub correct_option_number: u8,
}

#[derive(Accounts)]
pub struct InitializeEventAccount<'info> {
    #[account(init, payer = authority, space = 110)]
    pub event_account: Account<'info, EventAccount>,
    pub authority: Signer<'info>,  // WHY SHOULD THIS BE MUTABLE?
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct StartEvent<'info> {
    pub authority: Signer<'info>,
    #[account(mut, has_one = authority, constraint={
        event_account.state == 0
    } @ ErrorCode::CannotStartEventNotInCreatedState)]
    pub event_account: Account<'info, EventAccount>,
}

#[derive(Accounts)]
pub struct EndEvent<'info> {
    pub authority: Signer<'info>,
    #[account(mut, has_one = authority, constraint={
        event_account.state == 1
    } @ ErrorCode::CannotEndEventNotInStartState)]
    pub event_account: Account<'info, EventAccount>,
}

#[derive(Accounts)]
pub struct ResolveEvent<'info> {
    pub authority: Signer<'info>,
    #[account(mut, has_one = authority, constraint={
        event_account.state == 2
    } @ ErrorCode::CannotResolveEventNotInEndedState)]
    pub event_account: Account<'info, EventAccount>,
}
