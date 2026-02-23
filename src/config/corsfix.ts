// config/corsfix.ts
export const CORSFIX_CONFIG = {
  apiKey: import.meta.env.VITE_CORSFIX_API_KEY, // Store in .env
  baseUrl: "https://api.corsfix.com",
};

// Helper to build proxy URL
export const getProxiedUrl = (targetUrl: string) => {
  const encoded = encodeURIComponent(targetUrl);
  return `${CORSFIX_CONFIG.baseUrl}/v1/proxy?url=${encoded}`;
};
