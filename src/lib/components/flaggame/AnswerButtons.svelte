<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { Country } from "./flaggame";
	import Button from "../Button.svelte";

  export let options: Country[];
  export let highlightFirst: boolean = false;

  let dispatch = createEventDispatcher();

  function select(c: Country) {
    dispatch("choice", c);
  }
</script>

<style>
  .multiple-choice {
    width: 100%;
  }

  .multiple-choice > :global(*) {
    width: 100%;
    margin-top: 10px;
  }

  .multiple-choice {
    margin-top: 10px;
  }
</style>

<div class="multiple-choice">
  {#each options as o, index}
    <Button green={index===0&&highlightFirst} on:click={()=>{select(o)}}>{o.name}</Button>
  {/each}
</div>