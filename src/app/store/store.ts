// store.ts
/**
 * This file contains the global state management for the CryptoTrack application using Zustand.
 * Zustand is a small, fast and scalable state management solution that uses simplified flux principles.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Represents the structure of a cryptocurrency price data.
 * This is the format we transform the API response into for consistent usage.
 */
type CryptoPrice = {
  id: string;      // Unique identifier for the cryptocurrency
  name: string;    // Full name of the cryptocurrency (e.g., "Bitcoin")
  symbol: string;  // Trading symbol of the cryptocurrency (e.g., "BTC")
  usd: number;     // Current price in USD
};

/**
 * Defines the structure of our global state and actions.
 * This includes both the state properties and methods to update them.
 */
type State = {
  // State Properties
  prices: CryptoPrice[];      // Array of cryptocurrency prices
  isLoading: boolean;         // Loading state for API requests
  error: string | null;       // Error message if API request fails
  searchQuery: string;        // Current search filter text
  isDarkMode: boolean;        // Current theme mode

  // Actions
  fetchPrices: () => Promise<void>;          // Fetches latest crypto prices from API
  setSearchQuery: (query: string) => void;    // Updates search filter
  toggleTheme: () => void;                    // Toggles between light and dark mode
};

/**
 * Creates the global store with Zustand.
 * This store can be accessed from any component using the useStore hook.
 * Theme preference is persisted in localStorage.
 */
const useStore = create<State>()(
  persist(
    (set) => ({
      // Initial state
      prices: [],
      isLoading: false,
      error: null,
      searchQuery: '',
      isDarkMode: true,      // Default to dark mode
      
      /**
       * Fetches cryptocurrency prices from the CoinGecko API.
       * Updates the store with the latest prices or error state.
       */
      fetchPrices: async () => {
        // Set loading state
        set({ isLoading: true, error: null });
        try {
          // Fetch data from CoinGecko API
          const response = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,litecoin,cardano&vs_currencies=usd'
          );
          const data = await response.json();

          // Transform API response into our CryptoPrice format
          const prices: CryptoPrice[] = Object.keys(data).map((key) => ({
            id: key,
            name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
            symbol: key.toUpperCase(),                        // Convert symbol to uppercase
            usd: data[key].usd,
          }));

          // Update store with fetched prices
          set({ prices, isLoading: false });
        } catch (error) {
          // Handle any errors during fetch
          set({ error: 'Failed to fetch data', isLoading: false });
        }
      },

      /**
       * Updates the search query in the store.
       * This is used to filter the displayed cryptocurrencies.
       * @param query - The search text to filter by
       */
      setSearchQuery: (query: string) => set({ searchQuery: query }),

      /**
       * Toggles between light and dark mode.
       * The preference is automatically persisted in localStorage.
       */
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'crypto-track-storage',  // Name for the localStorage key
      partialize: (state) => ({ isDarkMode: state.isDarkMode }), // Only persist theme preference
    }
  )
);

export default useStore;
