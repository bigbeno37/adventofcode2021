import {day1Data} from "./data.js";

const measurements = day1Data.split("\n").map(num => Number.parseInt(num));

const groupSums = [];

for (let i = 0; i < measurements.length; i++) {
    // If the number two places forward would be out of bounds, break the loop; we're done here
    if (i+2 > measurements.length - 1) break;

    const num1 = measurements[i];
    const num2 = measurements[i+1];
    const num3 = measurements[i+2];

    groupSums.push(num1 + num2 + num3);
}

let count = 0;
let prevSum = -1;
for (const sum of groupSums) {
    if (prevSum !== -1 && sum > prevSum) {
        count++;
    }

    prevSum = sum;
}

console.log(count);