<script lang="ts">
  import { Icons, Layout, Link } from "@barbajoe/svelte-lib";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  import { onNavigate } from "$app/navigation";
  import { Header } from "$lib/components";

  import "./global.css";

  const options = {
    duration: 2000,
  };

  // HACK: https://kit.svelte.dev/docs/faq#how-do-i-use-the-view-transitions-api-with-sveltekit
  // consider using this package if we want to add complexity: https://github.com/paoloricciuti/sveltekit-view-transition
  onNavigate((navigation) => {
    const document = window.document as { startViewTransition?: (cb: () => void) => void };
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      if (!document.startViewTransition) return; // HACK: make ts happy

      document.startViewTransition(() => {
        resolve();
        navigation.complete.then(resolve);
      });
    });
  });
</script>

<Layout>
  <Header slot="header" />

  <slot />

  <svelte:fragment slot="footer">
    <div>
      &forall; by <Link isExternal href="https://barbajoe.tech/">
        <code>barbajoe</code>
      </Link>

      <span class="social-icons">
        <Link
          href="https://bsky.app/profile/barbajoe.tech"
          isExternal
          class="link"
          aria-label="Bluesky profile"
        >
          <Icons.Bluesky height="1rem" width="1rem" />
        </Link>

        <Link
          href="https://twitter.com/barbajoedottech/"
          isExternal
          class="link"
          aria-label="Twitter/X profile"
        >
          <Icons.TwitterX height="1.3rem" width="1.3rem" />
        </Link>

        <Link
          href="https://www.linkedin.com/in/joseph-sebast/"
          isExternal
          class="link"
          aria-label="LinkedIn profile"
        >
          <Icons.LinkedIn height="1.3rem" width="1.3rem" />
        </Link>

        <Link
          href="https://github.com/Barbacoa08"
          isExternal
          class="link"
          aria-label="GitHub profile"
        >
          <Icons.GitHub height="1.3rem" width="1.3rem" />
        </Link>
      </span>
    </div>
  </svelte:fragment>
</Layout>

<SvelteToast {options} />

<style>
  div {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;

    & .social-icons {
      padding-left: 0.3rem;
      display: inline-flex;
      align-items: center;

      & .link {
        padding: 0 0.5rem;

        &:last-child {
          padding-right: 0;
        }
      }
    }
  }
</style>
