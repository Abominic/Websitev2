<script lang="ts">
  import {SSGame} from "$lib";

  let pixels = "roymkgpbc";


</script>

<style>
  .game-page {
    text-align: center;
  }
</style>

<div class="game-page">
  <SSGame />
</div>

<svelte:head>
  <!-- prevent this page from ever appearing in search -->
  <meta name="robots" content="noindex" />
</svelte:head>