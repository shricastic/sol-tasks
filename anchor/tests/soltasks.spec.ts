import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Soltasks} from '../target/types/soltasks'

describe('soltasks', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Soltasks as Program<Soltasks>

  const soltasksKeypair = Keypair.generate()

  it('Initialize Soltasks', async () => {
    await program.methods
      .initialize()
      .accounts({
        soltasks: soltasksKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([soltasksKeypair])
      .rpc()

    const currentCount = await program.account.soltasks.fetch(soltasksKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Soltasks', async () => {
    await program.methods.increment().accounts({ soltasks: soltasksKeypair.publicKey }).rpc()

    const currentCount = await program.account.soltasks.fetch(soltasksKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Soltasks Again', async () => {
    await program.methods.increment().accounts({ soltasks: soltasksKeypair.publicKey }).rpc()

    const currentCount = await program.account.soltasks.fetch(soltasksKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Soltasks', async () => {
    await program.methods.decrement().accounts({ soltasks: soltasksKeypair.publicKey }).rpc()

    const currentCount = await program.account.soltasks.fetch(soltasksKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set soltasks value', async () => {
    await program.methods.set(42).accounts({ soltasks: soltasksKeypair.publicKey }).rpc()

    const currentCount = await program.account.soltasks.fetch(soltasksKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the soltasks account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        soltasks: soltasksKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.soltasks.fetchNullable(soltasksKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
