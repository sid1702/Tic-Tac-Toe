
const GameBoard =(function(){
    'use strict';
    let gameOn=true;
    let gameBoard=["","","","","","","","",""];
    let player1='X';
    const player1Turn = () => `It's ${player1}'s turn`;
    const status=document.querySelector('.head');

    const winningMessage = () => `${player1} wins!`;
    const tieMessage = "It's a tie";

    status.innerText=player1Turn();

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
        ];

    function clicked(e){
        const divClicked=e.target;
        const divClickedIndex=parseInt(divClicked.getAttribute('data-key'));
        if(gameBoard[divClickedIndex]!=="" || !gameOn){
            return;
        }
            gamePlay(divClicked,divClickedIndex);
            gameResult();

    }

    function gamePlay(clickedDiv,divIndex){
        gameBoard[divIndex]=player1;
        clickedDiv.innerText=player1;
    }

    function gameResult(){
        let won=false;

        for(let i=0;i<=7;i++){
            let first=gameBoard[winningCombos[i][0]];
            let second=gameBoard[winningCombos[i][1]];
            let third=gameBoard[winningCombos[i][2]];

            if(!first || !second|| !third){
                continue;
            }

            if(first===second && second===third){
                won=true;
                break;
            }
        }

        if(won){
            status.innerText=winningMessage();
            gameOn=false;
            return;
        }

        let tieGame = !gameBoard.includes("");
        if(tieGame){
            status.innerText=tieMessage;
            gameOn=false;
            return;
        }

        playerSwap();
    }

    function playerSwap(){
        player1=player1==='X'?'O':'X';
        status.innerText=player1Turn();
    }

    function restartGame() {
        gameBoard = ["","","","","","","","",""];
        document.querySelectorAll('.square').forEach(div => div.innerText = "");
        gameOn = true;
        player1 = "X";
        status.innerText = player1Turn();
      }

    return {clicked,restartGame};
})();

document.querySelectorAll('.square').forEach(
    div=>div.addEventListener('click',GameBoard.clicked));

document.querySelector('.restart').addEventListener('click', GameBoard.restartGame);
