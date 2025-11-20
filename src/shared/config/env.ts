export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://launch.meme/api',
    wsUrl:
      process.env.NEXT_PUBLIC_WS_URL ||
      'wss://launch.meme/connection/websocket',
    wsToken: process.env.NEXT_PUBLIC_WS_TOKEN,
  },
  features: {
    useMocks: process.env.NEXT_PUBLIC_USE_MOCKS === 'true',
  },
} as const
