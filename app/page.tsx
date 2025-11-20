'use client'

import { useState } from 'react'
import { Sidebar } from '@/widgets/sidebar'
import { TokenList } from '@/widgets/token-list'
import { TokenDetails } from '@/widgets/token-details'
import { MobileNavigation } from '@/widgets/mobile-navigation'

export default function Home() {
  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [mobileTab, setMobileTab] = useState<'markets' | 'trade' | 'portfolio'>(
    'markets'
  )

  const handleSelectToken = (address: string | null) => {
    setSelectedToken(address)
    if (address) {
      setSheetOpen(true)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="hidden md:flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-hidden">
          <TokenList onSelectToken={handleSelectToken} />
        </div>
      </div>

      <div className="md:hidden flex-1 overflow-hidden">
        {mobileTab === 'markets' && (
          <TokenList onSelectToken={handleSelectToken} />
        )}
        {mobileTab === 'trade' && (
          <div className="h-full flex items-center justify-center p-6">
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Trading</h3>
              <p className="text-muted-foreground">
                Select a token to start trading
              </p>
            </div>
          </div>
        )}
        {mobileTab === 'portfolio' && (
          <div className="h-full flex items-center justify-center p-6">
            <div className="text-center">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2">Portfolio</h3>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </div>
        )}
      </div>

      <MobileNavigation activeTab={mobileTab} onTabChange={setMobileTab} />

      <TokenDetails
        tokenAddress={selectedToken}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  )
}
