const size = 600;
const numberCellsRow = 40;
const framesToSec = 2;


const getRandomGrid = () => {
    const grid = new Array(numberCellsRow);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(numberCellsRow);
        for (let j = 0; j < grid.length; j++) {
            grid[i][j] = Math.floor(Math.random() * 2)
        }
    }
    return grid;
};

const cellColor = '#fff';
const fillColor = '#d3d3d3';
const cellSize = size / numberCellsRow;
const drawGrid = (ctx, grid) => {
    ctx.strokeStyle = cellColor;
    ctx.fillStyle = fillColor;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            let value = grid[i][j];
            if (value) {
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
            }
            ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize)
        }
    }
};


const getNextGrid = (grid) => {
    const nextGrid = new Array(grid.length);
    for (let i = 0; i < grid.length; i++) {
        nextGrid[i] = new Array(grid.length);
        for (let j = 0; j < grid.length; j++) {
            const value = grid[i][j];
            const partner = countPartners(grid, i, j);
            if (!value && partner === 3) {
                nextGrid[i][j] = 1
            } else if ((value === 1) && (partner < 2) || (partner > 2)) {
                nextGrid[i][j] = 0
            } else nextGrid[i][j] = value;
        }
    }
    return nextGrid
};

const countPartners = (grid, x, y) => {
    let sum = 0;
    const numberOfRows = grid.length;
    const numberOfCols = grid[0].length;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            const row = (x + i + numberOfRows) % numberOfRows;
            const cols = (y + j + numberOfCols) % numberOfCols;
            sum += grid[row][cols]
        }
    }
    sum -= grid[x][y];
    return sum;
};

const generation = (ctx, grid) => {
    ctx.clearRect(0, 0, size, size);
    drawGrid(ctx, grid);
    const nextGrid = getNextGrid(grid);
    setTimeout(() => {
        requestAnimationFrame(() => generation(ctx, nextGrid))
    }, 1000/framesToSec);

};


window.onload = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const grid = getRandomGrid();
    generation(ctx, grid);
};