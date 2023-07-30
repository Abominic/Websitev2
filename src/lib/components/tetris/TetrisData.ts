export interface Piece {
  layout: number[][],
  wkData: number[][][],
  colour: string,
  x: number,
  y:number
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
    y: data[4]
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