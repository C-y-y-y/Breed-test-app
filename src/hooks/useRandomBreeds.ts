import { useQuery } from '@tanstack/react-query'
import { getBreeds } from '@/api/breeds'

export function useRandomBreeds(limit = 10, query?: string) {
  return useQuery({
    queryKey: ['randomBreeds', limit, query],
    queryFn: () => getBreeds(limit, query),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10
  })
}
