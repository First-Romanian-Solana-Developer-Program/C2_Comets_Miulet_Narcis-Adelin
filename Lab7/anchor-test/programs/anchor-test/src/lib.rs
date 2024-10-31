use anchor_lang::prelude::*;

declare_id!("8xUEeZAJdqF9qb5WAjutEVHwBdvHh3aHLB8HDoXh7YPN");

#[program]
pub mod anchor_test {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
