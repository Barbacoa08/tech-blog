<script lang="ts">
  import { Icons, TextGradient } from "@barbajoe/svelte-lib";

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
<ul class="homepage-links">
  {#each posts as { id, slug, title, status, publishedDate } (id)}
    <li class:disabled={isPostDisabled(status, publishedDate)}>
      <a
        href={isPostDisabled(status, publishedDate) ? "" : `/post/${slug}`}
        aria-disabled={isPostDisabled(status, publishedDate)}
      >
        <Icons.WordBubble class="svg-position" />

        <span>
          {title}
          {isPostDisabled(status, publishedDate) ? "(In Progress)" : ""}
        </span>
      </a>
    </li>
  {/each}
</ul>

<style>
  :root {
    --list-background-color: rgb(34, 34, 34);
    --list-link-color: white;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --list-background-color: rgb(210, 210, 210);
      --list-link-color: rgb(34, 34, 34);
    }
  }

  ul.homepage-links {
    list-style: none;
    margin-top: 2rem;
    padding: 0;

    display: flex;
    flex-direction: column;
  }

  li {
    border-radius: 1rem;
    margin-bottom: 1rem;
    background-color: var(--list-background-color);
    transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;
  }
  li:hover,
  li:focus-within {
    transform: scale(1.02);
  }

  li a {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    height: 3rem;
    color: var(--list-link-color);

    transition:
      box-shadow 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s,
      border-color 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s,
      transform 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s,
      background-color 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s;
  }

  li.disabled {
    transform: none;
  }
  li a[aria-disabled="true"],
  li.disabled a {
    pointer-events: none;
    opacity: 0.5;
    transition: none;
  }

  /*
  HACK: use of `:global()` is far from ideal, but it works and is the best workaround from the docs:
  https://github.com/sveltejs/svelte/issues/2870#issuecomment-498360853
  */
  ul.homepage-links li a :global(.svg-position) {
    position: absolute;
    left: 1.5rem;
    color: var(--list-link-color);
  }
</style>
