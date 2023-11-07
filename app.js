document.addEventListener('DOMContentLoaded', () => {
const squares = document.querySelectorAll('.grid div')
const scoreDisplay = document.querySelector('span')
const startBtn = document.querySelector('.start')

const width = 10
let currentIndex = 0 // first div in grid
let appleIndex = 2
let currentSnake = [2,1,0] // 2 = head, 0 = tail, 1 = body
let direction = 1
let score = 0
let speed = 0.9
let intervalTime = 0
let interval = 0

//start and restart game
function startGame() {
    
    //clear game over
    const gameOverMessage = document.getElementById('gameOverMessage');
    gameOverMessage.style.display = 'none';

    // clear grid
    squares.forEach(square => square.classList.remove('snake', 'apple'));
    // Reset game-related properties
    currentSnake = [2, 1, 0];
    direction = 1;
    score = 0;
    scoreDisplay.textContent = score;
    intervalTime = 1000;

    // Clear any existing interval
    clearInterval(interval);

    //generate first apple
    randomApple();

    // Start the game loop
    interval = setInterval(moveOutcomes, intervalTime);
}

//function that deals with all outcomes (snake hitting self, apple, border)
function moveOutcomes(){   
    if(
        (currentSnake[0] + width >= (width * width) && direction === width) || //if snake hits bottom
        (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake hits top
        squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
    ) {
        const gameOverMessage = document.querySelector('.game-over');
        gameOverMessage.style.display = 'block';
        clearInterval(interval);
        return; //clear interval if snake hits bad thing
    }

    const tail = currentSnake.pop(); //removes last item of the array and shows it
    squares[tail].classList.remove('snake'); //removes class of snake from the tail
    currentSnake.unshift(currentSnake[0] + direction); //gives direction to the head of the array

    if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        randomApple();
        score++;
        scoreDisplay.textContent = score;

        // Clear the current interval
        clearInterval(interval);

        // Increase the game speed
        intervalTime *= speed;

        // Start a new interval with the updated speed
        interval = setInterval(moveOutcomes, intervalTime);
    }
    if(score == 100){
        const gameOverMessage = document.querySelector('.game-over');
        gameOverMessage.style.display = 'block';
        gameOverMessage.textContent = 'You Win!';
        clearInterval(interval);
        return;
    }
    squares[currentSnake[0]].classList.add('snake');

}

//generate new apple
function randomApple() {
    do{
        appleIndex = Math.floor(Math.random() * squares.length);
    } while(squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on snake
    squares[appleIndex].classList.add('apple');
}

// taking input
function control(e) {
    if (e.key === 'ArrowRight' && direction !== -1) {
        direction = 1; // right arrow
    } else if (e.key === 'ArrowUp' && direction !== width) {
        direction = -width; // up arrow
    } else if (e.key === 'ArrowLeft' && direction !== 1) {
        direction = -1; // left arrow
    } else if (e.key === 'ArrowDown' && direction !== -width) {
        direction = width; // down arrow
    }
}


document.addEventListener('keyup', control);
startBtn.addEventListener('click', startGame);
})