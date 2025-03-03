# Setup Guide

This guide will help you get CryptoTrack up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- Git

## Installation Steps

1. **Clone the Repository**
```bash
git clone https://github.com/your-username/crypto-tracker.git
cd crypto-tracker
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Start the Development Server**
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

## Project Configuration

### Environment Variables

No environment variables are required for basic functionality as we're using the public CoinGecko API.

### API Configuration

The application uses the CoinGecko API for cryptocurrency price data. The API endpoint is configured in `src/app/store/store.ts`:

```typescript
const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,litecoin,cardano&vs_currencies=usd';
```

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm start
# or
yarn start
```

## Documentation Development

To run the documentation site locally:

```bash
cd docs
npm start
# or
yarn start
```

The documentation will be available at `http://localhost:3000`. 