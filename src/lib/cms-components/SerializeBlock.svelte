<script lang="ts">
  import type { PostContent } from "$types/PayloadPostTypes";
  import { Serialize } from "./";
  import { Link, Text } from "./elements";

  export let block: PostContent;

  if (!block || (!block.type && !block.text && block.text !== "" && !block.children?.length)) {
    console.error("SerializeBlock.svelte: `block` is undefined or missing all valid props:", block);
  }
</script>

{#if !!block.text || block.text === ""}
  <Text {block} />
{:else if block.type === "h1"}
  <h2><Serialize content={block.children} /></h2>
{:else if block.type === "h2"}
  <h3><Serialize content={block.children} /></h3>
{:else if block.type === "h3"}
  <h4><Serialize content={block.children} /></h4>
{:else if block.type === "h4"}
  <h5><Serialize content={block.children} /></h5>
{:else if block.type === "h5" || block.type === "h6"}
  <h6><Serialize content={block.children} /></h6>
{:else if block.type === "p"}
  <p><Serialize content={block.children} /></p>
{:else if !block.type && block.children.length > 0}
  <p><Serialize content={block.children} /></p>
{:else if block.type === "link"}
  <Link {block} />
{:else if block.type === "ul"}
  <ul><Serialize content={block.children} /></ul>
{:else if block.type === "ol"}
  <ol><Serialize content={block.children} /></ol>
{:else if block.type === "li"}
  <li><Serialize content={block.children} /></li>
{:else}
  <div>Unknown/Invalid block type: {block.type}</div>
{/if}
