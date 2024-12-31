import { Plugin, MarkdownView, Notice } from 'obsidian';
import { fetchUrlMetadata } from './urlMetadata';
import { UrlCache } from './cache';
import { UrlPreviewView, URL_PREVIEW_VIEW } from './views/UrlPreviewView';

export default class NotionUrlPlugin extends Plugin {
    private urlCache: UrlCache;

    async onload() {
        this.urlCache = new UrlCache();

        // Load cached data
        try {
            const data = await this.loadData();
            await this.urlCache.load(data || '{}');
        } catch (error) {
            console.error('Failed to load URL cache:', error);
        }

        // Register URL Preview View
        this.registerView(URL_PREVIEW_VIEW, (leaf) => new UrlPreviewView(leaf));

        this.registerEvent(
            this.app.workspace.on(
                'editor-paste',
                async (evt: ClipboardEvent, editor: Editor) => {
                    const clipboardText = evt.clipboardData?.getData('text');

                    if (!clipboardText) return;

                    try {
                        new URL(clipboardText);
                    } catch {
                        return;
                    }

                    evt.preventDefault();

                    try {
                        // Check cache first
                        let metadata = this.urlCache.get(clipboardText);

                        if (!metadata) {
                            metadata = await fetchUrlMetadata(clipboardText);
                            this.urlCache.set(clipboardText, metadata);
                            // Save cache to disk
                            await this.saveData(this.urlCache.serialize());
                        }

                        // Insert the URL preview
                        const leaf = this.app.workspace.getRightLeaf(false);
                        await leaf.setViewState({
                            type: URL_PREVIEW_VIEW,
                            active: true,
                        });

                        const view = leaf.view as UrlPreviewView;
                        view.updatePreview(metadata);

                        // Insert the URL reference in the editor
                        editor.replaceSelection(
                            `[${metadata.title}](${clipboardText})`
                        );
                    } catch (error) {
                        new Notice('Failed to format URL: ' + error.message);
                        editor.replaceSelection(clipboardText);
                    }
                }
            )
        );
    }

    async onunload() {
        // Save cache before unloading
        await this.saveData(this.urlCache.serialize());
    }
}
