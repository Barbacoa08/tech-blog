<script lang="ts">
  import { page } from "$app/stores";
  import SiteSearch from "./SiteSearch.svelte";

  $: isHome = $page.url.pathname === "/";

  $: isAbout = $page.url.pathname.startsWith("/about");
  $: isPosts = $page.url.pathname.startsWith("/post");
</script>

<ul class="site-header-links">
  <li class:active={isHome}>
    <a href="/">Home</a>
  </li>

  <li class:active={isPosts}>
    <a href="/post">Posts</a>
  </li>

  <li class:active={isAbout}>
    <a href="/about">About</a>
  </li>

  <li class="no-hover">
    <SiteSearch />
  </li>
</ul>

<style>
  ul li.no-hover:hover,
  ul li.no-hover:focus {
    color: var(--color-link-text-active);
    border-bottom: 2px solid transparent;
  }
</style>
