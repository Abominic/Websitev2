<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { FlagResult } from "./flaggame";

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
        <td>{r.usr.name}</td>
        <td>{r.ans.name}</td>
      </tr>
    {/each}
  </table>
</div>
<div>
  <button on:click={()=>dispatch("retry")}>Try Again</button>
  <button on:click={()=>dispatch("menu")}>Back to Menu</button>
</div>