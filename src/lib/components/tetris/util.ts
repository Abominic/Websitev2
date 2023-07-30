export function addBorders(width: number, height: number, colours: string) {
  
  const pixelData: string[] = [];


  const actualWidth = width+2;
  const actualHeight = height+2;
  
  let index = 0;
  
  for (let row = 0; row < actualHeight; row++) {
    for (let col = 0; col < actualWidth; col++) {
      if (row === 0 || row === actualHeight-1 || col === 0 || col === actualWidth-1) { //Check for a border pixel
        pixelData.push("n");
      } else {
        pixelData.push(colours[index++]);
      }
    }
  }

  return pixelData.join("");
}


