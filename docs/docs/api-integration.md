# API Integration

This document details how CryptoTrack integrates with the CoinGecko API for real-time cryptocurrency data.

## API Overview

We use the CoinGecko API for its:
- Reliability and uptime
- No authentication required for basic endpoints
- Rich cryptocurrency data
- Good documentation
- Generous rate limits

## Implementation Details

### Endpoint Used

```typescript
const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,litecoin,cardano&vs_currencies=usd';
```

### Data Fetching Strategy

1. **Initial Load**
   ```typescript
   useEffect(() => {
       fetchPrices();
       // ... rest of the code
   }, [fetchPrices]);
   ```

2. **Auto-Refresh**
   ```typescript
   const interval = setInterval(fetchPrices, 30000); // Every 30 seconds
   return () => clearInterval(interval); // Cleanup
   ```

3. **Manual Refresh**
   ```typescript
   <button onClick={() => fetchPrices()}>Refresh</button>
   ```

### Error Handling

We implement comprehensive error handling:

```typescript
try {
  const response = await fetch(API_URL);
  const data = await response.json();
  // Process data
} catch (error) {
  set({ error: 'Failed to fetch data', isLoading: false });
}
```

### Data Transformation

The API response is transformed into our application's data model:

```typescript
// API Response Format
{
  "bitcoin": { "usd": 50000 },
  "ethereum": { "usd": 3000 }
  // ...
}

// Our Data Model
type CryptoPrice = {
  id: string;      // e.g., "bitcoin"
  name: string;    // e.g., "Bitcoin"
  symbol: string;  // e.g., "BTC"
  usd: number;     // e.g., 50000
};
```

### Loading States

Loading states are managed to provide feedback during API calls:

```typescript
// Start loading
set({ isLoading: true, error: null });

// End loading on success
set({ prices, isLoading: false });

// End loading on error
set({ error: 'Failed to fetch data', isLoading: false });
```

## Rate Limiting & Optimization

1. **Polling Interval**
   - Set to 30 seconds to balance freshness with API limits
   - Manual refresh available for immediate updates

2. **Error Recovery**
   - Continues polling even after errors
   - Clear error messages for user feedback

3. **Data Caching**
   - Latest data persists in Zustand store
   - Prevents unnecessary API calls

## Future Improvements

1. **WebSocket Integration**
   - Real-time price updates
   - Reduced API load
   - More immediate price changes

2. **API Fallbacks**
   - Alternative API endpoints
   - Backup data sources
   - Graceful degradation

3. **Advanced Features**
   - Historical price data
   - More cryptocurrencies
   - Additional price metrics 