import type { UrlMetadata } from './types';

export function formatUrlBlock(metadata: UrlMetadata): string {
    const { url, title, description, siteName } = metadata;

    return `>[!link]
        > **[${title}](${url})**
        > ${description}
        > ${siteName}`;
}
