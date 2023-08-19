<script lang="ts">
	import { createEventDispatcher } from "svelte";
import { Difficulty } from "./flaggame";

  export let begin: (diff: Difficulty)=>void;

  let diff = Difficulty.EASY; //Default difficulty.

  const startGame = () => {
    begin(diff);
  };
</script>

<style>
  .diff-selector > button  {
    display: inline;
    transition: background-color .5s, color .5s;
  }

  .selected {
    background-color: black;
    color: white;
  }

  :global(body.dark) .diff-selector > .selected { /* Had to add specificity to this selector otherwise CSS ignores it. :( */
    background-color: white;
    color: black; 
  }

  .credit {
    font-style: italic;
    color: gray;
  }
</style>

<h3>Select Difficulty</h3>
<div class="diff-selector">
  <button class:selected={diff===0} on:click={()=>{diff = 0}}>Easy</button>
  <button class:selected={diff===1} on:click={()=>{diff = 1}}>Medium</button>
  <button class:selected={diff===2} on:click={()=>{diff = 2}}>Hard</button>
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
<button class="green start-button" on:click={startGame} >Start</button>
<p class="credit">Flag icons shamelessly stolen from: <a href="https://github.com/lipis/flag-icons">https://github.com/lipis/flag-icons</a>.</p>
