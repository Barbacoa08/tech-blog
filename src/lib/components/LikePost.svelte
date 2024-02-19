<script lang="ts">
  import { onMount } from "svelte";
  import { Button, Icons } from "@barbajoe/svelte-lib";

  onMount(async () => {
    const response = await fetch(`/likes?slug=${slug}`).then((res) => res.json());
    likes = response.likes;
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
    }).then((res) => res.json());
    likes = response.likes;
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

  {#if likes.user > 0}
    <div class="like-count">
      ({likes.user})
    </div>
  {/if}
</Button>

<style>
  .like-count {
    padding-left: 0.5rem;
  }
</style>
