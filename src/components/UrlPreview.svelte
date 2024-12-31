`<script lang="ts">
  import type { UrlMetadata } from '../types';
  
  export let metadata: UrlMetadata;
</script>

<div class="url-preview">
  <div class="header">
    {#if metadata.favicon}
      <img src={metadata.favicon} alt="favicon" class="favicon" />
    {/if}
    <span class="site-name">{metadata.siteName}</span>
  </div>
  <div class="content">
    <a href={metadata.url} class="title">{metadata.title}</a>
    {#if metadata.description}
      <p class="description">{metadata.description}</p>
    {/if}
  </div>
</div>

<style>
  .url-preview {
    border: 1px solid var(--background-modifier-border);
    border-radius: 4px;
    padding: 12px;
    margin: 8px 0;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .favicon {
    width: 16px;
    height: 16px;
  }

  .site-name {
    color: var(--text-muted);
    font-size: 0.9em;
  }

  .title {
    display: block;
    font-weight: bold;
    color: var(--text-normal);
    text-decoration: none;
    margin-bottom: 4px;
  }

  .description {
    color: var(--text-muted);
    font-size: 0.9em;
    margin: 0;
  }
</style>`