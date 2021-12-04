import { readFile } from "fs/promises";

(async () => {
    let bits = (await readFile("./day3/data.txt", "utf-8")).split("\n");

    let oxygenRatingBits = [...bits];
    for (let i = 0; i < bits[0].length; i++) {
        let zeros = 0;
        let ones = 0;

        oxygenRatingBits.forEach(bitRow => bitRow.split('')[i] === "0" ? zeros++ : ones++);

        if (zeros > ones) {
            oxygenRatingBits = oxygenRatingBits.filter(bitRow => bitRow.split('')[i] === "0");
        } else {
            oxygenRatingBits = oxygenRatingBits.filter(bitRow => bitRow.split('')[i] === "1");
        }
    }
    const oxygenRating = oxygenRatingBits[0];

    let co2RatingBits = [...bits];
    for (let i = 0; i < bits[0].length; i++) {
        let zeros = 0;
        let ones = 0;

        if (co2RatingBits.length === 1) break;

        co2RatingBits.forEach(bitRow => bitRow.split('')[i] === "0" ? zeros++ : ones++);

        if (zeros > ones) {
            co2RatingBits = co2RatingBits.filter(bitRow => bitRow.split('')[i] === "1");
        } else {
            co2RatingBits = co2RatingBits.filter(bitRow => bitRow.split('')[i] === "0");
        }

        console.log("co2 rating", co2RatingBits);
    }
    const co2Rating = co2RatingBits[0];


    // console.log(oxygenRating, co2Rating);
    console.log(Number.parseInt(oxygenRating, 2) * Number.parseInt(co2Rating, 2));
})();