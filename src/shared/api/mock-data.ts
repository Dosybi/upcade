import type { Token, TokensResponse } from './types'

const now = Date.now()

export const MOCK_TOKENS: Token[] = [
  {
    _id: '1',
    token: 'So11111111111111111111111111111111111111112',
    name: 'Wrapped SOL',
    symbol: 'SOL',
    description: 'Wrapped Solana token',
    photo:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    creator: 'creator1111111111111111111111111111111111',
    createdAt: new Date(now - 86400000 * 30).toISOString(),
    mint_time: now - 86400000 * 30,
    supply: 500000000000000,
    decimals: 9,
    marketCapUsd: 42000000000,
    priceUsd: 180.5,
    price: 180.5,
    priceSol: 1,
    volumeUsd: 1200000000,
    holders: 125000,
    buys: 5200,
    sells: 2100,
    txCount: 7300,
    progress: 100,
    isMigrated: true,
  },
  {
    _id: '2',
    token: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    name: 'USD Coin',
    symbol: 'USDC',
    description: 'Stablecoin pegged to USD',
    photo:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    creator: 'creator2222222222222222222222222222222222',
    createdAt: new Date(now - 86400000 * 60).toISOString(),
    mint_time: now - 86400000 * 60,
    supply: 28000000000000,
    decimals: 6,
    marketCapUsd: 28000000000,
    priceUsd: 1.0,
    price: 1.0,
    priceSol: 0.0055,
    volumeUsd: 890000000,
    holders: 98000,
    buys: 4100,
    sells: 1800,
    txCount: 5900,
    progress: 100,
    isMigrated: true,
  },
  {
    _id: '3',
    token: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    name: 'Bonk',
    symbol: 'BONK',
    description: 'The first Solana dog coin for the people, by the people',
    photo:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png',
    creator: 'creator3333333333333333333333333333333333',
    createdAt: new Date(now - 86400000 * 90).toISOString(),
    mint_time: now - 86400000 * 90,
    supply: 100000000000000000,
    decimals: 5,
    marketCapUsd: 850000000,
    priceUsd: 0.000012,
    price: 0.000012,
    priceSol: 0.000000066,
    volumeUsd: 45000000,
    holders: 45000,
    buys: 3200,
    sells: 1400,
    txCount: 4600,
    progress: 85,
    isMigrated: false,
  },
]

export function getMockTokens(): TokensResponse {
  const tokensRecord: Record<string, Token> = {}
  MOCK_TOKENS.forEach((token) => {
    tokensRecord[token.token] = token
  })

  return {
    tokens: tokensRecord,
  }
}

export function getMockToken(address: string): Token | undefined {
  return MOCK_TOKENS.find((t) => t.token === address)
}
