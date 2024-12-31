import { MetadataParser } from './services/metadataParser';
import { UrlFetcher } from './services/urlFetcher';

export async function fetchUrlMetadata(url: string) {
    try {
        const fetcher = new UrlFetcher();
        const parser = new MetadataParser();

        const html = await fetcher.fetch(url);
        return parser.parse(html, url);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch URL metadata: ${error.message}`);
        }
    }
}
