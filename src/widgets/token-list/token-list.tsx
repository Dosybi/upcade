'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTokens } from '@/entities/token'
import { Card, Skeleton, Input } from '@/shared/ui'
import { formatCurrency, formatNumber } from '@/shared/lib'
import { TrendingUp, TrendingDown, Search } from 'lucide-react'

interface TokenListProps {
  onSelectToken?: (address: string) => void
}

export function TokenList({ onSelectToken }: TokenListProps) {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const { data, isLoading, error } = useTokens({
    sortBy: 'marketCap',
    order: 'desc',
  })

  const handleSelect = (address: string) => {
    setSelectedAddress(address)
    onSelectToken?.(address)
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="p-6 text-center">
          <p className="text-destructive">Failed to load tokens</p>
          <p className="text-sm text-muted-foreground mt-2">{String(error)}</p>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    )
  }

  const filteredTokens = Object.values(data?.tokens || {}).filter((token) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      token.name.toLowerCase().includes(query) ||
      token.symbol.toLowerCase().includes(query) ||
      token.token.toLowerCase().includes(query)
    )
  })

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Top Tokens</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="space-y-2 token-list-container">
          {filteredTokens.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                No tokens found matching &quot;{searchQuery}&quot;
              </p>
            </Card>
          ) : (
            filteredTokens.map((token) => (
              <Card
                key={token._id}
                className={`token-card p-4 cursor-pointer transition-all ${
                  selectedAddress === token.token
                    ? 'ring-2 ring-ring token-card-selected'
                    : ''
                }`}
                onClick={() => handleSelect(token.token)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {token.photo ? (
                      <div className="token-image w-12 h-12 rounded-full overflow-hidden relative">
                        <Image
                          src={token.photo}
                          alt={token.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      <div className="token-image w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xl font-bold text-muted-foreground">
                          {token.symbol.slice(0, 2)}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="font-semibold token-name">
                        {token.name}
                      </div>
                      <div className="text-sm text-muted-foreground token-symbol">
                        {token.symbol}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold token-price">
                      {token.priceUsd ? formatCurrency(token.priceUsd) : '—'}
                    </div>
                    {token.progress !== undefined && (
                      <div
                        className={`text-sm flex items-center gap-1 justify-end token-change ${
                          token.progress >= 75
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {token.progress >= 75 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {token.progress.toFixed(1)}%
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="opacity-70">MCap:</span>{' '}
                    {token.marketCapUsd
                      ? `$${formatNumber(token.marketCapUsd)}`
                      : '—'}
                  </div>
                  <div>
                    <span className="opacity-70">Vol:</span>{' '}
                    {token.volumeUsd
                      ? `$${formatNumber(token.volumeUsd)}`
                      : '—'}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
