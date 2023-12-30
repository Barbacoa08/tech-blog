<script lang="ts">
  import { Share } from "@barbajoe/svelte-lib";
  import { toast } from "@zerodevx/svelte-toast";

  export let text: string;
  export let url: string;

  const callback = ({ webshared }: { webshared: boolean }) => {
    if (webshared) {
      toast.push("Shared!");
    } else {
      toast.push("Copied URL to clipboard");
    }
  };
</script>

<Share title="barbajoe's blog" {text} {url} {callback}>Share</Share>
