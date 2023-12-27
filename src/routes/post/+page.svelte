<script lang="ts">
  import { Icons, TextGradient } from "@barbajoe/svelte-lib";

  import { formatDate } from "$lib/utils";

  import type { PageData } from "../+layout.server";

  export let data: PageData;

  $: ({ posts } = data);
</script>

<svelte:head>
  <title>Blog: Posts</title>
  <meta name="description" content="barbajoe's Tech Blog Posts" />
</svelte:head>

<h1>All <Icons.WordBubble /> <TextGradient>Posts</TextGradient></h1>

<p>Thoughts and musings. Ideas and opinions. Personal experiences and humble notions.</p>

<ul>
  {#each posts as { id, slug, title, status, author, publishedDate, updatedAt } (id)}
    <li class:disabled={status === "draft"}>
      <a href={status === "draft" ? "" : `/post/${slug}`} aria-disabled={status === "draft"}>
        <span>
          {title}
          {status === "draft" ? "(In Progress)" : `by "${author?.name}"`}
        </span>
      </a>

      <span>
        Posted on: {formatDate(publishedDate || updatedAt)}
      </span>
    </li>
  {/each}
</ul>
