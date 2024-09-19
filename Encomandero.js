 // Variables
let score = 0;
let positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
let time = 1000;
let time_dif = 0.95

const directions = Array(
    'nw', 'nn', 'ne',
    'ww', 'ns','ee',
    'sw', 'ss', 'se')
const board = document.getElementById('board')

// Function to start the game
function startGame() {
    score = 0;
    document.getElementById('score').textContent = score;
    alert('Game started! Click the correct area to gain points.');
    //  updateGameBoard();
    rebel()
}
function rebel(hut) {
    // If hut is undefined or null, randomly assign it from directions
    if (!hut) {
        hut = document.getElementById(directions[Math.floor(Math.random() * directions.length)]);
    }

    // If the hut has the 'hut-default' class
    if (hut.classList.contains('hut-default')) {
        hut.classList.remove('hut-default');
        hut.classList.add('hut-rebel');
        hut.addEventListener('click', slaughter);
        setTimeout(() => rebel(), time); // Call rebel again without passing the same hut, ensuring random selection
    } else {
        // Randomly select a new hut from directions
        let randomHut = null;
        while (!randomHut || !randomHut.classList.contains('hut-default')) {
            randomHut = document.getElementById(directions[Math.floor(Math.random() * directions.length)]);
        }

        // Recursively call rebel with the newly chosen random hut
        rebel(randomHut);
    }
}


function slaughter(){
    /*the character is crushed */
    this.removeEventListener('click', slaughter)
    this.classList.remove('hut-rebel')
    this.classList.add('hut-slaughter')
    score++
    document.getElementById('score').textContent = score;
    setTimeout(behave, 200, this)
    console.log(time)
    if (time > 100){
        time_dif = 10*score**-0.1
        time = time -time_dif
        console.log(time)

    }
}
function behave(hut){
    /*the character is cleaned up */
    hut.classList.remove('hut-slaughter')
    hut.classList.add('hut-default')
} 

document.getElementById('start-button').addEventListener('click', startGame);
console.log('javascript loaded')

//generate grid items
for (let i = 0; i < directions.length; i++) {
    board.innerHTML += '<div class="hut-default" id='+ directions[i] +'></div>'
}
