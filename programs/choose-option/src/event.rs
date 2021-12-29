use anchor_lang::prelude::*;

#[account]
pub struct EventAccount {
    pub event_id: u32,
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
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct StartEvent<'info> {
    pub authority: Signer<'info>,
    #[account(mut, has_one = authority)]
    pub event_account: Account<'info, EventAccount>,
}

#[derive(Accounts)]
pub struct EndEvent<'info> {
    pub authority: Signer<'info>,
    #[account(mut, has_one = authority)]
    pub event_account: Account<'info, EventAccount>,
}
