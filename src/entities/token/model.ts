import { useQuery } from '@tanstack/react-query'
import { apiClient, type TokenFilters } from '@/shared/api'

export function useTokens(filters?: TokenFilters) {
  return useQuery({
    queryKey: ['tokens', filters],
    queryFn: () => apiClient.getTokens(filters),
    staleTime: 10000,
  })
}

export function useTokenDetails(address: string | null) {
  return useQuery({
    queryKey: ['token', address],
    queryFn: () => apiClient.getTokenDetails(address!),
    enabled: !!address,
    staleTime: 5000,
  })
}

export function useTrendingTokens() {
  return useQuery({
    queryKey: ['tokens', 'trending'],
    queryFn: () => apiClient.getTrendingTokens(),
    staleTime: 30000,
  })
}
