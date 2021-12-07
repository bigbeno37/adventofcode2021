import { readFile } from "fs/promises";

const toi = Number.parseInt;

(async () => {
    const fileLines = (await readFile("./day5/data.txt", "utf-8")).split("\n");

    const lines = fileLines
        .map(fileLine => fileLine.split(' -> '))
        .map(([coord1, coord2]) => {
            const [x1,y1] = coord1.split(',').map(str => toi(str));
            const [x2,y2] = coord2.split(',').map(str => toi(str));

            return {
                x1,
                y1,
                x2,
                y2
            };
        });

    let map: number[][] = [];

    for (let y = 0; y < 1000; y++) {
        const row = [];
        for (let x = 0; x < 1000; x++) {
            row.push(0);
        }

        map.push(row);
    }

    lines.forEach(({x1, y1, x2, y2}) => {
        if (x1 === x2) {
            let yLow = y1 < y2 ? y1 : y2;
            let yHigh = y1 > y2 ? y1 : y2;

            for (let y = yLow; y <= yHigh; y++) {
                map[y][x1]++;
            }
        } else if (y1 === y2) {
            let xLow = x1 < x2 ? x1 : x2;
            let xHigh = x1 > x2 ? x1 : x2;

            for (let x = xLow; x <= xHigh; x++) {
                map[y1][x]++;
            }
        } else {
            let yPos = [];

            if (y1 < y2) {
                for (let y = y1; y <= y2; y++) {
                    yPos.push(y);
                }
            } else {
                for (let y = y1; y >= y2; y--) {
                    yPos.push(y);
                }
            }

            let xPos = [];

            if (x1 < x2) {
                for (let x = x1; x <= x2; x++) {
                    xPos.push(x);
                }
            } else {
                for (let x = x1; x >= x2; x--) {
                    xPos.push(x);
                }
            }

            console.log('============');
            console.log('going from', x1, y1, 'to', x2, y2);
            for (let i = 0; i < yPos.length; i++) {
                console.log('adding point at', xPos[i], yPos[i]);
                map[yPos[i]][xPos[i]]++;
            }
        }
    });

    let overlapCount = 0;

    map.forEach(row => {
        row.forEach(col => {
            if (col > 1) {
                overlapCount++;
            }
        })
    })

    console.log(overlapCount);
})();