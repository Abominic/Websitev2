<script lang="ts">
	import { browser } from "$app/environment";
	import { onDestroy } from "svelte";
	import Grid from "./Grid.svelte";
	import { newPiece, type Piece, type Board, Direction, randomPieceSelect, bakePiece, renderBoard, pieceAction, keyToDirection, rowClear, checkForLoss } from "./tetrisUtil";

  let board: Board = {
    width: 10,
    height: 24,
    state: "k".repeat(24*10),
    yline: 3
  }
  
  let piece: Piece | null = null;
  let score = 0;
  let handleKeypress: (e: KeyboardEvent)=>void;
  if (browser) {
    let nextPiece = randomPieceSelect();
    piece = newPiece(randomPieceSelect());
    
    let tickFunction = () => {
      return setInterval(()=>{
        if (piece && nextPiece) { //This is to make TypeScrpt shush.
          let collisionResult = pieceAction(board, piece, Direction.DOWN);
          if (!collisionResult) {
            solidify();
          } else {
            piece = collisionResult;
          }
        } else {
          throw "an error occurred.";
        }
      }, 500)
    };

    let solidify = () => {
      if (piece) {
        board.state = bakePiece(board, piece);
        let [newBoard, scoreDiff] = rowClear(board);
        board = newBoard;
        score += scoreDiff;
        piece = newPiece(nextPiece);
        nextPiece = randomPieceSelect();

        if (checkForLoss(board)) {

        }
      } 
    };

    let tickInterval = tickFunction();
    
    handleKeypress = (e) => {
      let direction = keyToDirection(e);
      if (direction && piece) {
        let newPiece = pieceAction(board, piece, direction);
        if (newPiece) {
          if (direction === Direction.DOWN) { //Reset tick timer.
            clearInterval(tickInterval);
            tickInterval = tickFunction();
          }
          piece = newPiece
        } else if (direction === Direction.DOWN) {
          solidify();
        }
      }
    };

    onDestroy(()=> {
      clearInterval(tickInterval);
    });
  } else {
    handleKeypress = (e)=>{};
  }

  $: renderedBoard = piece?renderBoard(board, piece):board.state;

  
</script>

<div class="game">
  <h2>Score {score}</h2>
  <Grid width={board.width} height={board.height} colours={renderedBoard} bordered={true}></Grid>
</div>

<svelte:window on:keydown={handleKeypress}/>