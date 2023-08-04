export interface Board {
  width: number,
  height: number,
  state: string,
  yline: number
}

export interface Piece {
  layout: number[][],
  wkData: number[][][],
  colour: string,
  x: number,
  y:number,
  rot: number
}

function combineBoardPiece(board: Board, piece: Piece): string[]{
  let data = [];
  for (let i = 0; i < board.state.length; i++) {
    let x = i%board.width;
    let y = Math.floor(i/board.width);
    if  (isPiecePixel(piece, x, y)){
      data.push(piece.colour);
    } else {
      data.push(board.state[i]);
    }
  }
  return data;
}

export function renderBoard(board: Board, piece: Piece) {
  let prerender = combineBoardPiece(board, piece);
  let offset = board.yline * board.width;
  for (let i = offset; i < offset + board.width; i++) {
    if (prerender[i] === "k"){ //I should have done this part first but oh well.
      prerender[i] = "m";
    }
  }
  return prerender.join("")
}

export function bakePiece(board: Board, piece: Piece): string {
  return combineBoardPiece(board, piece).join("");
}

export function checkForLoss(board: Board): boolean {
  let start = board.width * board.yline;
  let end = start + board.width;

  for (let i = start; i < end; i++) {
    if (board.state[i] !== "k") {
      return true;
    }
  }
  
  return false;
}


function isPiecePixel(piece: Piece, abs_x: number, abs_y: number): boolean { //This uses absolute values.
  let x = abs_x - piece.x;
  let y = abs_y - piece.y;
  if (x >= 0 && y >= 0 && x < piece.layout[0].length && y < piece.layout[1].length) {
    return piece.layout[y][x]===1;
  } else {
    return false;
  }
}

export enum Direction {
  UP, 
  DOWN,
  LEFT,
  RIGHT,

  ROT_ACL = 4,
  ROT_CL,
}

function testPieceCollision(board: Board, piece: Piece): boolean {
  for (let dy = 0; dy < piece.layout.length; dy++) { //Iterate over every pixel in the piece.
    let absY = piece.y + dy;
    

    for (let dx = 0; dx < piece.layout[0].length; dx++) {
      let absX = piece.x + dx;
      if (isPiecePixel(piece, absX, absY) && (absX < 0 || absX >= board.width || absY < 0 || absY >= board.height)) { //Horizontal bounds check
        return false;
      }

      if (piece.layout[dy][dx] === 1 && board.state[absY*board.width+absX] !== "k") { //Collision Check
        return false;
      }
    }
  }   

  return true;
}

export function keyToDirection(e: KeyboardEvent): Direction | null {
  switch (e.code) {
    case "KeyA":
      return Direction.LEFT;
    case "KeyD":
      return Direction.RIGHT;
    case "KeyS":
      return Direction.DOWN;
    case "KeyQ":
      return Direction.ROT_ACL;
    case "KeyE":
      return Direction.ROT_CL;
    default:
      return null;
  }
}

function updatePiece(piece: Piece, dir: Direction): Piece {
  let x = piece.x;
  let y = piece.y;
  let rot;
  let layout;
  if (dir < Direction.ROT_ACL){
    rot = piece.rot;
    layout = piece.layout;

    switch(dir) {
      case Direction.UP:
        y -= 1;
        break;
      case Direction.DOWN:
        y += 1;
        break;
      case Direction.LEFT:
        x -= 1;
        break;
      case Direction.RIGHT:
        x += 1;
        break;
      default:
        throw "invalid direction"
    }
  } else {
    let is_acl = dir === Direction.ROT_ACL;
    rot = ((is_acl)?(piece.rot+1):(piece.rot+3))%4;
    layout  = [];
    for (let y = 0; y < piece.layout.length; y++) {
      let row = [];
      for (let x = 0; x < piece.layout[0].length; x++){
        let oldX = is_acl?(piece.layout.length - y - 1):y;
        let oldY = is_acl?x:(piece.layout[0].length - x - 1);

        row.push(piece.layout[oldY][oldX]);
      }
      layout.push(row);
    }
  }

  return {
    ...piece,
    x,
    y,
    rot,
    layout
  };
}

export function pieceAction(board: Board, piece: Piece, dir: Direction): Piece | null {
  let newPiece = updatePiece(piece, dir);
  if (dir >= Direction.ROT_ACL) {
    let x = newPiece.x;
    let y = newPiece.y;
    let oldRot = piece.rot;

    let idx = wkIndices.findIndex(x=>{
      return x[0] == oldRot, x[1] == newPiece.rot;
    });

    if (idx === -1) {
      throw "rotation error";
    } 
    for (let [dx, dy] of piece.wkData[idx]) {
      newPiece.x = x + dx;
      newPiece.y = y + dy;
      if (testPieceCollision(board, newPiece)) {
        return newPiece;
      }
    }

    return null;
  } else {
    return testPieceCollision(board, newPiece)?newPiece:null;
  }
}

export function rowClear(board: Board): [Board, number]{
  let score = 0;
  let currentRow = board.height-1;
  let currentState = board.state;
  while (currentRow >= 0) {
    let startIdx = currentRow*board.width;
    let endIdx = (currentRow+1)*board.width;
    let rowData = currentState.slice(startIdx, endIdx);
    if (rowData.indexOf("k") === -1) {
      currentState = "k".repeat(board.width) + currentState.slice(0,startIdx) + currentState.slice(endIdx);
      score += 1;
    } else {
      currentRow -= 1;
    }
  }

  return [{
    ...board,
    state: currentState,
  }, score];
}

export function randomPieceSelect(): string {
  const availablePieces = ["I", "J", "L", "O", "S", "T", "Z"];
  return availablePieces[Math.floor(Math.random()*availablePieces.length)]; //Select random piece.
}

export function newPiece(typ: string): Piece {
  let data: [number[][], number[][][], string, number, number];
  switch (typ) {
    case "I":
      data = [
        [
          [0,0,0,0],
          [1,1,1,1],
          [0,0,0,0],
          [0,0,0,0]
        ],
        wallKickData2,
        "c",
        3,
        2];
      break;
    case "J":
      data = [
        [
          [1,0,0],
          [1,1,1],
          [0,0,0]
        ],
        wallKickData1,
        "b",
        3,
        2];
      break;
    case "L":
      data = [
        [
          [0,0,1],
          [1,1,1],
          [0,0,0]
        ],
        wallKickData1,
        "o",
        3,
        2];
      break;
    case "O":
      data = [
        [
          [1,1],
          [1,1],
        ],
        wallKickData3,
        "y",
        4,
        2];
      break;
    case "S":
      data = [
        [
          [0,1,1],
          [1,1,0],
          [0,0,0]
        ],
        wallKickData1,
        "g",
        3,
        2];
      break;
    case "T":
      data = [
        [
          [0,1,0],
          [1,1,1],
          [0,0,0]
        ],
        wallKickData1,
        "p",
        3,
        2];
      break;
    case "Z":
      data = [
        [
          [1,1,0],
          [0,1,1],
          [0,0,0]
        ],
        wallKickData1,
        "r",
        3,
        2];
      break;
    default:
      throw "invalid piece";
  }

  return {
    layout: data[0],
    wkData: data[1],
    colour: data[2],
    x: data[3],
    y: data[4],
    rot: 0
  }
}

const wkIndices = [
  [0, 1],
  [1, 0],
  [1, 2],
  [2, 1],
  [2, 3],
  [3, 2],
  [3, 0],
  [0, 3]
];

const wallKickData1 = [ //https://tetris.wiki/Super_Rotation_System
  [[0,0], [-1,0], [-1,1], [0,-2], [-1,-2]],
  [[0,0], [1,0], [1,-1], [0,2], [1,2]],
  [[0,0], [1,0], [1,-1], [0,2], [1,2]],
  [[0,0], [-1,0], [-1,1], [0,-2], [-1,-2]],
  [[0,0], [1,0], [1,1], [0,-2], [1,-2]],
  [[0,0], [-1,0], [-1,-1], [0,2], [-1,2]],
  [[0,0], [-1,0], [-1,-1], [0,2], [-1,2]],
  [[0,0], [1,0], [1,1], [0,-2], [1,-2]]
];

const wallKickData2 = [
  [[0,0], [-2,0], [1,0], [-2,-1], [1,2]],
  [[0,0], [2,0], [-1,0], [2,1], [-1,-2]],
  [[0,0], [-1,0], [2,0], [-1,2], [2,-1]],
  [[0,0], [1,0], [-2,0], [1,-2], [-2,1]],
  [[0,0], [2,0], [-1,0], [2,1], [-1,-2]],
  [[0,0], [-2,0], [1,0], [-2,-1], [1,2]],
  [[0,0], [1,0], [-2,0], [1,-2], [-2,1]],
  [[0,0], [-1,0], [2,0], [-1,2], [2,-1]]
];

const wallKickData3 = [ //Blank data for O piece
  [[0,0]],
  [[0,0]],
  [[0,0]],
  [[0,0]],
  [[0,0]],
  [[0,0]],
  [[0,0]],
  [[0,0]]
];