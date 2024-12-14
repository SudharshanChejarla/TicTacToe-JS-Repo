
// Elements
const xTurn = document.querySelector('#x-turn-input');
const oTurn = document.querySelector('#o-turn-input');
const outputSec =document.querySelector('.output-sec');
const outputDisplay = document.getElementById('winner-display');
const resetButton = document.getElementById('reset-btn');
const playerButtons = document.querySelectorAll('.player-btns');

const winningPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];


let xPlayer = true ;
let count = 0 ;
xTurn.classList.add('turn-bg');

// Event Listeners 
playerButtons.forEach( (pButton)=>{
    pButton.addEventListener('click',()=>{
        if(xPlayer) {
            pButton.innerText = 'X';
            xPlayer = false ;
            xTurn.classList.remove('turn-bg');
            oTurn.classList.add('turn-bg');
        } else {
            pButton.innerText = 'O';
            xPlayer = true ;
            xTurn.classList.add('turn-bg');
            oTurn.classList.remove('turn-bg');
        }

        count++ ;
        pButton.disabled = true ;

        let winner = checkWinner();

        if(winner ) {
            displayOutput(pButton.innerText);
            disableAllButons();
        } else if(count===9) {
            gameDraw();
            disableAllButons();
        }

    })
});

resetButton.addEventListener('click', ()=>{
    xPlayer = true ;
    count = 0 ;
    xTurn.classList.add('turn-bg');
    oTurn.classList.remove('turn-bg');
    clearButtonValues();
    enableAllButtons();
    outputSec.classList.add('hide');
    setDefaultBackground();

});


// function Declarations

function checkWinner() {
    for(pattern of winningPatterns) { //dont use forEach()
        let posVal1 = playerButtons[pattern[0]].innerText ;
        let posVal2 = playerButtons[pattern[1]].innerText ;
        let posVal3 = playerButtons[pattern[2]].innerText ;

        if(posVal1!=='' && posVal2!=='' && posVal3!=='' ) {
            if(posVal1===posVal2 && posVal2===posVal3) {
                for(let i=0; i<=2; i++) {
                    changeBackground(playerButtons[pattern[i]]);
                }
                return true ; 
            }
        }
    }
    return false ;
}


function displayOutput(player) {
    outputDisplay.value = `${player} Won`;
    outputSec.classList.remove('hide');
}


function gameDraw() {
    outputDisplay.value = 'Game Draw';
    outputSec.classList.remove('hide');
}


function disableAllButons() {
    playerButtons.forEach( (btn)=> {
        btn.disabled = true ;
    }

    );
}

function clearButtonValues() {
    playerButtons.forEach( (btn)=> {
        btn.innerText = '' ;
    }

    );
}

function enableAllButtons() {
    playerButtons.forEach( (btn)=> {
        btn.disabled = false ;
    });
}

function changeBackground(elm) {
    elm.classList.add('btn-bg-class');
}

function setDefaultBackground() {
    playerButtons.forEach( (btn)=> {
        btn.classList.remove('btn-bg-class');
    });
}

