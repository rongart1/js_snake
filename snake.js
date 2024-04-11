let moveRigth = true;
let moveLeft = false;
let moveUp = false;
let moveDown = false;
let gameRunning = false;
document.addEventListener('keydown', (key) => {
    switch (key.code) {
        case 'KeyD':
            if (!moveLeft) {
                moveUp = false;
                moveDown = false;
                moveRigth = true;
            }

            break;
        case 'KeyA':
            if (!moveRigth) {
                moveLeft = true;
                moveUp = false;
                moveDown = false;
            }

            break;
        case 'KeyS':
            if (!moveUp) {
                moveLeft = false;
                moveDown = true;
                moveRigth = false;
            }

            break;
        case 'KeyW':
            if (!moveDown) {
                moveLeft = false;
                moveUp = true;
                moveRigth = false;
            }
        //this switch case changes the direction of which way the snake should go
    }
});
let appleIntreval;
let IntervalId;
let x = 0;
let y = 0;
let board = document.getElementById("board");
let col = 10
let row = 10
let speed = 250;
let appleSpeed = 700;

const boardSize = row * col;
for (let i = 0; i < boardSize; i++) {
    board.innerHTML += "<div class='boardSqure' id =" + i.toString() + "></div>"
}//this asseigns each squere an id incremanting by 1

function startGame() {
    gameRunning = true;
    IntervalId = setInterval(() => {


        if (moveRigth && gameRunning) {
            if (!([9, 19, 29, 39, 49, 59, 69, 79, 89, 99].includes(x + y)))  //checks if next move within bound
                x += 1;
            else
                gameLost();

        }

        if (moveLeft && gameRunning) {
            if (!([0, 10, 20, 30, 40, 50, 60, 70, 80, 90].includes(x + y)))   //checks if next move within bound
                x -= 1;
            else
                gameLost();
        }
        if (moveDown && gameRunning) {
            if (x + y < 99) //checks if next move within bound
                y += row;

            else
                gameLost();


        }
        if (moveUp && gameRunning) {
            if (x + y > 9) //checks if next move within bound
                y -= row;

            else
                gameLost();


        }
        if (gameRunning) {
            isSnakeOverlap();
            drawSnake();
            eraseBoard();
        }


    }, speed);//each second the snake goes in the drection and erases the back of itself

    // generates an apple at a random positon
    appleIntreval = setInterval(() => {
        if (gameRunning) {
            createApple();
        }
    }, appleSpeed);
}

let snakeLength = 3;
let prevPositonsArr = [];
function drawSnake() {

    didEat();

    document.getElementById(x + y).style.backgroundColor = "red";
    if (prevPositonsArr.length < snakeLength) {
        prevPositonsArr.push(x + y);

    }
    else {//if the prev position que is full delete the first item and add a new position
        prevPositonsArr.shift()
        prevPositonsArr.push(x + y);
    }

}

function eraseBoard() {
    for (let i = 0; i < boardSize; i++) {
        if (!prevPositonsArr.includes(i)) {
            document.getElementById(i).style.backgroundColor = "green";
        }
        if (i != apple) {
            document.getElementById(i).innerHTML = "";
        }
    }//this colors the board to green else if the board squre is in the prev positon que
}
let apple;
function createApple() {
    var appleCreated = false;
    while (!appleCreated) {
        let chance = Math.floor(Math.random() * boardSize) + 1;
        if (!prevPositonsArr.includes(chance)) {
            document.getElementById(chance).innerHTML = "<img src='apple.png' style='width: 9dvh'>";
            apple = chance;
            console.log("apple created at" + chance.toString());
            appleCreated = true;
        }
    }
}

function didEat() {//cheks if you ate an apple and icreases snake length if u did
    if (x + y == apple) {
        apple = null;
        snakeLength += 1;
    }
}


function gameLost() {//losing the game
    console.log("gameLost");
    clearInterval(IntervalId);
    clearInterval(appleIntreval);
    gameRunning = false;
}

function isSnakeOverlap() {//losing the game if snake overLaps
    if (prevPositonsArr.includes(x + y) && prevPositonsArr.length - 1 != x + y) {
        gameLost();
    }
}

function setSpeedTo(s, a) {
    speed = s;
    appleSpeed = a;
}


function restartGame() {
    x = 0;
    y = 0;
    apple = null;
    prevPositonsArr = [];
    snakeLength=0;

    moveRigth = true;
    moveLeft = false;
    moveUp = false;
    moveDown = false;
}// resets every thing