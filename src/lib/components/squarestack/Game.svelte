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
	  getNextPreview,

	  type RecentPieces,

	  createRecentPieces


  } from "./ssUtil";
	import KeyIcon from "./KeyIcon.svelte";


  const boardSettings = {
    width: 10,
    height: 24,
    yline: 3
  };
  
  let board: Board;
  let piece: Piece;
  let nextPiece: string;
  let recent: RecentPieces;
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
    recent = createRecentPieces();
    if (browser) {
      let curr = randomPieceSelect(recent);
      let next = randomPieceSelect(curr[1]);
      piece = newPiece(curr[0]);
      nextPiece = next[0];
      recent = next[1];
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
        [nextPiece, recent] = randomPieceSelect(recent);

        if (checkForLoss(board)) {
          //TODO change to an actual loss screen.
          setup();
        }
      } 
    };

    let tickInterval = tickFunction();
    
    handleKeypress = (e) => {
      if (e.code === "KeyK") { //Reset when K is pressed.
        setup();
      }

      let direction = keyToDirection(e);
      if (direction && piece) {
        let newPiece = pieceAction(board, piece, direction);
        if (newPiece) {
          piece = newPiece;
          if (direction === Direction.DOWN) { //Reset tick timer.
            let testNext = pieceAction(board, newPiece, Direction.DOWN); //Check next.
            if (testNext) {
              clearInterval(tickInterval);
              tickInterval = tickFunction();
            } else {
              solidify();
            }
          }
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
  <div>
    <h2>Score: {score}</h2>
    <button on:click={setup}>Give Up<KeyIcon>K</KeyIcon></button>
    <h3>Controls:</h3>
    <p>Left: <KeyIcon>A</KeyIcon></p>
    <p>Down: <KeyIcon>S</KeyIcon></p>
    <p>Right: <KeyIcon>D</KeyIcon></p>
    <p>Rotate Left: <KeyIcon>Q</KeyIcon></p>
    <p>Rotate Right: <KeyIcon>E</KeyIcon></p>

  </div>
  <Grid width={board.width} height={board.height} colours={renderedBoard} bordered={true}></Grid>
  <Grid width={nextPieceBoard.width} height={nextPieceBoard.height} colours={renderedNext} bordered={true}></Grid> 
</div>

<svelte:window on:keydown={handleKeypress}/>