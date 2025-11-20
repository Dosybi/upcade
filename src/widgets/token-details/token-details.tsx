'use client'

import Image from 'next/image'
import { useTokenDetails } from '@/entities/token'
import {
  Card,
  Skeleton,
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui'
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  formatAddress,
} from '@/shared/lib'
import { TrendingUp, TrendingDown, ExternalLink, Copy } from 'lucide-react'
import { TransactionsFeed } from '@/widgets/transactions-feed'

interface TokenDetailsProps {
  tokenAddress: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TokenDetails({
  tokenAddress,
  open,
  onOpenChange,
}: TokenDetailsProps) {
  const { data: token, isLoading } = useTokenDetails(tokenAddress)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto"
      >
        {!tokenAddress ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">Select a Token</h3>
              <p className="text-muted-foreground">
                Choose a token from the list to see detailed information
              </p>
            </div>
          </div>
        ) : isLoading ? (
          <div className="space-y-4 mt-8">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        ) : !token ? (
          <div className="h-full flex items-center justify-center">
            <Card className="p-8 text-center">
              <p className="text-destructive">Failed to load token details</p>
            </Card>
          </div>
        ) : (
          <>
            <SheetHeader className="mb-6">
              <div className="flex items-start gap-4">
                {token.photo ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 relative">
                    <Image
                      src={token.photo}
                      alt={token.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <span className="text-2xl font-bold text-muted-foreground">
                      {token.symbol.slice(0, 2)}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <SheetTitle className="text-2xl">{token.name}</SheetTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>{token.symbol}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:text-foreground"
                      onClick={() => navigator.clipboard.writeText(token.token)}
                      icon={<Copy className="w-3 h-3" />}
                      iconPosition="right"
                    >
                      {formatAddress(token.token)}
                    </Button>
                    <a
                      href={`https://solscan.io/token/${token.token}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </SheetHeader>

            <div className="space-y-6 pb-6">
              <Card className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Price
                    </div>
                    <div className="text-2xl font-bold">
                      {token.priceUsd ? formatCurrency(token.priceUsd) : '—'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Progress
                    </div>
                    <div
                      className={`text-2xl font-bold flex items-center gap-2 ${
                        (token.progress ?? 0) >= 0
                          ? 'text-green-600 dark:text-green-500'
                          : 'text-red-600 dark:text-red-500'
                      }`}
                    >
                      {(token.progress ?? 0) >= 0 ? (
                        <TrendingUp className="w-6 h-6" />
                      ) : (
                        <TrendingDown className="w-6 h-6" />
                      )}
                      {token.progress !== undefined
                        ? formatPercent(token.progress)
                        : '—'}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Market Cap
                    </div>
                    <div className="font-semibold">
                      {token.marketCapUsd
                        ? `$${formatNumber(token.marketCapUsd)}`
                        : '—'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Volume</div>
                    <div className="font-semibold">
                      {token.volumeUsd
                        ? `$${formatNumber(token.volumeUsd)}`
                        : '—'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Price (SOL)
                    </div>
                    <div className="font-semibold">
                      {token.priceSol ? formatNumber(token.priceSol, 8) : '—'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Holders</div>
                    <div className="font-semibold">
                      {token.holders ? formatNumber(token.holders, 0) : '—'}
                    </div>
                  </div>
                </div>

                {token.description && (
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground">
                      {token.description}
                    </p>
                  </div>
                )}
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Quick Trade</h3>
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => alert('Coming soon')}
                  >
                    Buy
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => alert('Coming soon')}
                  >
                    Sell
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Full trading interface coming soon
                </p>
              </Card>

              <div>
                <TransactionsFeed tokenAddress={tokenAddress} />
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
