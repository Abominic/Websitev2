<script lang="ts">
	import { createEventDispatcher } from "svelte";
  import { genOptions, type Country } from "./flaggame";

  export let country: Country;
  export let num: number;
  export let easy: boolean;
  
  let dispatch = createEventDispatcher();

  function select(c: Country) {
    dispatch("choice", c);
  }

  $: options = genOptions(country, num, easy);
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
  {#each options as o}
    <button class="option-button" on:click={()=>{select(o)}}>{o.name}</button>
  {/each}
</div>