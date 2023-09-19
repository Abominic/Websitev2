<script lang="ts">
  import {SSGame} from "$lib";
</script>

<style>
  .game-page {
    margin-left: auto;
    margin-right: auto;
  }
</style>

<div class="game-page">
  <SSGame />
</div>

<svelte:head>
  <!-- prevent this page from ever appearing in search -->
  <meta name="robots" content="noindex" />
</svelte:head>