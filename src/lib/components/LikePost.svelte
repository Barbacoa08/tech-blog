<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  import { Button, Icons } from "@barbajoe/svelte-lib";
  import { toast } from "@zerodevx/svelte-toast";

  onMount(async () => {
    const response = await fetch(`/likes?slug=${slug}`);
    if (!response.ok) {
      console.error(`${response.status} - ${response.statusText}`);
      toast.push(await response.text());
    } else {
      const result = await response.json();
      likes = result.likes;
    }
  });

  export let slug: string;

  const handleLike = async () => {
    disabled = true;
    const response = await fetch("/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
    });

    if (response.ok) {
      likes = (await response.json()).likes;
    } else {
      console.error(`${response.status} - ${response.statusText}`);
      toast.push(`${await response.text()}`, {
        duration: 5000,
      });
    }
    disabled = false;
  };

  $: likes = { total: 0, user: 0 };
  $: disabled = false;
  $: if (likes.user >= 5) disabled = true;
</script>

<Button on:click={handleLike} {disabled} variant="icon" aria-label="I like this!">
  {#if likes.user === 0}
    <Icons.Heart />
  {:else if likes.user === 1}
    <Icons.Heart filled />
  {:else if likes.user === 2}
    <Icons.Star />
  {:else if likes.user === 3}
    <Icons.Star filled />
  {:else if likes.user === 4}
    <Icons.ShootingStar />
  {:else if likes.user >= 5}
    <Icons.ShootingStar sparkles />
  {/if}

  {#if likes.total > 0}
    <div class="like-count" in:fade>
      {likes.total}
    </div>
  {/if}
</Button>

<style>
  .like-count {
    padding-left: 0.5rem;
  }
</style>
