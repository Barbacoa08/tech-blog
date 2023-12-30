<script lang="ts">
  import { Share } from "@barbajoe/svelte-lib";
  import { toast } from "@zerodevx/svelte-toast";

  export let text: string;
  export let url: string;
</script>

<Share title="barbajoe's blog" {text} {url} callback={() => toast.push("Copied URL to clipboard")}>
  Share
</Share>
