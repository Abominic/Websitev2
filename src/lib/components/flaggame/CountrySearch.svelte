<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import AnswerButtons from "./AnswerButtons.svelte";
  import { search, type Country } from "./flaggame";

  const dispatch = createEventDispatcher();

  function select(c: Country) {
    query = "";
    dispatch("choice", c);
  }

  function keyPress(e: KeyboardEvent) {
    if (e.key === "Enter" && query.length > 0) {
      select(options[0]);
    }
  }

  let query: string = "";

  $: options = search(query, 5);
</script>

<style>
  .search-bar {
    border: 2px solid white;
    background-color: inherit;
    border-radius: 5px;
    padding: .5em;
    width: 100%;
    box-sizing: border-box;
    color: white;
    text-align: center;
  }
</style>

<!-- svelte-ignore a11y-autofocus -->
<input type="text" class="search-bar" bind:value={query} on:keypress={keyPress} placeholder="Search" autofocus/> 
<AnswerButtons on:choice={e=>select(e.detail)} {options} highlightFirst/>