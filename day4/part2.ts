import { readFile } from "fs/promises";

const toi = Number.parseInt;

(async () => {
    const lines = (await readFile("./day4/data.txt", "utf-8")).split("\n");

    const winningNumbers = lines[0].split(",").map(str => toi(str));

    type MarkedNumber = { marked: boolean, num: number };
    type BingoRow = MarkedNumber[];
    type Board = BingoRow[];
    const boards: Board[] = [];

    let currentBoard: Board = [];
    for (let i = 2; i < lines.length; i++) {
        if (lines[i].length === 0) {
            boards.push(currentBoard);
            currentBoard = [];
        } else {
            const toMarkedNum = (num: number) => ({ marked: false, num });
            currentBoard.push(lines[i].split(" ").filter(num => num.length > 0).map(str => toMarkedNum(toi(str))));
        }
    }

    let currentWinningNum = -1;
    let lastWinningBoardIndex = -1;
    let stop = false;
    winningNumbers.forEach(num => {
        if (stop) return;

        currentWinningNum = num;

        const unwonBoards = [];
        boards.forEach((board, boardIndex) => {
            let won = false;

            board.forEach((row, y) => {
                row.forEach((markedNum, x) => {
                    if (markedNum.num === num) {
                        markedNum.marked = true;
                    }
                });
            });

            for (let y = 0; y < board.length; y++) {
                let row = board[y];
                let allXMarked = true;
                for (let x = 0; x < row.length; x++) {
                    if (!row[x].marked) allXMarked = false;
                }

                if (allXMarked) {
                    won = true;
                    break;
                }
            }

            for (let x = 0; x < 5; x++) {
                let allYMarked = true;
                for (let y = 0; y < 5; y++) {
                    if (!board[y][x].marked) allYMarked = false;
                }

                if (allYMarked) {
                    won = true;
                    break;
                }
            }

            if (!won) {
                unwonBoards.push(board);
                lastWinningBoardIndex = boardIndex;
            }
        });

        if (unwonBoards.length === 0) stop = true;
    });



    let sumUnmarked = 0;
    boards[lastWinningBoardIndex].forEach(row => row.forEach(num => sumUnmarked += !num.marked ? num.num : 0));

    console.log(currentWinningNum);
    boards[lastWinningBoardIndex].forEach(row => {
        let line = "";
        row.forEach(num => line += num.marked + " ");
        console.log(line);
    })

    console.log(sumUnmarked * currentWinningNum);
})();