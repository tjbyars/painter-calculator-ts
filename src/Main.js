"use strict";
let readlineSync = require('readline-sync');
// Wait for user's response.
let userName = readlineSync.question('May I have your name?\n');
console.log('Hi ' + userName + '! Today we are going to find the best paint for you!');
// Get number of rooms
function getRooms() {
    let answer = readlineSync.question("How many rooms do you have?\n");
    try {
        answer = parseInt(answer);
        if (isNaN(answer)) {
            throw new Error("Invalid input");
        }
        return answer;
    }
    catch (error) {
        console.log(`\nError: ${error.message}`);
        answer = getRooms();
    }
    return answer;
}
// Get room name
function getRoomName() {
    let answer = readlineSync.question("What is the name of the room?\n");
    if (typeof (answer) !== "string") {
        answer = getRoomName();
    }
    return answer;
}
// Get ID number of the chosen paint
function getPaintChoice() {
    let answer = readlineSync.question("Which paint would you like? (Please enter the ID number)\n");
    try {
        answer = parseInt(answer);
        if (isNaN(answer)) {
            throw new Error("Invalid input");
        }
        return answer;
    }
    catch (error) {
        console.log(`\nError: ${error.message}`);
        answer = getPaintChoice();
    }
    return answer;
}
// Get number of coats of paint
function getCoatsOfPaint() {
    let answer = readlineSync.question("How many coats of paint would you like?\n");
    try {
        answer = parseInt(answer);
        if (isNaN(answer)) {
            throw new Error("Invalid input");
        }
        return answer;
    }
    catch (error) {
        console.log(`\nError: ${error.message}`);
        answer = getCoatsOfPaint();
    }
    return answer;
}
// Get number of walls for room
function getNumberOfWalls() {
    let answer = readlineSync.question("How many walls would you like to paint in this room? (If painting the ceiling, please count it as a wall)\n");
    try {
        answer = parseInt(answer);
        if (isNaN(answer)) {
            throw new Error("Invalid input");
        }
        return answer;
    }
    catch (error) {
        console.log(`\nError: ${error.message}`);
        answer = getNumberOfWalls();
    }
    return answer;
}
// Get height
function getHeight() {
    let answer = readlineSync.question("Please input the height.\n");
    try {
        answer = parseInt(answer);
        if (isNaN(answer)) {
            throw new Error("Invalid input");
        }
        return answer;
    }
    catch (error) {
        console.log(`\nError: ${error.message}`);
        answer = getHeight();
    }
    return answer;
}
// Get width
function getWidth() {
    let answer = readlineSync.question("Please input the width.\n");
    try {
        answer = parseInt(answer);
        if (isNaN(answer)) {
            throw new Error("Invalid input");
        }
        return answer;
    }
    catch (error) {
        console.log(`\nError: ${error.message}`);
        answer = getWidth();
    }
    return answer;
}
// Get number of obstacles
function getObstaclesNumber() {
    let answer = readlineSync.question("How many obstacles are there on this wall?\n");
    try {
        answer = parseInt(answer);
        if (isNaN(answer)) {
            throw new Error("Invalid input");
        }
        return answer;
    }
    catch (error) {
        console.log(`\nError: ${error.message}`);
        answer = getObstaclesNumber();
    }
    return answer;
}
// Get best price for chosen paint for the area
function getBestPrice(paint, area) {
    let cansToBuy = []; // maybe as an array instead
    let paintNeeded = area / paintList[paint][2];
    let paintRemaining = paintNeeded;
    while (paintRemaining > 0) {
        let largestCan = getLargestCan(paintRemaining);
        cansToBuy.push(largestCan);
        paintRemaining -= largestCan;
    }
    let bestPrice = 0;
    cansToBuy.forEach(can => {
        if (can == 10) {
            bestPrice += paintList[paint][3][0];
        }
        else if (can == 5) {
            bestPrice += paintList[paint][3][1];
        }
        else if (can == 2.5) {
            bestPrice += paintList[paint][3][2];
        }
        else {
            bestPrice += paintList[paint][3][3];
        }
    });
    return [bestPrice, cansToBuy];
}
// Get largest paint can that can be used for the given area
function getLargestCan(paintRemaining) {
    let paintSizes = [10, 5, 2.5, 1];
    if (paintRemaining <= 0) {
        return 0;
    }
    let largestCan = 1;
    paintSizes.forEach(size => {
        if ((paintRemaining - size) >= 0) {
            if (size > largestCan) {
                largestCan = size;
            }
        }
    });
    return largestCan;
}
// Print all available paint colours
function printAllPaints(area) {
    console.log("Currently the available paints are: ");
    for (let i = 0; i < paintList.length; i++) {
        console.log("PaintID: " + i +
            "     Colour: " + paintList[i][0] +
            "     Brand: " + paintList[i][1] +
            "     Best price: " + getBestPrice(i, area)[0]);
    }
}
// Position of paint is ID
// Format is                Colour Brand Coverage Pricelist (coverage is m^2 / litres)
//                                              10L, 5L, 2.5L, 1L
const paintList = [["White", "Dulux", 13, [27, 18, 16, 10]],
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
// Store these in a file (json) because currently this SUCKS
// Start testing code
let numberOfRooms = getRooms();
let roomsList = [];
//                   0        1       2       3               4
// List rooms[] = {  1,       5,      2,      4,              20               }
//               roomName  paintID  coats   # of walls  total wall size
for (let i = 0; i < numberOfRooms; i++) {
    let room = []; // Create list to hold room info
    let roomName = getRoomName();
    room.push(roomName);
    room.push("paintChoice");
    let coatsOfPaint = getCoatsOfPaint();
    room.push(coatsOfPaint);
    let numberOfWalls = getNumberOfWalls();
    room.push(numberOfWalls);
    //  list wallsList = {wall1Size, wall2Size, wall3Size}
    let wallsList = []; // Create list to hold total wall sizes
    for (let j = 0; j < numberOfWalls; j++) { // For each wall in the room
        console.log("Input the dimensions of the wall.\n");
        let wallHeight = getHeight();
        let wallWidth = getWidth();
        let wallSize = wallHeight * wallWidth;
        let numberOfObstacles = getObstaclesNumber();
        for (let k = 0; k < numberOfObstacles; k++) { // For each obstacle in the room
            console.log("Input the dimensions of the obstacle.\n");
            let obstacleHeight = getHeight();
            let obstacleWidth = getWidth();
            let obstacleSize = obstacleHeight * obstacleWidth;
            wallSize -= obstacleSize;
        }
        wallsList.push(wallSize); // add wall size to wall list
    }
    let totalWallSize = 0;
    wallsList.forEach(wall => {
        totalWallSize += wall;
    });
    room.push(totalWallSize);
    roomsList.push(room); // add room info to rooms list
}
// console.log("Rooms list array: " + roomsList);
//          Prints: roomName, paintID, coatsOfPaint, numOfWalls, totalRoomArea
// Loop through each room, calculating best cost
roomsList.forEach(room => {
    console.log("\n\n\nFor your room called : " + room[0]);
    console.log("The total area of the " + room[3] + " walls is: " + room[4] + " m^2.");
    printAllPaints(room[4]);
    room[1] = getPaintChoice();
    console.log("\n\nWith your choice of paint #" + room[1]);
    let amountOfPaint = room[4] / paintList[room[1]][2];
    console.log("You will need " + (Math.round(amountOfPaint * 100) / 100) + " litres of paint.");
    let bestPrice = getBestPrice(room[1], room[4]);
    console.log("It will cost you: £" + bestPrice[0]);
    console.log("You will need to buy these paint can sizes: " + bestPrice[1] + "\n");
});
/*
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
/*
provide paint choices
calculate best paint choice based on price
prevent obstacle from being bigger than wall
make getObstacle a method
make getWall a method
make getRoomInfo a method
change paintChoice in main loop to be a choice of colours, then:
    move paint ID choice to the forEach room loop, and let them choose from the options available in their chosen colour
    after giving them the prices for each option in that colour
factor in wall shape (e.g. circle etc)
*/
// could make classes for rooms, walls, paints?
/* Notes
need testing in painterCalculator

jest - unit testing
https://jestjs.io/docs/getting-started
jest with typescript on right side of page
https://jestjs.io/docs/getting-started#using-typescript

npm install --save-dev ts-jest

Vite helps with setup faster

wall info			x
obstacle info			x
(rooms?)			x
colours of paint		x
brands of paint			x
can sizes 10L 5L 2.5L 1L	x
paint coverages			x
coats of paint			x

then recommend most cost efficient way to cover the walls
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
