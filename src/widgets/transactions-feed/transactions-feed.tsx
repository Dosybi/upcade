'use client'

import { useTransactions } from '@/entities/transaction'
import { Card, Skeleton } from '@/shared/ui'
import { formatCurrency, formatTimestamp, formatAddress } from '@/shared/lib'
import { ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react'

interface TransactionsFeedProps {
  tokenAddress: string | null
}

export function TransactionsFeed({ tokenAddress }: TransactionsFeedProps) {
  const { data: transactions, isLoading } = useTransactions(tokenAddress, 20)

  if (!tokenAddress) {
    return (
      <Card className="h-full flex items-center justify-center p-6">
        <p className="text-muted-foreground text-center">
          Select a token to see its transactions
        </p>
      </Card>
    )
  }

  return (
    <Card className="h-full flex flex-col">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <ArrowUpRight className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Recent Transactions</h3>
          {transactions && (
            <span className="ml-auto text-xs text-muted-foreground">
              {transactions.length} txs
            </span>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 space-y-2">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : !transactions || transactions.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            <ArrowUpRight className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium mb-1">No transactions yet</p>
            <p className="text-xs">
              Transactions will appear here when trading occurs
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {transactions.map((tx) => {
              const isBuy = tx.side === 1
              return (
                <div
                  key={tx._id}
                  className={`p-3 rounded-lg border transition-colors ${
                    isBuy
                      ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900'
                      : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {isBuy ? (
                        <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-600 dark:text-red-500" />
                      )}
                      <span
                        className={`font-semibold text-sm ${
                          isBuy
                            ? 'text-green-600 dark:text-green-500'
                            : 'text-red-600 dark:text-red-500'
                        }`}
                      >
                        {isBuy ? 'Buy' : 'Sell'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(tx.txTimestamp)}
                      </span>
                      <a
                        href={`https://solscan.io/tx/${tx.txSignature}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">
                      {formatAddress(tx.maker)}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(tx.usd)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{tx.tokens.toLocaleString()} tokens</span>
                    <span>@ {formatCurrency(tx.priceUsd)}</span>
                  </div>
                  {tx.sol && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {tx.sol.toFixed(4)} SOL
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Card>
  )
}
