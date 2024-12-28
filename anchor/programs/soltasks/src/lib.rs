#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod soltasks {
    use super::*;

  pub fn close(_ctx: Context<CloseSoltasks>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.soltasks.count = ctx.accounts.soltasks.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.soltasks.count = ctx.accounts.soltasks.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeSoltasks>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.soltasks.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeSoltasks<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Soltasks::INIT_SPACE,
  payer = payer
  )]
  pub soltasks: Account<'info, Soltasks>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseSoltasks<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub soltasks: Account<'info, Soltasks>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub soltasks: Account<'info, Soltasks>,
}

#[account]
#[derive(InitSpace)]
pub struct Soltasks {
  count: u8,
}
