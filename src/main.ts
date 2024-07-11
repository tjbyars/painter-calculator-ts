let readlineSync = require('readline-sync');
 
// Wait for user's response.
let userName = readlineSync.question('May I have your name?\n');
console.log('Hi ' + userName + '! Today we are going to find the best paint for you!');

// Get number of rooms
function getRooms(): number {
    return readlineSync.question("How many rooms do you have?\n");
}

// Get room name
function getRoomName(): string {
    return readlineSync.question("What is the name of the room?\n");
}

// Get ID number of the chosen paint
function getPaintChoice(): number {
    return readlineSync.question("Which paint would you like?\n");
}

// Get number of coats of paint
function getCoatsOfPaint(): number {
    return readlineSync.question("How many coats of paint would you like?\n");
}

// Get number of walls for room
function getNumberOfWalls(): number {
    return readlineSync.question("How many walls would you like to paint in this room? (If painting the ceiling, please count it as a wall)\n");
}

// Get height
function getHeight(): number {
    return readlineSync.question("Please input the height.\n");
}

// Get width
function getWidth(): number {
    return readlineSync.question("Please input the width.\n");
}

// Get number of obstacles
function getObstaclesNumber(): number {
    return readlineSync.question("How many obstacles are there on this wall?\n");
}

// Get best price for chosen paint for the area
function getBestPrice(paint: number, area: number): any[] {
    let cansToBuy: number[] = []; // maybe as an array instead
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
function getLargestCan(paintRemaining: number): number {
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

// Calculate price of given paints list
function calculatePaintCost(): number {
    let totalCost: number = 0;

    return totalCost;
}

// Position of paint is ID
// Format is                Colour Brand Coverage Pricelist (coverage is m^2 / litres)
//                                              10L, 5L, 2.5L, 1L
const paintList: any[] = [["White", "Dulux", 1, [10, 5, 2.5, 1]]
//                            0       1      2  3 0  1   2   3
,["Blue", "Dulux", 8, [10, 5, 2.5, 1]]
];
// Colours: White Blue Green Red Yellow Black
// Brands: Dulux Lick Leyland
// Store these in a file (json) because currently this SUCKS

// Start testing code


let numberOfRooms = getRooms();
let roomsList: any[] = [];
//                   0        1       2       3               4
// List rooms[] = {  1,       5,      2,      4,              20               }
//               roomName  paintID  coats   # of walls  total wall size
for (let i = 0; i < numberOfRooms; i++) {
    let room: any[] = [];   // Create list to hold room info
    let roomName = getRoomName();
    room.push(roomName);
    let paintChoice = getPaintChoice();
    room.push(paintChoice);
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
        wallsList.push(wallSize);    // add wall size to wall list
    }
    let totalWallSize: number = 0;
    wallsList.forEach(wall => {
        totalWallSize += wall;
    })
    room.push(totalWallSize);
    roomsList.push(room); // add room info to rooms list
}
console.log("Rooms list array: " + roomsList);
//          Prints: roomName, paintID, coatsOfPaint, numOfWalls, totalRoomArea

// Loop through each room, calculating best cost
roomsList.forEach(room => {
    console.log("For your room called : " + room[0]);
    console.log("The total area of the " + room[3] + " walls is: " + room[4] + " m^2.");
    console.log("With your choice of paint #" + room[1]);
    let amountOfPaint: number = 5;  // This needs to be a calculation based on the coverage of the chosen paint
    // which should just be paintList[id]
    console.log("You will need " + amountOfPaint + " litres of paint.")
    let bestPrice: number[] = getBestPrice(room[1], room[4]);
    console.log("It will cost you: £" + bestPrice[0] + " and you will need to buy these paint can sizes: " + bestPrice[1]);
})


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