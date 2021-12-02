import { readFile } from "fs/promises";

(async () => {
    const directions = (await readFile("./day2/data.txt", "utf-8")).split("\n");

    let horizontal = 0;
    let depth = 0;

    directions.forEach(instruction => {
        const [command, value] = instruction.split(" ");
        const valueAsInt = Number.parseInt(value);

        switch (command) {
            case "forward":
                horizontal += valueAsInt
                return;
            case "down":
                depth += valueAsInt;
                return;
            case "up":
                depth -= valueAsInt;
                return;
        }
    });

    console.log(horizontal * depth);
})();