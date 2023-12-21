<script lang="ts">
  import { Link } from "@barbajoe/svelte-lib";
  import type { Page } from "@sveltejs/kit";
  import type { Readable } from "svelte/store";

  export let page: Readable<Page<Record<string, string>, string | null>>;

  $: console.error(
    `Error accessing "${$page.url.pathname}", recieved: ${$page.status} - ${$page.error?.message}`,
  );

  const pagename = $page.params.slug.split("-").join(" ");
</script>

<h1>Oops!</h1>

<p>
  <span>{pagename}</span> either doesn't exist yet, or is experiencing performance anxiety.
</p>

<p>Please come back later and hopefully I'll have fixed it &#128517;</p>

<p>{$page.status} - {$page.error?.message}</p>

<p>
  If you've seen this page multiple times, <Link
    href="https://github.com/Barbacoa08/tech-blog/issues"
    isExternal
  >
    please create an issue
  </Link>.
</p>

<style>
  span {
    text-transform: capitalize;
    font-style: italic;
  }
</style>
