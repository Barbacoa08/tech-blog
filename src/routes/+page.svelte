<script lang="ts">
  import { CMSComponents, TextGradient } from "@barbajoe/svelte-lib";

  import type { PageData } from "./+layout.server";

  export let data: PageData;
  $: ({ posts } = data);

  const isPostDisabled = (status?: string, publishedDate?: string) =>
    status !== "published" || !publishedDate || new Date(publishedDate) > new Date();
</script>

<svelte:head>
  <title>barbajoe's Tech Blog</title>
  <meta name="description" content="barbajoe's Tech Blog homepage" />
</svelte:head>

<h1>Welcome to barbajoe's <TextGradient>Tech Blog</TextGradient></h1>

<p>Let's get good y'all!</p>

<h2>Latest Posts</h2>
<CMSComponents.Posts>
  {#each posts as { id, slug, title, status, publishedDate } (id)}
    <CMSComponents.Post disabled={isPostDisabled(status, publishedDate)} href={`/post/${slug}`}>
      <span>
        {title}
        {isPostDisabled(status, publishedDate) ? "(In Progress)" : ""}
      </span>
    </CMSComponents.Post>
  {/each}
</CMSComponents.Posts>
