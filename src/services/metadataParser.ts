import { UrlMetadata } from '../types';

export class MetadataParser {
  parse(html: string, url: string): UrlMetadata {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    return {
      url,
      title: this.getMetaContent(doc, 'title') || doc.title,
      description: this.getMetaContent(doc, 'description') || '',
      siteName: this.getMetaContent(doc, 'og:site_name') || new URL(url).hostname,
      favicon: this.getFaviconUrl(doc, url)
    };
  }

  private getMetaContent(doc: Document, name: string): string {
    return doc.querySelector(`meta[name="${name}"], meta[property="og:${name}"]`)?.getAttribute('content') || '';
  }

  private getFaviconUrl(doc: Document, baseUrl: string): string {
    const favicon = doc.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
    if (!favicon) return '';
    
    const faviconHref = favicon.getAttribute('href');
    if (!faviconHref) return '';
    
    return new URL(faviconHref, baseUrl).toString();
  }
}