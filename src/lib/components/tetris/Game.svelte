<script lang="ts">
	import Grid from "./Grid.svelte";

  const boardWidth = 10;
  const boardHeight = 24;

  let boardState = "k".repeat(boardWidth*boardHeight);
  
  


  const renderBoard = () => {
    return boardState;
  };
</script>

<style>


</style>

<div class="game">
  <Grid width={boardWidth} height={boardHeight} colours={renderBoard()} bordered={true}></Grid>
</div>