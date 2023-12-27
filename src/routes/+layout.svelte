<script lang="ts">
  import { Icons, Layout, Link } from "@barbajoe/svelte-lib";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  import { Header } from "$lib/components";

  import "./global.css";

  const options = {
    duration: 2000,
  };
</script>

<Layout>
  <Header slot="header" />

  <slot />

  <svelte:fragment slot="footer">
    &forall; by <Link isExternal href="https://barbajoe.tech/">
      <code>barbajoe</code>
    </Link>

    <span class="social-icons">
      <Link isExternal href="https://bsky.app/profile/barbajoe.tech" class="link">
        <Icons.Bluesky height="0.7rem" width="0.7rem" />
      </Link>
      |
      <Link isExternal href="https://www.linkedin.com/in/joseph-sebast/" class="link">
        <Icons.LinkedIn height="0.7rem" width="0.7rem" />
      </Link>
    </span>
  </svelte:fragment>
</Layout>

<SvelteToast {options} />

<style>
  .social-icons {
    padding-left: 0.1rem;

    & .link {
      padding: 0 0.5rem;

      &:last-child {
        padding-right: 0;
      }
    }
  }
</style>
