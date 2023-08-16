<script lang="ts">
	import { FlagGame, FlagMenu } from "$lib";
	import { Difficulty } from "$lib/components/flaggame/flaggame";
	import Game from "$lib/components/tetris/Game.svelte";


  enum Mode {
    MENU,
    GAME,
    RESULTS,
  }

  let mode = Mode.MENU;
  let difficulty = -1;

  function startGame(e: any) {
    difficulty = e.detail.diff;
    mode = Mode.GAME;
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
    <FlagMenu on:begin={startGame}/>
  {:else if mode === Mode.GAME}
    <FlagGame diff={difficulty} numGames={10}></FlagGame>
  {/if}
</div>