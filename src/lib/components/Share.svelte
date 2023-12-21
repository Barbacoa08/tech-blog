<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";
  import { browser } from "$app/environment";
  import { copyTextToClipboard } from "$lib/utils";

  export let title: string;
  export let url: string;

  $: webShareAPISupported =
    browser && typeof navigator.share !== "undefined" && typeof navigator.canShare !== "undefined";

  $: handleWebShare;
  const handleWebShare = async () => {
    if (webShareAPISupported) {
      navigator.share({
        title: "Fighter Advice Program",
        text: title,
        url,
      });
    } else {
      copyTextToClipboard(url);
      toast.push("Copied URL to clipboard");
    }
  };
</script>

<button on:click={handleWebShare}>Share</button>
