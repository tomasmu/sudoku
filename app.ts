import solve from './sudoku'
import Board, {IBoard} from "./board"
import "./style.css"

let emptyBoard = () => new Board([
    [0, 0, 0,    0, 0, 0,    0, 0, 0],
    [0, 0, 0,    0, 0, 0,    0, 0, 0],
    [0, 0, 0,    0, 0, 0,    0, 0, 0],
 
    [0, 0, 0,    0, 0, 0,    0, 0, 0],
    [0, 0, 0,    0, 0, 0,    0, 0, 0],
    [0, 0, 0,    0, 0, 0,    0, 0, 0],
 
    [0, 0, 0,    0, 0, 0,    0, 0, 0],
    [0, 0, 0,    0, 0, 0,    0, 0, 0],
    [0, 0, 0,    0, 0, 0,    0, 0, 0]
]);

var seventeenBoard = () => new Board([
    [0, 0, 0,    0, 0, 0,    0, 0, 1],
    [0, 0, 0,    0, 0, 0,    0, 2, 3],
    [0, 0, 4,    0, 0, 5,    0, 0, 0],
 
    [0, 0, 0,    1, 0, 0,    0, 0, 0],
    [0, 0, 0,    0, 3, 0,    6, 0, 0],
    [0, 0, 7,    0, 0, 0,    5, 8, 0],
 
    [0, 0, 0,    0, 6, 7,    0, 0, 0],
    [0, 1, 0,    0, 0, 4,    0, 0, 0],
    [5, 2, 0,    0, 0, 0,    0, 0, 0]
]);

let tableName = "sudoku";

function createTable(name: string, size: number = 9) {
    let table = document.getElementById(name);
    for (let row = 0; row < size; row++) {
        let tableRow = document.createElement("tr");
        for (let col = 0; col < size; col++) {
            let tableData = document.createElement("td");
            tableData.innerHTML = `<input type="number" class="no-spin" min="1" max="9" maxlength="1">`
            tableRow.appendChild(tableData);
        }
        table.appendChild(tableRow);
    }
}

function fillTable(board: IBoard) {
    let table = document.getElementById(tableName) as HTMLTableElement;
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            (table.rows[row].cells[col].firstChild as HTMLInputElement).value = `${board.getCell([row, col]) || ""}`;
        }
    }
}

function timeTaking(func, board) {
    let start = performance.now();
    func(board);
    let end = performance.now();
    console.log("time in ms : " + Math.round(end - start));
}

declare var window;
window.solveTable = function() {
    let table = document.getElementById(tableName) as HTMLTableElement;
    let board = emptyBoard();
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            //board.board[row][col] = (table.rows[row].cells[col].firstChild as HTMLInputElement).value || 0;
            let value = +(table.rows[row].cells[col].firstChild as HTMLInputElement).value || 0;
            board.setCell([row, col], value);
        }
    }
    //solve(board);
    timeTaking(solve, board);
    fillTable(board);
}

window.clearTable = function() {
    fillTable(emptyBoard());
}

window.unsolveTable = function() {
    fillTable(seventeenBoard());
}

createTable(tableName);
fillTable(emptyBoard());

//todo: solve a random cell
