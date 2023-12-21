<script lang="ts">
  import { page } from "$app/stores";
  import { Serialize } from "$lib/cms-components";
  import { Share } from "$lib/components";
  import { formatDate } from "$lib/utils";
  import { Icons, TextGradient } from "@barbajoe/svelte-lib";

  import type { PageData } from "./$types";

  export let data: PageData;
  $: ({
    post: { accordions = [], content = [], title = "", author, publishedDate, slug },
  } = data);
  $: url = `${$page.url.origin}/post/${slug}`;
</script>

<svelte:head>
  <title>Blog Post: {title}</title>
  <meta name="description" content={`barbajoe's Fighter Advice on ${title}`} />
</svelte:head>

<h1 class="title">
  <TextGradient>
    {title}
  </TextGradient>

  <Icons.WordBubble /> by {author?.name}
</h1>
<p class="sub-title">
  <span>posted on: {formatDate(publishedDate)}</span>
  <span><Share {title} {url} /></span>
</p>

<Serialize {accordions} {content} />

<style>
  .title {
    margin-bottom: 0;
    border-bottom: 1px solid var(--border-color-gray);
  }

  .sub-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 2rem;
  }
</style>
