import Board, {IBoard} from "./board"   //default (kan renamas), {medlemsimport}

export default function solve(board: IBoard, cell: [number, number] = [0, 0]): boolean {
    let emptyCell = board.getEmptyCell(cell);
    if (!emptyCell)
        return true;
    for (let guess = 1; guess <= 9; guess++) {
        if (board.isValidGuess(emptyCell, guess)) {
            board.setCell(emptyCell, guess);
            if (solve(board, emptyCell))
                return true;
            else 
                board.clearCell(emptyCell);
        }
    }
    return false;
}
