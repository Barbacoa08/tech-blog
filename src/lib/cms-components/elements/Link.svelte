<script lang="ts">
  import { Link } from "@barbajoe/svelte-lib";

  import type { LinkPostBlock } from "$types/PayloadPostTypes";
  import { Serialize } from "..";

  export let block: LinkPostBlock;
  const { children, url, newTab } = block;
  // TODO: add `aria-label` to payload "link" type
</script>

<Link isExternal={newTab === true} href={url}>
  <Serialize content={children} />

  <slot />
</Link>
