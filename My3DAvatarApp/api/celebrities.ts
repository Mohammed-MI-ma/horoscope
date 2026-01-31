import { ENV } from "@/config/env";

// src/api/celebrities.ts
export async function fetchFeaturedZodiacCelebrities() {
  // Simulate delay (e.g., 500ms)
  console.log( "popopop"+`${ENV.API_CELEBRITIES_URL}/celebrities/zodiac/featured`)
  const response = await fetch(
    `${ENV.API_CELEBRITIES_URL}/celebrities/zodiac/featured`
  );
  console.log("a777",response)
  if (!response.ok) {
    throw new Error("Failed to fetch featured zodiac celebrities");
  }

  const json = await response.json();

  // IMPORTANT: return the actual data, not the wrapper
  return json.data;
}
