import {currGen, getNeighborCount, nextGen} from "./main.js";

const createNextGen = () => {
    for (const row in currGen) {
        for (const col in currGen[row]) {
            const neighbors = getNeighborCount(row, col);
            if (currGen[row][col] === 1) {
                if (neighbors < 2) {
                    nextGen[row][col] = 0;
                } else if (neighbors === 2 || neighbors === 3) {
                    nextGen[row][col] = 1;
                } else if (neighbors > 3) {
                    nextGen[row][col] = 0;
                }
            } else if (currGen[row][col] === 0) {
                if (neighbors === 3) {
                    nextGen[row][col] = 1;
                }
            }
        }
    }
}

const updateCurrGen = () => {
    for (const row in currGen) {
        for (const col in currGen[row]) {
            currGen[row][col] = nextGen[row][col];
            nextGen[row][col] = 0;
        }
    }
}

const updateWorld = () => {
    for (const row in currGen) {
        for (const col in currGen[row]) {
            const cell = document.getElementById(row + '_' + col);
            if (currGen[row][col] === 0) {
                cell.setAttribute('class', 'dead');
            } else {
                cell.setAttribute('class', 'alive');
            }
        }
    }
}

export const commenceWorldCycle = () => {
    createNextGen(); // Apply the game rules
    updateCurrGen(); // Set Current values from new generation
    updateWorld(); // Update the view
}

