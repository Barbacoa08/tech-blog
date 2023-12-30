<script lang="ts">
  import { Link, Modal, Icons, Button } from "@barbajoe/svelte-lib";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import Search from "svelte-search";

  import type { TermsResult } from "$types/SearchAPI";

  let showModal = false;
  let value = "";
  let terms: TermsResult[] = [];

  // eslint-disable-next-line
  const focusNextAnchorTag = (dialogAnchors: NodeListOf<Element>) => {
    // if focus is not in the liat, or the focus is on the last item, focus the first anchor
    if (
      document.activeElement?.tagName !== "A" ||
      document.activeElement === dialogAnchors[dialogAnchors.length - 1]
    ) {
      (dialogAnchors[0] as HTMLElement).focus();
    } else {
      // else, find the active anchor and focus the next one
      for (let i = 0; i < dialogAnchors.length; i++) {
        if (document.activeElement === dialogAnchors[i]) {
          (dialogAnchors[i + 1] as HTMLElement).focus();
          break;
        }
      }
    }
  };
  // eslint-disable-next-line
  const focusPrevAnchorTag = (dialogAnchors: NodeListOf<Element>) => {
    // if focus is not in the liat, or the focus is on the first item, focus the last anchor
    if (document.activeElement?.tagName !== "A" || document.activeElement === dialogAnchors[0]) {
      (dialogAnchors[dialogAnchors.length - 1] as HTMLElement).focus();
    } else {
      // else, find the active anchor and focus the previous one
      for (let i = 0; i < dialogAnchors.length; i++) {
        if (document.activeElement === dialogAnchors[i]) {
          (dialogAnchors[i - 1] as HTMLElement).focus();
          break;
        }
      }
    }
  };

  let prevKey = "";
  const handleKeydown = (event: KeyboardEvent) => {
    if (showModal && ["INPUT", "A"].includes(document.activeElement?.tagName || "")) {
      const dialogAnchors = document.querySelectorAll("dialog ul li a");
      if (!dialogAnchors.length) return;

      if (event.key === "ArrowDown") {
        focusNextAnchorTag(dialogAnchors);
        event.stopPropagation();
        event.preventDefault();
      } else if (event.key === "ArrowUp") {
        focusPrevAnchorTag(dialogAnchors);
        event.stopPropagation();
        event.preventDefault();
      }
    } else if (event.key === "k" && (prevKey === "Control" || prevKey === "Meta")) {
      showModal = true;
      prevKey = "";
      event.stopPropagation();
      event.preventDefault();
    } else {
      prevKey = event.key;
    }
  };
  const handleKeyUp = () => {
    if (!showModal) {
      prevKey = "";
    }
  };

  let osKey = " ";
  onMount(async () => {
    osKey = navigator.userAgent.includes("Mac") ? "⌘" : "CTRL";

    // pull search terms after initial render to avoid blocking
    const response = await fetch("/search", {
      headers: {
        "content-type": "application/json",
      },
    });
    terms = await response.json();
  });
  $: matches =
    value.length === 0
      ? []
      : terms.filter(
          (term) =>
            term.title.toLowerCase().includes(value.toLowerCase()) ||
            term.tags.filter((tag) => tag.toLowerCase().includes(value.toLowerCase())).length,
        );
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyUp} />

<Button
  variant="icon"
  style="font-size: 0.7rem"
  aria-label="Search"
  on:click={() => (showModal = true)}
>
  <Icons.Search width="1rem" height="1rem" />
  <span>{osKey} K</span>
</Button>

<Modal bind:showModal>
  <svelte:fragment slot="dialog-header-text">Post Search</svelte:fragment>

  <Search autofocus label="Search Titles and Tags" bind:value />

  <ul>
    {#if value.length && !matches.length}
      <li>No results</li>
    {:else if !value.length}
      <li>Enter a search</li>
    {/if}

    {#each matches as match}
      <li in:fly={{ duration: 200 }}>
        <Link href={match.url}>{match.title}</Link>:
        {match.tags.join(", ")}
      </li>
    {/each}
  </ul>
</Modal>

<style>
  :root {
    --list-item-background-color: hsl(0, 1%, 75%);
    --list-item-background-color-hover: hsl(0, 1%, 65%);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --list-item-background-color: hsl(0, 1%, 25%);
      --list-item-background-color-hover: hsl(0, 1%, 35%);
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  ul li {
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 1rem;
    background-color: var(--list-item-background-color);
  }
  ul li:hover,
  ul li:focus,
  ul li:active,
  ul li:focus-within {
    background-color: var(--list-item-background-color-hover);
  }
</style>
