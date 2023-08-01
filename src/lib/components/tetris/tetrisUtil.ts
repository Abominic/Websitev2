export interface Board {
  width: number,
  height: number,
  state: string
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
  const yLine = 3;
  let offset = yLine * board.width;
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

function updatePiece(piece: Piece, direction: Direction): Piece {
  let x = piece.x;
  let y = piece.y;
  let rot;
  let layout;
  if (direction >= Direction.ROT_ACL) {
    throw "not yet implemented";
  } else {
    rot = piece.rot;
    layout = piece.layout;

    switch(direction) {
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
  }

  return {
    ...piece,
    x: x,
    y: y,
    rot: rot,
    layout: layout
  };
}

export function pieceAction(board: Board, piece: Piece, direction: Direction): Piece | null {
  let newPiece = updatePiece(piece, direction);
  if (direction >= Direction.ROT_ACL) {
    throw "not yet implemented"
  } else {
    return testPieceCollision(board, newPiece)?newPiece:null;
  }
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