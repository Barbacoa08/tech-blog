<script lang="ts">
  import { dev } from "$app/environment";
  import { Button, Icons, TextGradient } from "@barbajoe/svelte-lib";

  import { page } from "$app/stores";

  import { Serialize } from "$lib/cms-components";
  import { LikePost, Share } from "$lib/components";
  import { formatDate } from "$lib/utils";

  import type { PageData } from "./$types";

  export let data: PageData;
  $: ({
    post: { accordions = [], content = [], title = "", author, publishedDate, slug = "" },
  } = data);
  $: url = `${$page.url.origin}/post/${slug}`;
</script>

<svelte:head>
  <title>Blog Post: {title}</title>
  <meta name="description" content={`barbajoe's blog on ${title}`} />
</svelte:head>

<h1 class="title">
  <TextGradient>
    {title}
  </TextGradient>

  <Icons.WordBubble /> by {author?.name}
</h1>
<p class="sub-title">
  <span>posted on: {formatDate(publishedDate)}</span>
  <span><Share text={title} {url} /></span>
</p>

<Serialize {accordions} {content} />

<div class="like-post">
  <LikePost {slug} />

  {#if dev}
    <Button
      variant="icon"
      aria-label="I hate this!"
      on:click={() =>
        fetch("/likes", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        })}
    >
      <Icons.Trash />
    </Button>
  {/if}
</div>

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

  div.like-post {
    margin-top: 2rem;

    display: flex;
    justify-content: flex-end;
  }
</style>
