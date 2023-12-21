<script lang="ts">
  import type { TextPostBlock } from "$types/PayloadPostTypes";

  export let block: TextPostBlock;
  const { text = "", bold, italic, strikethrough, underline, code } = block;
</script>

{#if bold}
  <strong>{text}</strong>
{:else if italic}
  <em>{text}</em>
{:else if strikethrough}
  <s>{text}</s>
{:else if underline}
  <u>{text}</u>
{:else if code}
  <code>{text}</code>
{:else}
  {text}
{/if}
