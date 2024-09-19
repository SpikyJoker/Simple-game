 // Variables
 let score = 0;
 let positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

 // Function to start the game
 function startGame() {
     score = 0;
     document.getElementById('score').textContent = score;
     alert('Game started! Click the correct area to gain points.');
     updateGameBoard();
 }

 // Function to update game board
 function updateGameBoard() {
     let randomIndex = Math.floor(Math.random() * positions.length);
     let position = positions[randomIndex];
     document.getElementById('game-board').innerHTML = `<div class="target ${position}"></div>`;
 }

 // Event listener for button
 document.getElementById('start-button').addEventListener('click', startGame);
