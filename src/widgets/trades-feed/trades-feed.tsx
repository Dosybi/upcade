'use client'

import { useTradesFeed } from '@/entities/trade'
import { Card } from '@/shared/ui'
import { formatCurrency, formatTimestamp, formatAddress } from '@/shared/lib'
import { Activity } from 'lucide-react'

interface TradesFeedProps {
  tokenAddress?: string
}

export function TradesFeed({ tokenAddress }: TradesFeedProps) {
  const { trades } = useTradesFeed(tokenAddress)

  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Live Trades</h3>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {trades.length} trades
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {trades.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium mb-1">Waiting for trades...</p>
            <p className="text-xs">
              {tokenAddress
                ? 'Live trades will appear here when transactions occur'
                : 'Select a token to see its live trades'}
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {trades.map((trade) => (
              <div
                key={trade.id}
                className={`p-3 rounded-lg border transition-colors ${
                  trade.type === 'buy'
                    ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900'
                    : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-semibold text-sm ${
                      trade.type === 'buy'
                        ? 'text-green-600 dark:text-green-500'
                        : 'text-red-600 dark:text-red-500'
                    }`}
                  >
                    {trade.type.toUpperCase()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(trade.timestamp)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {formatAddress(trade.trader)}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(trade.total)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {trade.amount.toFixed(4)} @ {formatCurrency(trade.price)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
