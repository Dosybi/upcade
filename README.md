# Upcade Trading LaunchpadThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Modern trading terminal for meme tokens built with Next.js, TypeScript, and TailwindCSS.

## Getting Started

First, run the development server:

```bash
npm run dev
or
yarn dev
or
pnpm dev
or
bun devds
```

## 🚀 Features

- **Token Explorer**: Browse tokens with detailed information

- **Responsive Design**: Fully adaptive UI for desktop and mobile devices

- **Type-Safe**: Strict TypeScript with comprehensive type definitions

- **Modern Architecture**: FSD (Feature-Sliced Design) inspired architecture

- **Beautiful UI**: Clean, modern interface built with TailwindCSS

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router, React 19)

- **Language**: TypeScript (strict mode)Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **Styling**: TailwindCSS

- **State Management**: TanStack Query (React Query)

- **WebSocket**: Centrifuge client

- **Icons**: Lucide ReactThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 📁 Project Structure

```
src/
├── shared/           # Shared utilities and components
│   ├── api/         # API clients (REST, WebSocket)
│   ├── ui/          # Reusable UI components
│   └── lib/         # Utilities and helpers
├── entities/        # Business entities
│   ├── token/       # Token model and hooks
│   └── trade/       # Trade model and hooks
├── features/        # User features
│   ├── token-filters/
│   ├── trade-form/
│   └── token-chart/
└── widgets/         # Composite UI blocks
    ├── sidebar/
    ├── token-list/
    ├── token-details/
    ├── trades-feed/
    └── mobile-navigation/
```

### Architecture

The project follows a **Feature-Sliced Design (FSD)** inspired architecture:

1. **Shared Layer**: Reusable code shared across the application

   - API clients for REST and WebSocket communication
   - UI components (Button, Card, Input, Skeleton)
   - Utility functions (formatting, class names)

2. **Entities Layer**: Business logic for domain entities

   - Token: queries, types, and business logic
   - Trade: WebSocket subscriptions and trade management

3. **Features Layer**: User-facing features (planned)

   - Token filtering
   - Trade form
   - Chart visualization

4. **Widgets Layer**: Composite UI blocks
   - Sidebar: Navigation and profile
   - TokenList: Grid/list view of tokens
   - TokenDetails: Detailed token information
   - TradesFeed: Live trade stream
   - MobileNavigation: Bottom tab bar for mobile

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>
cd upcade

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```bash
# Centrifuge WebSocket Token (required for WebSocket connection)
NEXT_PUBLIC_WS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJpYXQiOjE3NTcxNjY4ODh9.VEvlNmvIFS3ARM5R0jlNN4fwDDRz94WnKv8LDmtipNE

# API Configuration (optional, uses defaults if not set)
NEXT_PUBLIC_API_BASE_URL=https://launch.meme/api
NEXT_PUBLIC_WS_URL=wss://launch.meme/connection/websocket
```

**Quick setup:**

1. Copy `.env.example` to `.env.local`
2. Add your Centrifuge JWT token
3. Restart dev server

**Note**: The application works without `.env.local` but WebSocket connection will fail. REST API will continue to work.

## 🌐 API Integration

### REST API

The application uses the **launch.meme REST API** for data retrieval:

- **Base URL**: `https://launch.meme/api`
- **Status**: ✅ **Working** (as of November 20, 2025)
- **Authentication**: JWT token via `NEXT_PUBLIC_CENTRIFUGE_TOKEN`

#### Data Fetching Strategy

- **Library**: TanStack Query (React Query)
- **Polling Interval**: 10 seconds (`refetchInterval: 10000`)
- **Stale Time**: 5 seconds (`staleTime: 5000`)
- **Caching**: Automatic via React Query

### WebSocket Integration

The application includes **WebSocket support** via Centrifuge protocol:

- **URL**: `wss://launch.meme/connection/websocket`
- **Protocol**: Centrifuge
- **Status**: ✅ **Connected** | ⚠️ **No Active Data Streams**
- **Authentication**: JWT token from `.env.local`

#### Implementation Status

**Infrastructure**: ✅ Fully implemented and working

- Connection establishes successfully
- JWT authentication works
- Subscriptions to channels succeed without errors
- Code is production-ready

**Data Streams**: ⚠️ Currently inactive

- Tested channels: `transactions`, `transaction`, `txs`, `tx`, `trades`, `all`
- Test duration: 120+ seconds across multiple attempts
- Result: **0 messages received** on all channels

#### Current Approach

**Hybrid Strategy**: WebSocket + REST API Polling

```typescript
// WebSocket is enabled and ready
export function useTradesFeed(tokenAddress?: string) {
  const [trades, setTrades] = useState<Trade[]>([])

  useEffect(() => {
    // Subscribes to WebSocket (instant updates if data appears)
    const unsubscribe = tokenAddress
      ? wsClient.subscribeToTrades(tokenAddress, handleMessage)
      : wsClient.subscribeToAllTrades(handleMessage)

    return () => unsubscribe()
  }, [tokenAddress])

  return { trades }
}

// REST API provides reliable data every 10 seconds
const { data } = useTransactions(tokenAddress, 20)
```

**Benefits:**

- ✅ Real-time updates **if/when** WebSocket data becomes available
- ✅ Reliable data via REST API polling (works now)
- ✅ No code changes needed when WebSocket activates
- ✅ Graceful fallback mechanism

#### Testing Results

Comprehensive WebSocket testing conducted on November 20, 2025:

```bash
# Test Results Summary
Connection: ✅ SUCCESS (authenticated, stable)
Subscriptions: ✅ SUCCESS (all channels accept subscriptions)
Message Delivery: ❌ NONE (0 messages over 120 seconds)

# Channels Tested
- transactions, transaction, txs, tx
- trades, all, public, feed
- Duration: 60s, 90s, 120s tests
```

See test scripts in project root: `test-websocket*.mjs`, `test-transactions.mjs`, `test-background.mjs`

## 📱 Responsive Design

The application adapts to different screen sizes:

- **Desktop** (>768px): Three-column layout (Sidebar | Token List | Details)
- **Mobile** (<768px): Tab-based navigation (Markets | Trade | Portfolio)

## 🎨 Design Decisions

1. **Color Scheme**: Clean white/gray theme with blue accents
2. **Typography**: Geist Sans for UI, Geist Mono for code
3. **Components**: Minimal, accessible, and reusable
4. **Loading States**: Skeleton screens for better UX
5. **Error Handling**: Graceful error displays with retry options

## 🔧 Configuration

### TypeScript Aliases

Configured in `tsconfig.json`:

- `@/shared/*` → `src/shared/*`
- `@/entities/*` → `src/entities/*`
- `@/features/*` → `src/features/*`
- `@/widgets/*` → `src/widgets/*`

## 🚧 Future Improvements

### High Priority

- [ ] Trading form implementation
- [ ] Advanced charting with TradingView or Lightweight Charts
- [ ] Token search and advanced filters
- [ ] Dark mode support (theme switching)
- [ ] Performance optimization (virtualization for lists)

### Medium Priority

- [ ] WebSocket channel discovery (find correct channel names)
- [ ] User authentication and portfolio tracking
- [ ] Price alerts and notifications
- [ ] Unit and integration tests

### Low Priority

- [ ] Internationalization (i18n)
- [ ] Advanced analytics dashboard
- [ ] Export trading history`
