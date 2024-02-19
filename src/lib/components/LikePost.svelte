<script lang="ts">
  import { Button, Icons } from "@barbajoe/svelte-lib";

  export let slug: string;

  const handleLike = async () => {
    const response = await fetch("/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
    });

    console.info(await response.json());
  };
</script>

<Button on:click={handleLike} aria-label="I like this!">
  <Icons.CalendarHeart />
</Button>
