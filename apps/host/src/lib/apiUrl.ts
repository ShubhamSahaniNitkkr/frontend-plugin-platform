/** API base URL — relative in production (proxied), absolute localhost in dev. */
export const API_URL =
  import.meta.env.PUBLIC_API_URL ??
  (import.meta.env.DEV ? 'http://localhost:3001/api/v1' : '/api/v1');
