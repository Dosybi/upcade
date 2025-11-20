'use client'

import { Button, Card } from '@/shared/ui'
import { TrendingUp, Rocket, User } from 'lucide-react'
import { ThemeToggle } from '@/features/theme-toggle'

export function Sidebar() {
  return (
    <aside className="h-full w-64 border-r border-r-accent bg-card p-6 flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Rocket className="w-8 h-8 text-primary" />
        <span className="text-2xl font-bold">Upcade</span>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <Button
          variant="ghost"
          className="justify-start gap-3 px-4 py-3 h-auto"
          icon={<TrendingUp className="w-5 h-5" />}
        >
          <span className="font-medium">Markets</span>
        </Button>
      </nav>

      <Card className="mt-auto p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">0x1234...5678</div>
            <div className="text-sm text-muted-foreground">Connected</div>
          </div>
        </div>
      </Card>
    </aside>
  )
}
