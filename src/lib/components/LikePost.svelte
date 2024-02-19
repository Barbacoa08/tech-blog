<script lang="ts">
  import { Button, Icons } from "@barbajoe/svelte-lib";

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
    disabled = false;
  };
  $: disabled = false;
</script>

<Button on:click={handleLike} {disabled} aria-label="I like this!">
  <Icons.CalendarHeart />
</Button>
