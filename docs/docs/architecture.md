# Architecture

This document outlines the architectural decisions and implementation details of CryptoTrack.

## State Management with Zustand

We chose Zustand for state management due to its simplicity, small bundle size, and excellent TypeScript support. Here's how our store is structured:

```typescript
type State = {
  // State Properties
  prices: CryptoPrice[];      // Array of cryptocurrency prices
  isLoading: boolean;         // Loading state for API requests
  error: string | null;       // Error message if API request fails
  searchQuery: string;        // Current search filter text
  isDarkMode: boolean;        // Current theme mode

  // Actions
  fetchPrices: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  toggleTheme: () => void;
};
```

### Why Zustand?

1. **Simplicity**: No boilerplate code or complex setup required
2. **Performance**: Minimal re-renders with built-in selector optimization
3. **TypeScript Support**: Excellent type inference and type safety
4. **Middleware**: Built-in middleware for persistence, devtools, etc.

## Theme Management

The application implements a dark/light theme system using:
- Zustand for state management
- localStorage for theme persistence
- Tailwind CSS for styling
- CSS transitions for smooth theme switching

```typescript
// Theme toggle implementation
toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode }))
```

## Data Fetching

We use the CoinGecko API for cryptocurrency data:

1. **Polling Strategy**:
   - Initial fetch on component mount
   - Auto-refresh every 30 seconds
   - Manual refresh button

2. **Error Handling**:
   - Loading states
   - Error messages
   - Graceful fallbacks

```typescript
fetchPrices: async () => {
  set({ isLoading: true, error: null });
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    // Transform and set data
  } catch (error) {
    set({ error: 'Failed to fetch data', isLoading: false });
  }
}
```

## Component Structure

The application follows a simple component structure:

1. **Page Component** (`page.tsx`):
   - Main dashboard layout
   - Theme toggle
   - Search functionality
   - Crypto card grid

2. **Store** (`store.ts`):
   - Global state management
   - API integration
   - Theme persistence

## Styling Approach

We use Tailwind CSS for styling with:

1. **Responsive Design**:
   - Mobile-first approach
   - Breakpoint-based layouts
   - Flexible grid system

2. **Theme Support**:
   - Dynamic class application
   - Color scheme management
   - Transition effects

3. **Component Styling**:
   - Consistent spacing
   - Typography scale
   - Color palette
   - Interactive states

## Performance Considerations

1. **State Updates**:
   - Minimal re-renders
   - Efficient data transformation
   - Debounced search

2. **API Handling**:
   - Controlled polling
   - Error boundaries
   - Loading states

3. **Theme Switching**:
   - Smooth transitions
   - Persistent preferences
   - No layout shifts 