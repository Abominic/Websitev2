<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { Country } from "./flaggame";

  export let options: Country[];
  export let highlightFirst: boolean = false;

  let dispatch = createEventDispatcher();

  function select(c: Country) {
    dispatch("choice", c);
  }
</script>

<style>
  .multiple-choice, .option-button {
    width: 100%;
  }

  .multiple-choice {
    margin-top: 10px;
  }

  .option-button {
    margin-top: 10px;
  }
</style>

<div class="multiple-choice">
  {#each options as o, index}
    <button class="option-button" class:green={index===0&&highlightFirst} on:click={()=>{select(o)}}>{o.name}</button>
  {/each}
</div>