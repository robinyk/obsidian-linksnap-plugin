import { UrlMetadata } from './types';

export class UrlCache {
  private cache: Record<string, { metadata: UrlMetadata; timestamp: number }> = {};
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  async load(data: string) {
    try {
      this.cache = JSON.parse(data);
    } catch {
      this.cache = {};
    }
  }

  serialize(): string {
    return JSON.stringify(this.cache);
  }

  get(url: string): UrlMetadata | null {
    const cached = this.cache[url];
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > this.CACHE_DURATION;
    if (isExpired) {
      delete this.cache[url];
      return null;
    }

    return cached.metadata;
  }

  set(url: string, metadata: UrlMetadata) {
    this.cache[url] = {
      metadata,
      timestamp: Date.now()
    };
  }
}