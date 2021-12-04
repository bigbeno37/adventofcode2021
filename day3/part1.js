import { readFile } from "fs/promises";

(async () => {
    const bits = (await readFile("./day3/data.txt", "utf-8")).split("\n");

    let gammaBits = [];
    let epsilonBits = [];

    for (let i = 0; i < bits[0].length; i++) {
        let zeros = 0;
        let ones = 0;


        bits.forEach(bitRow => bitRow.split('')[i] === "0" ? zeros++ : ones++);

        console.log(`there are ${zeros} zeroes and ${ones} ones in position ${i}`);
        if (zeros > ones) {
            gammaBits[i] = 0;
            epsilonBits[i] = 1;
        } else {
            gammaBits[i] = 1;
            epsilonBits[i] = 0;
        }
    }

    const epsilon = gammaBits.map(character => character === "0" ? "1" : "0").join('');

    console.log(Number.parseInt(gammaBits.join(''), 2) * Number.parseInt(epsilon, 2));
})();