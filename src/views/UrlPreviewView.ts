import { ItemView, WorkspaceLeaf } from 'obsidian';
import UrlPreview from '../components/UrlPreview.svelte';
import type { UrlMetadata } from '../types';

export const URL_PREVIEW_VIEW = "url-preview-view";

export class UrlPreviewView extends ItemView {
  private component: UrlPreview;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType(): string {
    return URL_PREVIEW_VIEW;
  }

  getDisplayText(): string {
    return "URL Preview";
  }

  async onOpen() {
    this.component = new UrlPreview({
      target: this.contentEl,
      props: {
        metadata: null
      }
    });
  }

  async onClose() {
    if (this.component) {
      this.component.$destroy();
    }
  }

  updatePreview(metadata: UrlMetadata) {
    if (this.component) {
      this.component.$set({ metadata });
    }
  }
}