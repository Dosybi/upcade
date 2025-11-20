import { useState, useEffect } from 'react'
import { wsClient, type Trade, type WebSocketMessage } from '@/shared/api'

export function useTradesFeed(tokenAddress?: string) {
  const [trades, setTrades] = useState<Trade[]>([])

  useEffect(() => {
    console.log('[TradesFeed] Subscribing to:', tokenAddress || 'all trades')

    const handleMessage = (message: WebSocketMessage) => {
      console.log('[TradesFeed] Received message:', message)
      if (message.type === 'trade') {
        setTrades((prev) => [message.data, ...prev].slice(0, 50))
      }
    }

    const unsubscribe = tokenAddress
      ? wsClient.subscribeToTrades(tokenAddress, handleMessage)
      : wsClient.subscribeToAllTrades(handleMessage)

    return () => {
      console.log(
        '[TradesFeed] Unsubscribing from:',
        tokenAddress || 'all trades'
      )
      unsubscribe()
    }
  }, [tokenAddress])

  return { trades }
}
