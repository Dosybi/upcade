import {
  Centrifuge,
  type Subscription,
  type SubscriptionErrorContext,
  type PublicationContext,
} from 'centrifuge'
import type { WebSocketMessage } from './types'
import { config } from '@/shared/config'

export type TradeCallback = (message: WebSocketMessage) => void

class WebSocketClient {
  private centrifuge: Centrifuge | null = null
  private subscriptions: Map<
    string,
    { subscription: Subscription; refCount: number }
  > = new Map()

  connect(token?: string): void {
    if (this.centrifuge) {
      console.log('[WebSocket] Already connected')
      return
    }

    const authToken = token || config.api.wsToken
    const wsUrl = config.api.wsUrl.replace('?format=protobuf', '')

    console.log('[WebSocket] Connecting to:', wsUrl)
    console.log(
      '[WebSocket] Token:',
      authToken ? authToken.substring(0, 20) + '...' : 'none'
    )

    this.centrifuge = new Centrifuge(wsUrl, {
      token: authToken,
    })

    this.centrifuge.on(
      'connected',
      (ctx: { client: string; transport: string }) => {
        console.log('[WebSocket] ✅ Connected!', ctx)
      }
    )

    this.centrifuge.on(
      'disconnected',
      (ctx: { code: number; reason: string }) => {
        console.log('[WebSocket] ❌ Disconnected:', ctx)
      }
    )

    this.centrifuge.on('error', (ctx) => {
      console.error('[WebSocket] ❌ Error:', ctx)
    })

    this.centrifuge.connect()
  }

  disconnect(): void {
    if (this.centrifuge) {
      this.centrifuge.disconnect()
      this.centrifuge = null
      this.subscriptions.clear()
    }
  }

  subscribeToTrades(tokenAddress: string, callback: TradeCallback): () => void {
    if (!this.centrifuge) {
      console.log('[WebSocket] Not connected, connecting now...')
      this.connect()
    }

    const channel = `trades:${tokenAddress}`
    console.log('[WebSocket] 📡 Subscribing to channel:', channel)

    const existingEntry = this.subscriptions.get(channel)

    if (existingEntry) {
      console.log('[WebSocket] ♻️ Reusing existing subscription:', channel)
      existingEntry.refCount++

      existingEntry.subscription.on(
        'publication',
        (ctx: PublicationContext) => {
          try {
            console.log('[WebSocket] 📦 Message received on', channel, ctx.data)
            const message = ctx.data as WebSocketMessage
            callback(message)
          } catch (error) {
            console.error('[WebSocket] ❌ Error processing message:', error)
          }
        }
      )

      return () => {
        existingEntry.refCount--
        console.log(
          '[WebSocket] 🔻 Ref count decreased:',
          channel,
          existingEntry.refCount
        )
        if (existingEntry.refCount <= 0) {
          console.log('[WebSocket] 🔌 Unsubscribing from:', channel)
          existingEntry.subscription.unsubscribe()
          this.centrifuge?.removeSubscription(existingEntry.subscription)
          this.subscriptions.delete(channel)
        }
      }
    }

    console.log('[WebSocket] 🆕 Creating new subscription:', channel)
    const subscription = this.centrifuge!.newSubscription(channel)

    subscription.on('publication', (ctx: PublicationContext) => {
      try {
        console.log('[WebSocket] 📦 Message received on', channel, ctx.data)
        const message = ctx.data as WebSocketMessage
        callback(message)
      } catch (error) {
        console.error('[WebSocket] ❌ Error processing message:', error)
      }
    })

    subscription.on('subscribed', () => {
      console.log('[WebSocket] ✅ Successfully subscribed to:', channel)
    })

    subscription.on('error', (ctx: SubscriptionErrorContext) => {
      console.error('[WebSocket] ❌ Subscription error on', channel, ctx)
    })

    subscription.subscribe()
    this.subscriptions.set(channel, { subscription, refCount: 1 })

    return () => {
      const entry = this.subscriptions.get(channel)
      if (entry) {
        entry.refCount--
        if (entry.refCount <= 0) {
          subscription.unsubscribe()
          this.centrifuge?.removeSubscription(subscription)
          this.subscriptions.delete(channel)
        }
      }
    }
  }

  subscribeToAllTrades(callback: TradeCallback): () => void {
    if (!this.centrifuge) {
      console.log('[WebSocket] Not connected, connecting now...')
      this.connect()
    }

    const channel = 'trades'
    console.log('[WebSocket] 📡 Subscribing to ALL TRADES channel:', channel)

    const existingEntry = this.subscriptions.get(channel)

    if (existingEntry) {
      console.log('[WebSocket] ♻️ Reusing existing subscription:', channel)
      existingEntry.refCount++

      existingEntry.subscription.on(
        'publication',
        (ctx: PublicationContext) => {
          try {
            console.log('[WebSocket] 📦 Message received on', channel, ctx.data)
            const message = ctx.data as WebSocketMessage
            callback(message)
          } catch (error) {
            console.error('[WebSocket] ❌ Error processing message:', error)
          }
        }
      )

      return () => {
        existingEntry.refCount--
        console.log(
          '[WebSocket] 🔻 Ref count decreased:',
          channel,
          existingEntry.refCount
        )
        if (existingEntry.refCount <= 0) {
          console.log('[WebSocket] 🔌 Unsubscribing from:', channel)
          existingEntry.subscription.unsubscribe()
          this.centrifuge?.removeSubscription(existingEntry.subscription)
          this.subscriptions.delete(channel)
        }
      }
    }

    console.log('[WebSocket] 🆕 Creating new subscription:', channel)
    const subscription = this.centrifuge!.newSubscription(channel)

    subscription.on('publication', (ctx: PublicationContext) => {
      try {
        console.log('[WebSocket] 📦 Message received on', channel, ctx.data)
        const message = ctx.data as WebSocketMessage
        callback(message)
      } catch (error) {
        console.error('[WebSocket] ❌ Error processing message:', error)
      }
    })

    subscription.on('subscribed', () => {
      console.log('[WebSocket] ✅ Successfully subscribed to:', channel)
    })

    subscription.on('error', (ctx: SubscriptionErrorContext) => {
      console.error('[WebSocket] ❌ Subscription error on', channel, ctx)
    })

    subscription.subscribe()
    this.subscriptions.set(channel, { subscription, refCount: 1 })

    return () => {
      const entry = this.subscriptions.get(channel)
      if (entry) {
        entry.refCount--
        if (entry.refCount <= 0) {
          subscription.unsubscribe()
          this.centrifuge?.removeSubscription(subscription)
          this.subscriptions.delete(channel)
        }
      }
    }
  }
}

export const wsClient = new WebSocketClient()
