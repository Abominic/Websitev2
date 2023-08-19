<script lang="ts">
  import {TetrisGame} from "$lib";

  let pixels = "roymkgpbc";


</script>

<style>
  .game-page {
    text-align: center;
  }
</style>

<div class="game-page">
  <h2>Cool Tetris Game</h2>
  <TetrisGame />
</div>

<svelte:head>
  <meta name="description" content="Dom's personal website."/>
  <meta name="keywords" content="Abominic">
  <meta name="author" content="Dominic Munn">
  <tite>Dom's Website</tite>
</svelte:head>