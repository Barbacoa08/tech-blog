<script lang="ts">
  import { Link, TextGradient } from "@barbajoe/svelte-lib";

  import { page } from "$app/stores";
</script>

<h1>Welcome to barbajoe's <TextGradient>Tech Blog</TextGradient></h1>

<p>Whoops! Something went wrong.</p>

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
