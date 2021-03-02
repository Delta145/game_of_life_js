const rows = 30;
const cols = 30;
const currGen = [rows];
const nextGen = [rows];

let started = false;
let timer;
const EVOLUTION_SPEED = 1000;

function cellClick() {
    let loc = this.id.split("_");
    let row = Number(loc[0]);
    let col = Number(loc[1]);
    if (this.className === 'alive') {
        this.setAttribute('class', 'dead');
        currGen[row][col] = 0;
    } else {
        this.setAttribute('class', 'alive');
        currGen[row][col] = 1;
    }
}

const getNeighborCount = (cellRow, cellCol) => {
    let count = 0;
    let nRow = Number(cellRow);
    let nCol = Number(cellCol);

    const isNotFirstRow = (row) => row - 1 >= 0
    const isNotFirstCol = (col) => col - 1 >= 0
    const isNotLastCol = (col) => col + 1 < cols
    const isNotLastRow = (row) => row + 1 < rows

    if (isNotFirstRow(nRow)) {
        if (currGen[nRow - 1][nCol] === 1)
            count++;
    }

    // check if not upper left corner
    if (isNotFirstRow(nRow) && isNotFirstCol(nCol)) {
        if (currGen[nRow - 1][nCol - 1] === 1)
            count++;
    }
    // check if not upper right corner
    if (isNotFirstRow(nRow) && isNotLastCol(nCol)) {
        if (currGen[nRow - 1][nCol + 1] === 1)
            count++;
    }
    // Make sure we are not on the first column
    if (isNotFirstCol(nCol)) {
        //Check left neighbor
        if (currGen[nRow][nCol - 1] === 1)
            count++;
    }
    // Make sure we are not on the last column
    if (isNotLastCol(nCol)) {
        //Check right neighbor
        if (currGen[nRow][nCol + 1] === 1)
            count++;
    }
    // Make sure we are not on the bottom left corner
    if (isNotLastRow(nRow) && isNotFirstCol(nCol)) {
        //Check bottom left neighbor
        if (currGen[nRow + 1][nCol - 1] === 1)
            count++;
    }

    if (isNotLastRow(nRow) && isNotLastCol(nCol)) {
        //Check bottom right neighbor
        if (currGen[nRow + 1][nCol + 1] === 1)
            count++;
    }

    if (isNotLastRow(nRow)) {
        if (currGen[nRow + 1][nCol] === 1)
            count++;
    }

    return count;
}

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
            // Set nextGen back to empty
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

const startGame = (btn) => {
    started = true;
    btn.value = 'Stop Reproducing';
    evolve();
}

const stopGame = (btn) => {
    started = false;
    btn.value = 'Start Reproducing';
    clearTimeout(timer);
}


const startOrStopGame = () => {
    const startStopBtn = document.querySelector('#btn-start-stop');
    if (!started) {
        startGame(startStopBtn);
    } else {
        stopGame(startStopBtn);
    }
}

const evolve = () => {
    createNextGen(); // Apply the game rules
    updateCurrGen(); // Set Current values from new generation
    updateWorld(); // Update the view
    if (started) {
        timer = setTimeout(evolve, EVOLUTION_SPEED);
    }
}

const resetWorld = () => {
    location.reload();
}

// initWorld Module start

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

const initWorld = () => {
    createWorld();
    createGenerationArrays();
    initGenArrays();
}

// initWorld Module end

window.onload = () => {
    initWorld();
}