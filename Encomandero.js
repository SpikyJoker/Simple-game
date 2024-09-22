let score = 0;
let time = 1000;
let time_dif = 0.95;
let rebelloop = null;
let mask = ['/Static/mask-happy.png', '/Static/mask-neutral.png', '/Static/mask-angry.png'];
let maskindex = 0;

document.getElementById('mask').src = mask[maskindex];  // Use '=' instead of '&=' to set the mask image

console.log('mask[maskindex] ' + mask[maskindex]);

const directions = Array(
    'nw', 'nn', 'ne',
    'ww', 'ns', 'ee',
    'sw', 'ss', 'se'
);
const board = document.getElementById('board');

function buttonswitch(button_name) {
    const button = document.getElementById(button_name);
    if (button.classList.contains('button-default')) {
        button.classList.remove('button-default');
        button.classList.add('button-clicked');
    } else {
        button.classList.remove('button-clicked');
        button.classList.add('button-default');
    }
}

function endGame() {
    buttonswitch('start');
    buttonswitch('end');
    maskindex = 0;
    document.getElementById('mask').src = mask[maskindex];  // Reset mask to happy
    hutclear();
    alert('Game over! Your score is ' + score + '.');
    document.getElementById('start').addEventListener('click', startGame);
    document.getElementById('end').removeEventListener('click', endGame);
}

function startGame() {
    time = 1000;
    time_dif = 0.95;
    buttonswitch('start');
    buttonswitch('end');
    document.getElementById('start').removeEventListener('click', startGame);
    document.getElementById('end').addEventListener('click', endGame);
    hutclear();
    score = 0;
    document.getElementById('score').textContent = score;
    maskindex = 0;
    document.getElementById('mask').src = mask[maskindex];  // Reset mask to happy at the start
    alert('Game started! Click the correct area to gain points.');
    rebel();
}

function HutAction() {
    let anyDefault = directions.some(direction => {
        return document.getElementById(direction).classList.contains('hut-default');
    });

    if (anyDefault) {
        if (Math.random() < 0.75) {
            rebel();
        } else {
            appease();
        }
    } else {
        endGame();
    }
}

function rebel(hut) {
    if (!hut) {
        hut = document.getElementById(directions[Math.floor(Math.random() * directions.length)]);
    }

    if (hut.classList.contains('hut-default')) {
        hut.classList.remove('hut-default');
        hut.classList.add('hut-rebel');
        hut.addEventListener('click', slaughter);
        rebelloop = setTimeout(() => HutAction(), time);
    } else {
        HutAction();
    }
}

function lifeloss() {
    if (maskindex < 2) {
        maskindex++;
        document.getElementById('mask').src = mask[maskindex];  // Update mask image
        console.log('Lives lost, mask changed to: ' + mask[maskindex]);
    } else {
        endGame();  // End the game if mask index exceeds limit
    }
}

function slaughter() {
    if (this.classList.contains('hut-appease')) {
        this.removeEventListener('click', slaughter);
        lifeloss();
        this.classList.remove('hut-appease');
        this.classList.add('hut-default');
    } else {
        this.removeEventListener('click', slaughter);
        this.classList.remove('hut-rebel');
        this.classList.add('hut-slaughter');
        score++;
        document.getElementById('score').textContent = score;
        setTimeout(behave, 100, this);
        if (time > 100) {
            time_dif = 10 * score ** -0.1;
            time = time - time_dif;
            console.log(time);
        }
    }
}

function behave(hut) {
    hut.classList.remove('hut-slaughter');
    hut.classList.add('hut-default');
}

function appease(hut) {
    if (!hut) {
        hut = document.getElementById(directions[Math.floor(Math.random() * directions.length)]);
    }
    if (hut.classList.contains('hut-default')) {
        hut.classList.remove('hut-default');
        hut.classList.add('hut-appease');
        hut.addEventListener('click', slaughter);
        setTimeout(() => hutclear(hut), time*Math.floor(Math.random() * 5) +0.8);
        actionloop = setTimeout(() => HutAction(), time);
    } else {
        HutAction();
    }
}

function hutclear(hut) {
    if (hut) {
        // Clear only the specific hut
        hut.removeEventListener('click', slaughter);
        hut.classList.remove('hut-appease');
        hut.classList.add('hut-default');
    } else {
        // Clear all huts
        if (rebelloop === null) {
            return;  // If rebelloop is null, just return
        } else {
            for (let direction of directions) {  // Use 'let' instead of 'in' in javascript
                let hut = document.getElementById(direction);
                hut.classList.remove('hut-rebel');
                hut.classList.remove('hut-slaughter');
                hut.classList.remove('hut-remove');
                hut.classList.add('hut-default');
                hut.removeEventListener('click', slaughter);
            }
            clearTimeout(rebelloop);  // Properly clear the timeout
            rebelloop = null;  // Reset rebelloop after clearing
        }
    }
}


document.getElementById('start').addEventListener('click', startGame);

console.log('javascript loaded');
buttonswitch('end');

for (let i = 0; i < directions.length; i++) {
    board.innerHTML += '<div class="hut hut-default" id=' + directions[i] + '></div>';
}
console.log('board loaded');
