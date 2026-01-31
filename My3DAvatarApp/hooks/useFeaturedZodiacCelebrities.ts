// src/hooks/useFeaturedZodiacCelebrities.ts
import { fetchFeaturedZodiacCelebrities } from "@/api/celebrities";
import { useQuery } from "@tanstack/react-query";

export function useFeaturedZodiacCelebrities() {
  return useQuery({
  queryKey: ["featured-zodiac-celebrities"],
  queryFn: fetchFeaturedZodiacCelebrities,
  retry: 3,
  retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
  staleTime: 0,
  refetchOnMount: true,
  refetchOnReconnect: true,
});

}
