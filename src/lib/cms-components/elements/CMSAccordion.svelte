<script lang="ts">
  import { Accordion } from "@barbajoe/svelte-lib";

  import type { Post } from "$types/payload-types";
  import { Serialize } from "../";

  export let accordions: Post["accordions"];
</script>

{#each accordions as accordion (accordion.id)}
  <Accordion>
    <h2 slot="header">{accordion.accordionheader}</h2>

    {#each accordion.accordionItems as item (item.id)}
      <Accordion.Item>
        <div slot="header">{item.accordionitemheader}</div>

        <Serialize content={item.accordionitemcontent} />
      </Accordion.Item>
    {/each}
  </Accordion>
{/each}
