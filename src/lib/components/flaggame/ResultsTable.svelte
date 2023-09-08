<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { FlagResult } from "./flaggame";
	import Button from "../Button.svelte";

  export let results: FlagResult[];
  
  const dispatch = createEventDispatcher();

  let numCorrect = 0;
  for (let res of results) {
    if (res.ans.code === res.usr.code) {
      numCorrect++;
    }
  }
</script>

<style>
  table {
    margin: auto;
  }

  td {
    padding: .5em;
  }

  tr.result-row {
    background-color: lightcoral;
  }

  tr.result-row.correct {
    background-color: lightgreen;
  }

  :global(body.dark) tr.result-row {
    background-color: darkred;
  }

  :global(body.dark) .result-row.correct {
    background-color: darkgreen;
  }

  .flag-icon {
    height: 1em;
    vertical-align: middle;
  }
</style>

<p>You scored {numCorrect}/{results.length}.</p>
<div class="table-container">
  <table>
    <tr>
      <th>You Guessed</th>
      <th>Correct Answer</th>
    </tr>
    {#each results as r}
      <tr class="result-row" class:correct={r.usr.code === r.ans.code}>
        <td><img src="/flags/{r.usr.code}.svg" class="flag-icon" alt={r.usr.code}/> {r.usr.name}</td>
        <td><img src="/flags/{r.ans.code}.svg" class="flag-icon" alt={r.ans.code}/> {r.ans.name}</td>
      </tr>
    {/each}
  </table>
</div>
<div>
  <Button on:click={()=>dispatch("retry")} green>Try Again</Button>
  <Button on:click={()=>dispatch("menu")}>Back to Menu</Button>
</div>