#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("9MyAxBXoj6kMv1jtfzjGGoL9RCvtNLgGbjDLPnpjXxFx");

#[program]
pub mod soltasks {
    use super::*;

    pub fn create_todo(ctx: Context<CreateTodo>, task: String, desc: String) -> Result<()>{
        let todo = &mut ctx.accounts.todo;
        todo.owner = ctx.accounts.owner.key();
        todo.task = task; 
        todo.desc = desc;
        todo.done = false;
        todo.task_id = Clock::get()?.unix_timestamp as u64;

        Ok(())
    }

    pub fn update_todo(ctx: Context<UpdateTodo>, _task:String) -> Result<()> {
        let todo = &mut ctx.accounts.todo;
        todo.done = true;

        Ok(())
    }

    pub fn delete_todo(_ctx: Context<DeleteTodo>, _task: String) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(task: String, desc: String)]
pub struct CreateTodo<'info> {
    #[account(
        init,
        payer = owner, 
        space = 8 + TodoState::INIT_SPACE,
        seeds = [task.as_bytes(), owner.key().as_ref()],
        bump
    )]
    pub todo: Account<'info, TodoState>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
#[instruction(task: String)]
pub struct UpdateTodo<'info> {
    #[account(
        mut,
        seeds = [task.as_bytes(), owner.key().as_ref()],
        bump
    )]
    pub todo: Account<'info, TodoState>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
#[instruction(task: String)]
pub struct DeleteTodo<'info> {
    #[account(
        mut,
        seeds = [task.as_bytes(), owner.key().as_ref()],
        close = owner,
        bump
    )]
    pub todo: Account<'info, TodoState>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>
}

#[account]
#[derive(InitSpace)]
pub struct TodoState{
    pub owner: Pubkey,

    #[max_len(20)]
    pub task: String,

    #[max_len(100)]
    pub desc: String,

    pub done: bool,

    pub task_id: u64
}
