use anchor_lang::prelude::*;

declare_id!("6zHwdgEhvbYQ7H3Rf3kc3pQSsQcctv89QnoNYQpquVHM");

#[program]
mod choose_option {
    use super::*;

    pub fn initialize_event(
        ctx: Context<InitializeEventAccount>, 
        event_id: u32, 
        vault: Pubkey
    ) -> ProgramResult {
        let event_account = &mut ctx.accounts.event_account;
        event_account.event_id = event_id;
        event_account.vault = vault;
        Ok(())
    }

    pub fn initialize(ctx: Context<Initialize>, data: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        let copy = data.clone();
        base_account.data = data;
        base_account.data_list.push(copy);
        Ok(())
    }

    pub fn update(ctx: Context<Update>, data: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        let copy = data.clone();
        base_account.data = data;
        base_account.data_list.push(copy);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 64 + 64)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

#[account]
pub struct BaseAccount {
    pub data: String,
    pub data_list: Vec<String>,
}

#[account]
pub struct EventAccount {
    pub event_id: u32,
    pub vault: Pubkey,

    // Event State must be oneof {CREATED, OPEN, CLOSED, RESOLVED}.
    pub state: String,  

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
    #[account(init, payer = admin, space = 75)]
    pub event_account: Account<'info, EventAccount>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}
