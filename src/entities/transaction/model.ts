import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/api'

export function useTransactions(
  tokenAddress: string | null,
  limit: number = 20
) {
  return useQuery({
    queryKey: ['transactions', tokenAddress, limit],
    queryFn: () => apiClient.getTransactions(tokenAddress!, limit),
    enabled: !!tokenAddress,
    refetchInterval: 10000,
    staleTime: 5000,
  })
}
