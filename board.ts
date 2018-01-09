export interface IBoard {
    //alla publika metoder är trevligt att ha här (interface finns inte i javascript)
    getEmptyCell([cell]: [number, number]): [number, number];
    isValidGuess([cell]: [number, number], guess: number): boolean;
    getCell([cell]: [number, number]): number;
    setCell([cell]: [number, number], value: number): void;
    clearCell([cell]: [number, number]): void;
    //board: number[][];
}

export default class Board implements IBoard {
    constructor(board: number[][]) {    //ugly: Array<Array<number>>
        this.board = board;
    }

    private board = [];
    //rowFlag = [0, 0, 0,    0, 0, 0,    0, 0, 0];
    //colFlag = [0, 0, 0,    0, 0, 0,    0, 0, 0];
    //sqrFlag = [0, 0, 0,    0, 0, 0,    0, 0, 0];
    //sqrNums = [
    //    [0, 0, 0,    1, 1, 1,    2, 2, 2],
    //    [0, 0, 0,    1, 1, 1,    2, 2, 2],
    //    [0, 0, 0,    1, 1, 1,    2, 2, 2],
    //    [3, 3, 3,    4, 4, 4,    5, 5, 5],
    //    [3, 3, 3,    4, 4, 4,    5, 5, 5],
    //    [3, 3, 3,    4, 4, 4,    5, 5, 5],
    //    [6, 6, 6,    7, 7, 7,    8, 8, 8],
    //    [6, 6, 6,    7, 7, 7,    8, 8, 8],
    //    [6, 6, 6,    7, 7, 7,    8, 8, 8]
    //];
    private floorMultipleOf3 = [0, 0, 0, 3, 3, 3, 6, 6, 6];
    
    getEmptyCell([row, col]: [number, number]): [number, number] {
        for (; row < 9; row++, col = 0)
            for (; col < 9; col++)
                if (this.board[row][col] == 0)
                    return [row, col];
        //return undefined; //this happens by default
    }

    isValidGuess([row, col]: [number, number], guess: number): boolean {
        ////let [row, col] = cell;    //destructuring
        //if (this.isFlagSet(guess, [row, col]))
        //    return false;
        //else
        //    return true;

        //guess in row or col
        for (let i = 0; i < 9; i++)
            if (guess == this.board[row][i] || guess == this.board[i][col])
                return false;
        //guess in square
        
        row = this.floorMultipleOf3[row];
        col = this.floorMultipleOf3[col];
        for (let iRow = 0; iRow < 3; iRow++)
            for (let iCol = 0; iCol < 3; iCol++)
                if (guess == this.board[row + iRow][col + iCol])
                    return false;
        return true;
    }

    getCell([row, col]: [number, number]): number {
        return this.board[row][col];
    }
    
    setCell([row, col]: [number, number], value: number): void {
        this.board[row][col] = value;
        //this.setFlag(value, [row, col]);
    }

    clearCell([row, col]: [number, number]): void {
        //this.clearFlag([row, col]);
        this.board[row][col] = 0;
    }

    //isFlagSet([row, col]: [number, number], value: number): boolean {
    //    let bitFlag = 1 << value;
    //    if (this.rowFlag[row] & bitFlag ||
    //        this.colFlag[col] & bitFlag ||
    //        this.sqrFlag[this.sqrNums[row][col]] & bitFlag)
    //        return true;
    //    else
    //        return false;
    //}
    
    //setFlag([row, col]: [number, number], value: number): void {
    //    let bitFlag = 1 << value;
    //    //let sqr = 3 * Math.floor(row / 3) + Math.floor(col / 3);
    //
    //    this.rowFlag[row] |= bitFlag;
    //    this.colFlag[col] |= bitFlag;
    //    this.sqrFlag[this.sqrNums[row][col]] |= bitFlag;
    //}
    
    //clearFlag([row, col]: [number, number]): void {
    //    let value = this.board[row][col];
    //    let bitFlag = ~(1 << value);
    //    
    //    this.rowFlag[row] &= bitFlag;
    //    this.colFlag[col] &= bitFlag;
    //    this.sqrFlag[this.sqrNums[row][col]] &= bitFlag;
    //}
}
