angular.module('ticapp', [])
  .controller('ticController', function(){
    var tic = this; 
    tic.p1Name = "";
    tic.p2Name = ""; 
    tic.board;
    tic.player;
    tic.board;
    tic.gameState;
    tic.gameOver;
    tic.start;
    tic.fullBoard;
    tic.gameStatus;
    tic.nameDisabled = true;
    tic.newPlayerButton = "Game Start";
    tic.restartButton;
    tic.setup;
    tic.showRestart;

    tic.gameStart = function (){
      tic.gameState = 0;
      tic.start = false;
      tic.resetGame();
      tic.doDisplay();
    }

    tic.resetGame = function (){
      tic.board = [0,0,0,0,0,0,0,0,0];
      tic.gameOver = false;
      tic.fullBoard = false;
    } 

    tic.restart = function (){
      tic.gameState = 0;
      tic.start = true;
      tic.player = 1;
      tic.resetGame();
      tic.doDisplay();
    }

    tic.move = function (pos){
      if(tic.gameOver)
        return;
      
      if(tic.start){
        if(tic.board[pos] == 0){
          if(tic.player == 1){
            tic.board[pos] = 1;
            tic.player = 2;
          }
          else{
            tic.board[pos] = 2;
            tic.player = 1;
          }
        }
      }
    
      var win_com =
        [[0,1,2], [0,3,6], [2,4,6],
        [1,4,7], [0,4,8], [2,5,8],
        [3,4,5], [6,7,8]];
    
      for(var i = 0; i < 8; i++){
        if(tic.board[win_com[i][0]] == 1 && tic.board[win_com[i][1]] == 1 && tic.board[win_com[i][2]] == 1){
          tic.gameState = 1;
          tic.gameOver = true;
        }
        else if(tic.board[win_com[i][0]] == 2 && tic.board[win_com[i][1]] == 2 && tic.board[win_com[i][2]] == 2){
          tic.gameState = 2;
          tic.gameOver = true;
        }
    
        tic.fullBoard = !tic.board.includes(0);
        if(tic.fullBoard)
          tic.gameOver = true;
      }
      tic.doDisplay();
    }

    tic.doDisplay = function (){
      if(tic.gameOver){
        tic.nameDisabled = true;
        tic.setup = false;
        tic.showRestart = true;
        tic.restartButton = "New Game";
        tic.newPlayerButton = "Done Playing";
        if(tic.gameState == 1){
          tic.gameStatus = tic.p1Name + " Wins"; 
        }
        else if(tic.gameState == 2){
          tic.gameStatus = tic.p2Name + " Wins"; 
        }
        else if(tic.fullBoard){
          tic.gameStatus = "No Winner";
        }
      }else if(tic.start){
        tic.nameDisabled = true;
        tic.setup = false;
        tic.showRestart = true;
        tic.restartButton = "Restart Game";
        tic.newPlayerButton = "Done Playing";
        if(tic.player == 1){
          tic.gameStatus = "Player  "+tic.p1Name+"'s Turn";
        }else{
          tic.gameStatus = "Player  "+tic.p2Name+"'s Turn";
        }
      }else{
        tic.setup = true;
        tic.showRestart = true;
        tic.nameDisabled = false;
        tic.restartButton = "Start Game";
        tic.gameStatus = "Enter your name and click start game";
      }
    }
});

