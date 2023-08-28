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
	import Overlay from "./Overlay.svelte";

  enum GameState {
    INTRO,
    PLAYING,
    END
  }

  const boardSettings = {
    width: 10,
    height: 24,
    yline: 3
  };
  
  let board: Board;
  let piece: Piece;
  let nextPiece: string;
  let recent: RecentPieces;
  let tickInterval: number;
  let state = GameState.INTRO;
  let score: number;
  let bestScore: number | null = null;

  if (browser) {
    let scoreStr = localStorage.getItem("bestScore");
    if (scoreStr) {
      bestScore = parseInt(scoreStr);
    }
  }

  let nextPieceBoard: Board = {
    width: 6,
    height: 6,
    yline: -1,
    state: "k".repeat(6*6)
  };

  function setup() {
    score = 0;
    recent = createRecentPieces();
    board =  {
      ...boardSettings,
      state: "k".repeat(24*10)
    };
  };

  function setupPiece() {
    let curr = randomPieceSelect(recent);
    let next = randomPieceSelect(curr[1]);
    piece = newPiece(curr[0]);
    nextPiece = next[0];
    recent = next[1];
  }

  setup();

  function solidify() {
    if (piece) {
      board.state = bakePiece(board, piece);
      let [newBoard, scoreDiff] = rowClear(board);
      board = newBoard;
      score += scoreDiff;
      piece = newPiece(nextPiece);
      [nextPiece, recent] = randomPieceSelect(recent);

      if (checkForLoss(board)) {
        endGame();
      }
    } 
  };
  
  function handleKeypress(e: KeyboardEvent) {
    if (state !== GameState.PLAYING) {
      return;
    }

    if (e.code === "KeyK") { //Reset when K is pressed.
      endGame();
      return;
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
  }

  function tickFunction() {
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

  function startGame() {
    setup();
    setupPiece();
    state = GameState.PLAYING;
    tickInterval = tickFunction();
  }


  function endGame() {
    state = GameState.END;
    clearInterval(tickInterval);

    if ((!bestScore || score > bestScore) && score > 0) {
      bestScore = score;
      localStorage.setItem("bestScore", score.toString());
    }
  }

  onDestroy(()=> {
    clearInterval(tickInterval);
  });

  $: renderedBoard = piece?renderBoard(board, piece):board.state;
  $: renderedNext = nextPiece?renderBoard(nextPieceBoard, getNextPreview(nextPiece)):nextPieceBoard.state;

  
</script>

<style>
  .game {
    display: flex;
    gap: 2em;
  }

  .controls-list {
    font-weight: bold;
    list-style-type: none;
    text-align: right;
  }
</style>

<div class="game">

  {#if state === GameState.INTRO}
    <Overlay>
      <h3>SquareStack</h3>
      <p>Fill up the rows with pieces to achieve the highest score possible.</p>
      <button class="green" on:click={startGame}>Start</button>
    </Overlay>
  {:else if state === GameState.END}
    <Overlay>
      <h3>Game Over</h3>
      <p>You scored: {score}</p>
      <button class="green" on:click={startGame}>Try Again</button>
    </Overlay>
  {/if}

  <div>
    <h2>Score: {score}</h2>
    {#if bestScore}
      <h3>Best: {bestScore}</h3>
    {/if}
    <button on:click={endGame}>Give Up<KeyIcon>K</KeyIcon></button>
    <h2>Controls:</h2>
    <ul class="controls-list">
      <li>Left: <KeyIcon>A</KeyIcon></li>
      <li>Down: <KeyIcon>S</KeyIcon></li>
      <li>Right: <KeyIcon>D</KeyIcon></li>
      <li>Rotate Left: <KeyIcon>Q</KeyIcon></li>
      <li>Rotate Right: <KeyIcon>E</KeyIcon></li>
    <ul>

  </div>
  <Grid width={board.width} height={board.height} colours={renderedBoard} bordered={true}></Grid>
  <Grid width={nextPieceBoard.width} height={nextPieceBoard.height} colours={renderedNext} bordered={true}></Grid> 
</div>

<svelte:window on:keydown={handleKeypress}/>