"use strict";
let readlineSync = require('readline-sync');
// Wait for user's response.
let userName = readlineSync.question('May I have your name?\n');
console.log('Hi ' + userName + '! Today we are going to find the best paint for you!');
// Get number of rooms
function getRooms() {
    return readlineSync.question("How many rooms do you have?\n");
}
// Get room name
function getRoomName() {
    return readlineSync.question("What is the name of the room?\n");
}
// Get ID number of the chosen paint
function getPaintChoice() {
    return readlineSync.question("Which paint would you like?\n");
}
// Get number of coats of paint
function getCoatsOfPaint() {
    return readlineSync.question("How many coats of paint would you like?\n");
}
// Get number of walls for room
function getNumberOfWalls() {
    return readlineSync.question("How many walls would you like to paint in this room? (If painting the ceiling, please count it as a wall)\n");
}
// Get height
function getHeight() {
    return readlineSync.question("Please input the height.\n");
}
// Get width
function getWidth() {
    return readlineSync.question("Please input the width.\n");
}
// Get number of obstacles
function getObstaclesNumber() {
    return readlineSync.question("How many obstacles are there on this wall?\n");
}
let numberOfRooms = getRooms();
let roomsList = [];
//                   0        1       2       3               4
// List rooms[] = {  1,       5,      2,      6,              {}               }
//               roomName  paintID  coats   # of walls  list of wall sizes
for (let i = 0; i < numberOfRooms; i++) {
    let room = []; // Create list to hold room info
    let roomName = getRoomName();
    room.push(roomName);
    let paintChoice = getPaintChoice();
    room.push(paintChoice);
    let coatsOfPaint = getCoatsOfPaint();
    room.push(coatsOfPaint);
    let numberOfWalls = getNumberOfWalls();
    room.push(numberOfWalls);
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
    room.push(wallsList);
    roomsList.push(room); // add room info to rooms list
}
console.log(roomsList);
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
// provide paint choices
// calculate best paint choice based on price
// prevent obstacle from being bigger than wall
// make getObstacle a method
// make getWall a method
// make getRoomInfo a method
// could make classes for rooms, walls, paints?
