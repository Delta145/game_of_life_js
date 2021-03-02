import {cellClick, cols, currGen, nextGen, rows} from "./main.js";

const createWorldCells = (tbl) => {
   for (let i = 0; i < rows; i++) {
      const tr = document.createElement('tr');
      for (let j = 0; j < cols; j++) {
         const cell = document.createElement('td');
         cell.setAttribute('id', i + '_' + j);
         cell.setAttribute('class', 'dead');
         cell.addEventListener('click', cellClick);
         tr.appendChild(cell);
      }
      tbl.appendChild(tr);
   }
}

const createWorld = () => {
   const world = document.querySelector('#world');
   const tbl = document.createElement('table');
   tbl.setAttribute('id', 'world-grid');
   createWorldCells(tbl);
   world.appendChild(tbl);
}

const createGenerationArrays = () => {
   for (let i = 0; i < rows; i++) {
      currGen[i] = new Array(cols);
      nextGen[i] = new Array(cols);
   }
}

const initGenArrays = () => {
   for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
         currGen[i][j] = 0;
         nextGen[i][j] = 0;
      }
   }
}

export const initWorld = () => {
   createWorld();
   createGenerationArrays();
   initGenArrays();
}