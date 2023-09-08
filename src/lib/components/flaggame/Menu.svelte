<script lang="ts">
	import { createEventDispatcher } from "svelte";
import { Difficulty } from "./flaggame";
	import Button from "../Button.svelte";

  export let begin: (diff: Difficulty)=>void;

  let diff = Difficulty.EASY; //Default difficulty.

  const startGame = () => {
    begin(diff);
  };
</script>

<style>
  .credit {
    font-style: italic;
    color: gray;
  }
</style>

<h3>Select Difficulty</h3>
<div class="diff-selector">
  <Button highlight={diff===0} on:click={()=>{diff = 0}}>Easy</Button>
  <Button highlight={diff===1} on:click={()=>{diff = 1}}>Medium</Button>
  <Button highlight={diff===2} on:click={()=>{diff = 2}}>Hard</Button>
</div>
<ul class="features-list">
  {#if diff === Difficulty.EASY}
    <li>Choose between four possible countries.</li>
    <li>Only uses top 150 GDP countries.</li>
  {:else if diff === Difficulty.MEDIUM}
    <li>Choose between 8 countries, territories, and unions.</li>
    <li>Includes all countries and some sub-territories.</li>
  {:else if diff === Difficulty.HARD}
    <li>Text Input (more than 200 options)</li>
    <li>As many options as medium difficulty.</li>
  {/if}
</ul>
<Button green on:click={startGame}>Start</Button>
<p class="credit">Flag icons shamelessly stolen from: <a href="https://github.com/lipis/flag-icons">https://github.com/lipis/flag-icons</a>.</p>
