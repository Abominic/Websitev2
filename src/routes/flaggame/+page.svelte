<script lang="ts">
	import { FlagMenu } from "$lib";


  enum Mode {
    MENU,
    GAME,
    RESULTS,
  }

  let mode = Mode.MENU;

</script>

<style>
  .game-page {
    text-align: center;
  }
</style>

<div class="game-page">
  <h2>Dom's Flag Guessing Game (Second Edition)</h2>
  {#if mode === Mode.MENU}
    <FlagMenu/>
  {/if}
</div>