export interface Token {
  _id: string
  token: string
  name: string
  symbol: string
  description?: string
  photo?: string
  website?: string
  x?: string
  telegram?: string
  creator: string
  createdAt: string
  mint_time: number
  supply: number
  decimals: number
  priceSol?: number
  priceUsd?: number
  price?: number
  marketCapUsd?: number
  progress?: number
  progressSol?: number
  volumeSol?: number
  volumeUsd?: number
  holders?: number
  buys?: number
  sells?: number
  txCount?: number
  isMigrated?: boolean
  isCurrentlyLive?: boolean
  topHoldersPercentage?: number
  topHoldersList?: Array<{
    wallet: string
    amount: number
    percentage: number
  }>
}

export interface Trade {
  id: string
  tokenAddress: string
  type: 'buy' | 'sell'
  amount: number
  price: number
  total: number
  trader: string
  timestamp: number
  txHash?: string
}

export interface Transaction {
  _id: string
  executionPositionKey: string
  txSignature: string
  txIndexInSlot: number
  ixParentIndex: number | null
  ixIndex: number
  ixIsInner: boolean
  ixOrder: number
  tradeId: string
  token: string
  maker: string
  side: number
  lamports: number
  usd: number
  tokens: number
  priceSol: number
  priceUsd: number
  slot: number
  txTimestamp: number
  geyserCreatedAt: string
  balance: number
  createdAt: string
  updatedAt: string
  sol?: number
}

export interface Pool {
  id: string
  tokenAddress: string
  baseToken: string
  quoteToken: string
  liquidity: number
  volume24h: number
  apy?: number
}

export interface TokensResponse {
  tokens: Record<string, Token>
}

export interface TokenFilters {
  sortBy?: 'createdAt' | 'marketCap' | 'volume' | 'holders'
  order?: 'asc' | 'desc'
  search?: string
  limit?: number
  page?: number
  creator?: string
  isMigrated?: boolean
}

export interface WebSocketTradeMessage {
  type: 'trade'
  data: Trade
}

export interface WebSocketPriceMessage {
  type: 'price'
  data: {
    tokenAddress: string
    price: number
    priceChange: number
    timestamp: number
  }
}

export type WebSocketMessage = WebSocketTradeMessage | WebSocketPriceMessage
