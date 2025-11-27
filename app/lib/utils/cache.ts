type CacheEntry<T> = {
  data: T;
  expires: number;
};

const cache = new Map<string, CacheEntry<any>>();

const DEFAULT_TTL = 1000 * 60; // 1 minute

export function getCache<T>(key: string): T | null {
  const entry = cache.get(key);

  if (!entry) return null;

  // Expired
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

export function setCache<T>(key: string, data: T, ttl: number = DEFAULT_TTL) {
  cache.set(key, {
    data,
    expires: Date.now() + ttl,
  });
}
