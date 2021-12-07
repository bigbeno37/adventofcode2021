import { readFile } from "fs/promises";

const toi = Number.parseInt;

(async () => {
    let crabPositions = (await readFile("./day7/data.txt", "utf-8")).split(",").map(pos => toi(pos));

    crabPositions = crabPositions.sort((a,b) => a-b);

    let lowestFuelRequired = {position: -1, totalFuel: -1};
    const highestPosition = crabPositions[crabPositions.length - 1];

    for (let i = 0; i <= highestPosition; i++) {
        let fuelRequired = 0;

        crabPositions.forEach(crab => {
            let distance = Math.abs(crab - i);

            for (let j = 0; j <= distance; j++) {
                fuelRequired += j;
            }
        });

        if (lowestFuelRequired.position === -1 || fuelRequired < lowestFuelRequired.totalFuel) {
            lowestFuelRequired = {position: i, totalFuel: fuelRequired};
        }
    }

    console.log(lowestFuelRequired);
})();