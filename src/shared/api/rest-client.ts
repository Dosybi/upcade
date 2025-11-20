import type { TokensResponse, Token, TokenFilters, Transaction } from './types'
import { config } from '@/shared/config'

interface MongooseDoc<T> {
  _doc?: T
  [key: string]: unknown
}

class RestApiClient {
  private baseUrl: string

  constructor(baseUrl: string = config.api.baseUrl) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
    }
  }

  async getTokens(filters?: TokenFilters): Promise<TokensResponse> {
    const body: Record<string, string | number | boolean> = {}

    if (filters?.sortBy) body.sortBy = filters.sortBy
    if (filters?.order) body.order = filters.order
    if (filters?.search) body.search = filters.search
    if (filters?.page) body.page = filters.page
    if (filters?.limit) body.limit = filters.limit
    if (filters?.creator) body.creator = filters.creator
    if (filters?.isMigrated !== undefined) body.isMigrated = filters.isMigrated

    return this.request<TokensResponse>('/tokens', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  async getTokenDetails(address: string): Promise<Token> {
    const response = await this.request<TokensResponse>('/tokens', {
      method: 'POST',
      body: JSON.stringify({ limit: 100 }),
    })

    const token = response.tokens[address]
    if (!token) {
      throw new Error('Token not found')
    }

    return token
  }

  async getTrendingTokens(): Promise<Token[]> {
    return this.request<Token[]>('/tokens/trending')
  }

  async getTransactions(
    tokenAddress: string,
    limit: number = 20
  ): Promise<Transaction[]> {
    const response = await this.request<MongooseDoc<Transaction>[]>('/txs', {
      method: 'POST',
      body: JSON.stringify({ token: tokenAddress, limit }),
    })

    return response.map((item: MongooseDoc<Transaction>) => {
      if (item._doc) {
        return {
          ...item._doc,
          sol: item.sol as number | undefined,
        }
      }
      return item as unknown as Transaction
    })
  }
}

export const apiClient = new RestApiClient()
