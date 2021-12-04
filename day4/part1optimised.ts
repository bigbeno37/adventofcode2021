import {readFile} from "fs/promises";

const toi = Number.parseInt;

(async () => {
    const lines = (await readFile("./day4/data.txt", "utf-8")).split("\n");

    const winningNumbers = lines[0].split(",").map(str => toi(str));

    type MarkedNumber = { marked: boolean, num: number };
    type BingoRow = MarkedNumber[];
    type Board = BingoRow[];
    type CompletedBoard = { numbersUntilCompletion: number, board: Board, winningNumber: number };
    let completedBoards: CompletedBoard[] = [];

    let currentBoard: Board = [];
    for (let i = 2; i < lines.length; i++) {
        if (lines[i].length === 0) {

            let stop = false;
            winningNumbers.forEach((num, index) => {
                if (stop) return;

                let markedRow = [true, true, true, true, true];
                currentBoard.forEach((row, y) => {
                    if (stop) return;

                    let completedRow = true;
                    row.forEach((col, x) => {
                        if (col.num === num) col.marked = true;

                        if (!col.marked) completedRow = false;
                        if (markedRow[x]) markedRow[x] = col.marked;
                    });

                    if (completedRow) {
                        stop = true;
                        completedBoards.push({ numbersUntilCompletion: index, board: currentBoard, winningNumber: num });
                    }
                });

                if (stop) return;

                if (markedRow.some(item => item)) {
                    stop = true;
                    completedBoards.push({ numbersUntilCompletion: index, board: currentBoard, winningNumber: num });
                }
            });

            currentBoard = [];
        } else {
            const toMarkedNum = (num: number) => ({marked: false, num});
            currentBoard.push(lines[i].split(" ").filter(num => num.length > 0).map(str => toMarkedNum(toi(str))));
        }
    }

    completedBoards = completedBoards.sort((a, b) => a.numbersUntilCompletion - b.numbersUntilCompletion);

    let sumOfUnmarkedNumbers = 0;
    completedBoards[0].board.forEach(row => row.forEach(num => sumOfUnmarkedNumbers += !num.marked ? num.num : 0));

    console.log(sumOfUnmarkedNumbers * completedBoards[0].winningNumber);
})();