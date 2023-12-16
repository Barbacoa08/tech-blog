<script lang="ts">
  import { Layout } from "@barbajoe/svelte-lib";
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
</Layout>

<SvelteToast {options} />
