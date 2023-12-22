<script lang="ts">
  import { Link, Icons } from "@barbajoe/svelte-lib";

  import SiteSearch from "./SiteSearch.svelte";

  import { page } from "$app/stores";

  $: isHome = $page.url.pathname === "/";

  $: isAbout = $page.url.pathname.startsWith("/about");
  $: isPosts = $page.url.pathname.startsWith("/post");
</script>

<Link aria-label="Homepage">
  <div class="site-header-logo">
    <Icons.Me />
    <Icons.Notebook />
  </div>
</Link>

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
  div.site-header-logo {
    display: flex;
  }

  ul li.no-hover:hover,
  ul li.no-hover:focus {
    border-bottom: 2px solid transparent;
    padding: 0 0.5rem;
  }
</style>
