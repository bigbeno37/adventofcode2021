import { readFile } from "fs/promises";

const toi = Number.parseInt;

(async () => {
    // const lanternFish = (await readFile("./day6/data.txt", "utf-8"))
    //     .split("\n")[0]
    const lanternFish = "3,4,3,1,2"
        .split(",")
        .map(numStr => toi(numStr));

    for (let i = 0; i < 80; i++) {
        const newFish = [];
        for (let index = 0; index < lanternFish.length; index++) {
            let timer = lanternFish[index];
            if (timer === 0) {
                newFish.push(8);
                lanternFish[index] = 6;
            } else {
                lanternFish[index]--;
            }
        }

        lanternFish.push(...newFish);
        console.log('after', i+1, 'days: ', lanternFish.length);
    }
})();