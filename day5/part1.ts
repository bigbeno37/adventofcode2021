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
                x1: x1 <= x2 ? x1 : x2,
                y1: y1 <= y2 ? y1 : y2,
                x2: x2 >= x1 ? x2 : x1,
                y2: y2 >= y1 ? y2 : y1
            };
        })
        .filter(coordinates => coordinates.x1 === coordinates.x2 || coordinates.y1 === coordinates.y2);

    let map: number[][] = [];

    for (let y = 0; y < 1000; y++) {
        const row = [];
        for (let x = 0; x < 1000; x++) {
            row.push(0);
        }

        map.push(row);
    }

    lines.forEach(line => {
        if (line.x1 === line.x2) {

            for (let y = line.y1; y <= line.y2; y++) {
                map[y][line.x1]++;
            }
        } else {

            for (let x = line.x1; x <= line.x2; x++) {
                map[line.y1][x]++;
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