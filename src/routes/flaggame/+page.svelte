<script lang="ts">
	import { FlagGame, FlagMenu } from "$lib";
	import ResultsTable from "$lib/components/flaggame/ResultsTable.svelte";
	import type { FlagResult, Difficulty } from "$lib/components/flaggame/flaggame";
	import Game from "$lib/components/squarestack/Game.svelte";


  enum Mode {
    MENU,
    GAME,
    RESULTS,
  }

  let mode = Mode.MENU;
  let difficulty = -1;
  let results: FlagResult[] = [];

  const startGame = (diff: number) => {
    difficulty = diff;
    mode = Mode.GAME;
  }

  const endGame = (res: FlagResult[]) => {
    results = res;
    mode = Mode.RESULTS;
  }

  function menu() {
    mode = Mode.MENU;
  }

</script>

<style>
  .game-page > :global(*) {
    text-align: center;
    display: block;
    margin: 1em auto auto auto;
  }
</style>

<div class="game-page">
  <h2>Dom's Flag Guessing Game (Second Edition)</h2>
  {#if mode === Mode.MENU}
    <FlagMenu begin={startGame}/>
  {:else if mode === Mode.GAME}
    <FlagGame diff={difficulty} numGames={10} end={endGame} />
  {:else if mode === Mode.RESULTS}
    <ResultsTable {results} on:retry={()=>{startGame(difficulty)}} on:menu={menu} />
  {/if}
</div>
