import React from 'react'
import { shorten } from '../utils/format'

export default function ConnectButton({ account, onConnect }) {
  return (
    <button onClick={onConnect} className="rounded-xl border border-white/10 px-4 py-2 hover:border-web3-accent/50">
      {account ? `Connected: ${shorten(account)}` : 'Connect MetaMask'}
    </button>
  )
}