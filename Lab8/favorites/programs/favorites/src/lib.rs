use anchor_lang::prelude::*;

declare_id!("Cvf5sVrU4mUGzfMgrhceuh2VMwxGDfU2zxSGbUWtt4dq");

pub const ANCHOR_DISCRIMINATOR_SIZE: usize = 8; // fiecare program are un discriminator de 8 bytes pentru ca anchor sa stie care program este care

#[program]
pub mod favorites {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn set_favorites(
        ctx: Context<SetFavorites>,
        number: u64,
        color: String,
        hobbies: Vec<String>,
    ) -> Result<()> {
        msg!(
            "Greetings from: {:?}, inside {:?}",
            ctx.accounts.user.key(),
            ctx.program_id
        );
        msg!(
            "User number is {:?} and favorite color is {:?}",
            number,
            color
        );
        msg!("User's hobbies are {:?}", hobbies);

        ctx.accounts.favorites.set_inner(Favorites {
            number,
            color,
            hobbies,
        });
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct SetFavorites<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(init,
        payer = user,
        space = ANCHOR_DISCRIMINATOR_SIZE + Favorites::INIT_SPACE,
        seeds = [b"favorites",user.key().as_ref()],
        bump
    )]
    pub favorites: Account<'info, Favorites>,

    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct Favorites {
    pub number: u64,

    #[max_len(50)]
    pub color: String, // pub color: [u8; 50],

    #[max_len(5, 50)]
    pub hobbies: Vec<String>, // pub hobbies: [String, 5]
}
