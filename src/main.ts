

// ### Planning process ###
/*
wall info			        x
obstacle info		    	x
(rooms?)		        	x
colours of paint	    	x
brands of paint		    	x
can sizes 10L 5L 2.5L 1L	x
paint coverages		    	x
coats of paint		    	x

get number of rooms
loop through rooms
    get paint choice
        colour
        brand options   (give coverage info and price per litre ranges)
    coats of paint
    get number of walls in this room
    loop through walls
        get individual wall info
        width
        height
        loop through obstacles
            width
            height

loop through rooms
    give optimal buying choice
*/





let readlineSync = require('readline-sync');
 
// ### Questions ###
// Get user's name
let userName = readlineSync.question('May I have your name?\n');
console.log('Hi ' + userName + '! Today we are going to find the best paint for you!');

// Get number of rooms
function getRooms(): number {
    let answer:any = readlineSync.question("How many rooms do you have? (Please enter a whole number)\n");
    try {
        answer = parseInt(answer);
        if (isNaN(answer)) {
            throw new Error("Invalid input");
        }
        return answer;
    } catch (error: any) {
        console.log(`\nError: ${error.message}`);
        answer = getRooms();
    }
    return answer;
}

// Get room name
function getRoomName(): string {
    let answer:any = readlineSync.question("What is the name of the room?\n");
    if (typeof(answer) !== "string") {
        answer = getRoomName();
    }
    return answer;
}

// Get ID number of the chosen paint
function getPaintChoice(): number {
    let answer:any = readlineSync.question("Which paint would you like? (Please enter the ID number as a whole number)\n");
    try {
        answer = parseInt(answer);
        if (isNaN(answer)) {
            throw new Error("Invalid input");
        }
        if (answer > paintList.length - 1) {
            throw new Error("Invalid input");
        }
        return answer;
    } catch (error: any) {
        console.log(`\nError: ${error.message}`);
        answer = getPaintChoice();
    }
    return answer;
}

// Get number of coats of paint
function getCoatsOfPaint(): number {
    let answer:any = readlineSync.question("How many coats of paint would you like? (Please enter a whole number)\n");
    try {
        answer = parseInt(answer);
        if (isNaN(answer)) {
            throw new Error("Invalid input");
        }
        return answer;
    } catch (error: any) {
        console.log(`\nError: ${error.message}`);
        answer = getCoatsOfPaint();
    }
    return answer;
}

// Get number of walls for room
function getNumberOfWalls(): number {
    let answer:any = readlineSync.question("How many walls would you like to paint in this room? (Please enter a whole number, and if painting the ceiling, please count it as a wall)\n");
    try {
        answer = parseInt(answer);
        if (isNaN(answer)) {
            throw new Error("Invalid input");
        }
        return answer;
    } catch (error: any) {
        console.log(`\nError: ${error.message}`);
        answer = getNumberOfWalls();
    }
    return answer;
}

// Get height
function getHeight(): number {
    let answer:any = readlineSync.question("Please input the height in metres as a whole number or decimal.\n");
    try {
        answer = parseFloat(answer);
        if (isNaN(answer)) {
            throw new Error("Invalid input");
        }
        if (answer <= 0) {
            throw new Error("Too small");
        }
        return answer;
    } catch (error: any) {
        console.log(`\nError: ${error.message}`);
        answer = getHeight();
    }
    return answer;
}

// Get width
function getWidth(): number {
    let answer:any = readlineSync.question("Please input the width in metres as a whole number or decimal.\n");
    try {
        answer = parseFloat(answer);
        if (isNaN(answer)) {
            throw new Error("Invalid input");
        }
        if (answer <= 0) {
            throw new Error("Too small");
        }
        return answer;
    } catch (error: any) {
        console.log(`\nError: ${error.message}`);
        answer = getWidth();
    }
    return answer;
}

// Get number of obstacles
function getObstaclesNumber(): number {
    let answer:any = readlineSync.question("How many obstacles are there on this wall? (Please enter a whole number)\n");
    try {
        answer = parseInt(answer);
        if (isNaN(answer)) {
            throw new Error("Invalid input");
        }
        return answer;
    } catch (error: any) {
        console.log(`\nError: ${error.message}`);
        answer = getObstaclesNumber();
    }
    return answer;
}


// ### Functionality ###
// Get best price for chosen paint for the area
function getBestPrice(paint: number, area: number): any[] {
    let cansToBuy: number[] = [];
    let paintNeeded: number = area / paintList[paint][2]
    let paintRemaining: number = paintNeeded;
    while (paintRemaining > 0) {
        let largestCan = getLargestCan(paintRemaining);
        cansToBuy.push(largestCan);
        paintRemaining -= largestCan;
    }
    let bestPrice: number = 0;
    cansToBuy.forEach(can => {
        if (can == 10) {
            bestPrice += paintList[paint][3][0];
        } else if (can == 5) {
            bestPrice += paintList[paint][3][1];
        } else if (can == 2.5) {
            bestPrice += paintList[paint][3][2];
        } else {
            bestPrice += paintList[paint][3][3];
        }
    })
    return [bestPrice, cansToBuy];
}

// Get largest paint can that can be used for the given area
export function getLargestCan(paintRemaining: number): number {
    let paintSizes: number[] = [10, 5, 2.5, 1];
    if (paintRemaining <= 0) {
        return 0;
    }
    let largestCan: number = 1;
    paintSizes.forEach(size => {
        if ((paintRemaining - size) >= 0) {
            if (size > largestCan) {
                largestCan = size;
            }
        }
    })
    return largestCan;
}

// Print all available paint colours
function printAllPaints(area: number) {
    console.log("Currently the available paints are: ")
    for (let i = 0; i < paintList.length; i++) {
        console.log("PaintID: " + i +
        "     Colour: " + paintList[i][0] +
        "     Brand: " + paintList[i][1] +
        "     Best price: " + getBestPrice(i, area)[0]);
    }
}


// ### "Database" ###
// Position of paint is ID
// Format is                Colour Brand Coverage Pricelist (coverage is m^2 / litres)
//                                              10L, 5L, 2.5L, 1L
const paintList: any[] = [["White", "Dulux", 13, [27, 18, 16, 10]],
//                            0       1      2  3 0  1   2   3
["White", "Sandtex", 16, [40, 30, 24, 20]],
["White", "GoodHome", 8, [36, 30, 18, 15]],
["White", "Valspar", 10, [30, 24, 18, 15]],
["Blue", "Dulux", 16, [40, 30, 24, 20]],
["Blue", "Sandtex", 8, [36, 30, 18, 15]],
["Blue", "GoodHome", 10, [30, 24, 18, 15]],
["Blue", "Valspar", 10, [30, 24, 18, 15]],
["Green", "Dulux", 16, [40, 30, 24, 20]],
["Green", "Sandtex", 8, [36, 30, 18, 15]],
["Green", "GoodHome", 10, [30, 24, 18, 15]],
["Green", "Valspar", 10, [30, 24, 18, 15]],
];


// ### Main process ###
let numberOfRooms = getRooms();
let roomsList: any[] = [];
//                   0        1       2       3               4
// List rooms[] = {  1,       5,      2,      4,              20               }
//               roomName  paintID  coats   # of walls  total wall size
for (let i = 0; i < numberOfRooms; i++) {
    let room: any[] = [];   // Create list to hold room info
    let roomName = getRoomName();
    room.push(roomName);
    room.push("paintChoice");
    let coatsOfPaint = getCoatsOfPaint();
    room.push(coatsOfPaint);
    let numberOfWalls = getNumberOfWalls();
    room.push(numberOfWalls);

//  list wallsList = {wall1Size, wall2Size, wall3Size}
    let wallsList: number[] = []    // Create list to hold total wall sizes
    for (let j = 0; j < numberOfWalls; j++) {   // For each wall in the room
        console.log("Input the dimensions of the wall.\n");
        let wallHeight: number = getHeight();
        let wallWidth: number = getWidth();
        let wallSize: number = wallHeight * wallWidth;
        let numberOfObstacles = getObstaclesNumber();
        for (let k = 0; k < numberOfObstacles; k++) {   // For each obstacle in the room
            console.log("Input the dimensions of the obstacle.\n")
            let obstacleHeight: number = getHeight();
            let obstacleWidth: number = getWidth();
            let obstacleSize = obstacleHeight * obstacleWidth;
            wallSize -= obstacleSize;
        }
        if (wallSize <= 0) {
            console.log("Error: You have entered a wall that is less than or equal to zero.");
            process.exit();
        }
        wallsList.push(wallSize);    // add wall size to wall list
    }
    let totalWallSize: number = 0;
    wallsList.forEach(wall => {
        totalWallSize += wall;
    })
    room.push(totalWallSize);
    roomsList.push(room); // add room info to rooms list
}

// Loop through each room, calculating best cost
roomsList.forEach(room => {
    console.log("\n\n\nFor your room called : " + room[0]);
    console.log("The total area of the " + room[3] + " walls is: " + room[4] + " m^2.");
    printAllPaints(room[4]);
    room[1] = getPaintChoice();
    console.log("\n\nWith your choice of paint #" + room[1]);
    let amountOfPaint: number = room[4] / paintList[room[1]][2];
    console.log("You will need " + (Math.round(amountOfPaint * 100) / 100) + " litres of paint.")
    let bestPrice: number[] = getBestPrice(room[1], room[4]);
    console.log("It will cost you: £" + bestPrice[0]);
    console.log("You will need to buy these paint can sizes: " + bestPrice[1] + "\n");
})






/// ### Improvements ### 
/*
Store paintlist in a file (json) because currently this isn't ideal
make getObstacle a method
make getWall a method
make getRoomInfo a method
factor in wall shape (e.g. triangle, circle, etc.)
could make classes for rooms, walls, paints
*/



// ### Testing ###
module.exports = getLargestCan;








/* Notes
need testing in painterCalculator

jest - unit testing
https://jestjs.io/docs/getting-started
jest with typescript on right side of page
https://jestjs.io/docs/getting-started#using-typescript

npm install --save-dev ts-jest

Vite helps with setup faster
*/


// ###Testing Code###
// console.log("Largest can for 27: " + getLargestCan(27));
// console.log("Largest can for 10: " + getLargestCan(10));
// console.log("Largest can for 9: " + getLargestCan(9));
// console.log("Largest can for 5: " + getLargestCan(5));
// console.log("Largest can for 2.6: " + getLargestCan(2.6));
// console.log("Largest can for 1: " + getLargestCan(1));
// console.log("Largest can for .5: " + getLargestCan(.5));
// console.log("Largest can for -1: " + getLargestCan(-1));