import {initWorld} from "./WorldInit.js";
import {commenceWorldCycle} from "./WorldGeneration.js";

const STOP_REPRODUCING_LABEL = 'Stop Reproducing';
const START_REPRODUCING_LABEL = 'Start Reproducing';

export const rows = 30;
export const cols = 30;
export const currGen = [rows];
export const nextGen = [rows];

let started = false;
let timer;
const EVOLUTION_SPEED = 1000;

export function cellClick() {
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

export const getNeighborCount = (cellRow, cellCol) => {
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
    if (isNotFirstRow(nRow) && isNotFirstCol(nCol)) {
        if (currGen[nRow - 1][nCol - 1] === 1)
            count++;
    }
    if (isNotFirstRow(nRow) && isNotLastCol(nCol)) {
        if (currGen[nRow - 1][nCol + 1] === 1)
            count++;
    }
    if (isNotFirstCol(nCol)) {
        if (currGen[nRow][nCol - 1] === 1)
            count++;
    }
    if (isNotLastCol(nCol)) {
        if (currGen[nRow][nCol + 1] === 1)
            count++;
    }
    if (isNotLastRow(nRow) && isNotFirstCol(nCol)) {
        if (currGen[nRow + 1][nCol - 1] === 1)
            count++;
    }

    if (isNotLastRow(nRow) && isNotLastCol(nCol)) {
        if (currGen[nRow + 1][nCol + 1] === 1)
            count++;
    }

    if (isNotLastRow(nRow)) {
        if (currGen[nRow + 1][nCol] === 1)
            count++;
    }

    return count;
}

const startGame = (btn) => {
    started = true;
    btn.value = STOP_REPRODUCING_LABEL;
    evolve();
}

const stopGame = (btn) => {
    started = false;
    btn.value = START_REPRODUCING_LABEL;
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
    commenceWorldCycle();
    if (started) {
        timer = setTimeout(evolve, EVOLUTION_SPEED);
    }
}

const resetWorld = () => {
    location.reload();
}

const applyListeners = () => {
    const btnStartStop = document.querySelector('#btn-start-stop');
    btnStartStop.addEventListener('click', startOrStopGame)
    const btnEvolve = document.querySelector('#btn-evolve');
    btnEvolve.addEventListener('click', evolve);
    const btnReset = document.querySelector('#btn-reset');
    btnReset.addEventListener('click', resetWorld);
}

window.onload = () => {
    applyListeners();
    initWorld();
}