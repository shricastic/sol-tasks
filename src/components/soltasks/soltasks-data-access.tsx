'use client'

import { getSoltasksProgram, getSoltasksProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useSoltasksProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getSoltasksProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getSoltasksProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['soltasks', 'all', { cluster }],
    queryFn: () => program.account.soltasks.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['soltasks', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ soltasks: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useSoltasksProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useSoltasksProgram()

  const accountQuery = useQuery({
    queryKey: ['soltasks', 'fetch', { cluster, account }],
    queryFn: () => program.account.soltasks.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['soltasks', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ soltasks: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['soltasks', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ soltasks: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['soltasks', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ soltasks: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['soltasks', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ soltasks: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
