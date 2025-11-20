'use client'

import { TrendingUp, DollarSign, User } from 'lucide-react'
import { Button } from '@/shared/ui'

interface MobileNavigationProps {
  activeTab: 'markets' | 'trade' | 'portfolio'
  onTabChange: (tab: 'markets' | 'trade' | 'portfolio') => void
}

export function MobileNavigation({
  activeTab,
  onTabChange,
}: MobileNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t safe-area-inset-bottom md:hidden">
      <div className="flex items-center justify-around h-16">
        <Button
          variant="ghost"
          onClick={() => onTabChange('markets')}
          className={`flex flex-col items-center justify-center flex-1 h-full rounded-none ${
            activeTab === 'markets' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <TrendingUp className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Markets</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => onTabChange('trade')}
          className={`flex flex-col items-center justify-center flex-1 h-full rounded-none ${
            activeTab === 'trade' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <DollarSign className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Trade</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => onTabChange('portfolio')}
          className={`flex flex-col items-center justify-center flex-1 h-full rounded-none ${
            activeTab === 'portfolio' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <User className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Portfolio</span>
        </Button>
      </div>
    </nav>
  )
}
