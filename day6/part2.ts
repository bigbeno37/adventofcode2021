import { readFile } from "fs/promises";

const toi = Number.parseInt;

(async () => {
    const lanternFish = (await readFile("./day6/data.txt", "utf-8"))
        .split("\n")[0]
    //     const lanternFish = "3,4,3,1,2"
        .split(",")
        .map(numStr => toi(numStr));

    let amountOfLanternFish = new Map<number, bigint>([[0,0n],[1,0n],[2,0n],[3,0n],[4,0n],[5,0n],[6,0n],[7,0n],[8,0n]]);

    lanternFish.forEach(fish => {
        amountOfLanternFish.set(fish, amountOfLanternFish.get(fish)! + 1n);
    });

    for (let i = 0; i < 256; i++) {
        const newCycle = new Map<number, bigint>([[0,0n],[1,0n],[2,0n],[3,0n],[4,0n],[5,0n],[6,0n],[7,0n],[8,0n]]);
        newCycle.set(8, amountOfLanternFish.get(0)!);
        newCycle.set(7, amountOfLanternFish.get(8)!);
        newCycle.set(6, amountOfLanternFish.get(7)! + amountOfLanternFish.get(0)!);
        newCycle.set(5, amountOfLanternFish.get(6)!);
        newCycle.set(4, amountOfLanternFish.get(5)!);
        newCycle.set(3, amountOfLanternFish.get(4)!);
        newCycle.set(2, amountOfLanternFish.get(3)!);
        newCycle.set(1, amountOfLanternFish.get(2)!);
        newCycle.set(0, amountOfLanternFish.get(1)!);

        amountOfLanternFish = newCycle;
        let count = 0n;
        for (const value of amountOfLanternFish.values()) {
            count += value;
        }

        console.log('after', i+1, 'days: ', count);
    }
})();