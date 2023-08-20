<script lang="ts">
	import { browser } from "$app/environment";
	import { onDestroy } from "svelte";
	import Grid from "./Grid.svelte";
	import {
    newPiece,
    type Piece,
    type Board,
    Direction,
    randomPieceSelect,
    bakePiece,
    renderBoard,
    pieceAction,
    keyToDirection,
    rowClear,
    checkForLoss, 
	  getNextPreview
  } from "./ssUtil";


  const boardSettings = {
    width: 10,
    height: 24,
    yline: 3
  };
  
  let board: Board;
  let piece: Piece;
  let nextPiece: string;
  let score: number;
  let handleKeypress: (e: KeyboardEvent)=>void;

  let nextPieceBoard: Board = {
    width: 6,
    height: 6,
    yline: -1,
    state: "k".repeat(6*6)
  };

  const setup = () => {
    score = 0;

    if (browser) {
      piece = newPiece(randomPieceSelect());
      nextPiece = randomPieceSelect();
    }

    board =  {
      ...boardSettings,
      state: "k".repeat(24*10)
    };
  };

  setup();
  if (browser) {

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
      }, 500);
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
          //TODO change to an actual loss screen.
          setup();
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
  $: renderedNext = nextPiece?renderBoard(nextPieceBoard, getNextPreview(nextPiece)):nextPieceBoard.state;

  
</script>

<style>
  .game {
    display: flex;
    gap: 2em;
  }
</style>

<div class="game">
  <h2>Score {score}</h2>
  <Grid width={board.width} height={board.height} colours={renderedBoard} bordered={true}></Grid>
  <Grid width={nextPieceBoard.width} height={nextPieceBoard.height} colours={renderedNext} bordered={true}></Grid> 
</div>

<svelte:window on:keydown={handleKeypress}/>