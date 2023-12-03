console.clear();

let counter = 0;
let deathsCounter = 0;
let moveInterval;
let moves = 100;
let boxSize = 100;
let isGameRunning = false;
const speed = 1000;
const scoreHeight = 110;
const counterSpan = document.querySelector(".score");
const deaths = document.querySelector(".deaths");
const kdRatio = document.querySelector(".kd-ratio")
const startButton = document.querySelector(".start");
const pauseButton = document.querySelector(".pause");
const resetButton = document.querySelector(".reset");
const box = document.createElement("div");
box.classList.add("box");

function boxMove() {
    const randomNumber = Math.random();
    const width = window.innerWidth - boxSize;
    const height = window.innerHeight - boxSize;
    const randomX = Math.round(randomNumber * width);
    const randomY = Math.max(Math.round(randomNumber * height), scoreHeight);
    box.style.left = `${randomX}px`;
    box.style.top = `${randomY}px`;
}

function boxSizeDecrease() {
    if (moves < 100 && moves % 10 === 0) {
        boxSize = Math.max(10, boxSize - 10);

        box.style.height = `${boxSize}px`;
        box.style.width = `${boxSize}px`;
    }
    moves--;
    console.log(moves);
}

function updateKDRatio() {
    deaths.innerText = deathsCounter;
    kdRatio.innerText = (counter / (deathsCounter || 1)).toFixed(2);
}

function startInterval() {
    if (moveInterval) {
        clearInterval(moveInterval);
    }
    moveInterval = setInterval(function () {
        deathsCounter++;
        updateKDRatio();
        boxMove();
    }, speed);
}

startButton.addEventListener("click", function () {
    document.body.appendChild(box);
    if (isGameRunning === false) {
        isGameRunning = true;
        startInterval();
    }
});

pauseButton.addEventListener("click", function () {
    isGameRunning = false;
    clearInterval(moveInterval);
});

resetButton.addEventListener("click", function () {
    history.go(0);
});

box.addEventListener("click", function () {
    if (isGameRunning === false) {
        return;
    }
    counter++;
    counterSpan.innerText = counter;
    boxMove();
    startInterval();
    boxSizeDecrease();
    updateKDRatio();
});
