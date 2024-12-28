// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import SoltasksIDL from '../target/idl/soltasks.json'
import type { Soltasks } from '../target/types/soltasks'

// Re-export the generated IDL and type
export { Soltasks, SoltasksIDL }

// The programId is imported from the program IDL.
export const SOLTASKS_PROGRAM_ID = new PublicKey(SoltasksIDL.address)

// This is a helper function to get the Soltasks Anchor program.
export function getSoltasksProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...SoltasksIDL, address: address ? address.toBase58() : SoltasksIDL.address } as Soltasks, provider)
}

// This is a helper function to get the program ID for the Soltasks program depending on the cluster.
export function getSoltasksProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Soltasks program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return SOLTASKS_PROGRAM_ID
  }
}
