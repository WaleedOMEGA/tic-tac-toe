// declare variables
const gameChoiceButtons = document.querySelectorAll('.game-choice button');
const chooseX = document.querySelector('.game-starter .choose-x');
const chooseO = document.querySelector('.game-starter .choose-o');
const backButton = document.querySelector('.back-button');
const hardReset = document.querySelector('.hard-reset');
const gameChoice = document.querySelector('.game-choice');
const gameStarter = document.querySelector('.game-starter');
const gameStarterParagraph = document.querySelector('.game-starter p');
const canvasWrapper = document.getElementById("myCanvas");
const canvas = canvasWrapper.getContext("2d");
const score1 = document.querySelector('.score-1');
const score2 = document.querySelector('.score-2');
const score1Name = document.querySelector('.score-1 .name');
const score2Name = document.querySelector('.score-2 .name');
const score1Points = document.querySelector('.score-1 .points');
const score2Points = document.querySelector('.score-2 .points');
const pointsDivider = document.querySelector('.points-divider');
const boxes = document.querySelector('.boxes');
const winMessage = document.querySelector('.win-message');
const loseMessage = document.querySelector('.lose-message');
const playerOneTurn = document.querySelector('.player-one-turn');
const playerTwoTurn = document.querySelector('.player-two-turn');
const playerOneTurnP = document.querySelector('.player-one-turn p');
const playerTwoTurnP = document.querySelector('.player-two-turn p');
const drawMessage = document.querySelector('.draw-message');
var MYAPP = MYAPP || {
    gameInPlay: false,
    winCombos: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [7, 5, 3]
    ],
    playerOneScore: 0,
    playerTwoScore: 0,
    timeOuts: [],
    initializeVars: function() {
      this.numFilledIn = 0;
      this.currentBoard = {
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: ''
      };
    },
    initializeGame: function() {
      MYAPP.initializeVars();
      MYAPP.display.drawBoard();
      gameChoiceButtons.forEach((button) =>
        button.addEventListener('click', function () {
          MYAPP.secondPlayer = MYAPP.game.gameSelection(this);
          MYAPP.display.hideGameChoice();
          MYAPP.display.showGameStarter(MYAPP.secondPlayer);
          chooseX.addEventListener('click', MYAPP.game.firstGame);
          chooseO.addEventListener('click', MYAPP.game.firstGame);
          backButton.addEventListener('click', function () {
            MYAPP.display.hideGameStarter();
            MYAPP.display.showGameChoice();
          });
        })
      );
      hardReset.addEventListener('click', MYAPP.game.resetGame);
    }
  };
  // general functions
  // animate function
function animateHide(item, time) {
  var animateEffect = setInterval(function () {
    
    if (item.style.top < 0) {
      item.style.top += 5;
      
    } else {

      item.style.top = 0;
      clearInterval(animateEffect);
    }
  }, time);
}
function animateShow(item, time) {
  
  var top = 0;
  // var top = item.style.top;
  // top = top.slice(0,top.length-2);
  // console.log(top);
    var animateEffect = setInterval(function () {
    // console.log('animateshow',item.style.top);
    if (top >= -45) {
      top -= 5;
      item.style.top=top+"px"
    } else {
      item.style.top = -45 +"px";
      clearInterval(animateEffect);
    }
  }, time);
  }
  // fadeOut
function fadeOutEffect(item, time) {
    var fadeEffect = setInterval(function () {
        if (!item.style.opacity) {
            item.style.opacity = 1;
        }
        if (item.style.opacity > 0) {
            item.style.opacity -= 0.1;
        } else {
          item.style.display = 'none';
            clearInterval(fadeEffect);
        }
    }, time);
}
// fadein
function fadeInEffect(item, time) {
  var fadeEffect = setInterval(function () {
    
    if (item) {
        item.style.display = 'block';
      }
      
      if (!item.style.opacity) {
            item.style.opacity = 0;
      }
       
        if (item.style.opacity < 1) {
          item.style.opacity = parseFloat(item.style.opacity) + 0.1;

        } else {
            clearInterval(fadeEffect);
        }
    }, time);
}
    /*=========================
        Display functions
  ==========================*/
  MYAPP.display = {  
    hideGameStarter: function() {
      fadeOutEffect(gameStarter, 0);
  },
  
    showGameStarter: function(isTwoPlayer) {
    var message;
    if (isTwoPlayer) {
      message = "Player 1 : Would you like X or O?";
    }
    else {
      message = "Would you like to be X or O?";
    }
    MYAPP.timeOuts.push(
      setTimeout(function () {
        gameStarterParagraph.textContent = message;
        fadeInEffect(gameStarter, 50);
    }, 700));
  },
  
    showGameChoice: function () {
      fadeInEffect(gameChoice, 60);
    
  },
  
    hideGameChoice: function () {
      gameChoice.addEventListener('click', fadeOutEffect(gameChoice, 60));
    
  },
  
    showPlayerOnePrompt: function () {
      
      if (MYAPP.secondPlayer) {
        playerOneTurnP.innerText = 'Go Player 1!';
      
    }
    else {
        playerOneTurnP.innerText = 'Your turn!';
     
      }
      animateShow(playerOneTurn, 50);
    
  },
  
    hidePlayerOnePrompt: function () {
     
      animateHide(playerOneTurn, 100);
  },
  
    showPlayerTwoPrompt: function () {
      
      if (MYAPP.secondPlayer) {
        playerTwoTurnP.innerText = 'Go Player 2!';
     
    }
      else {
         playerTwoTurnP.innerText = 'Computer\'s turn';
      
      }
      
      animateShow(playerTwoTurn, 50);
    
  },
  
    hidePlayerTwoPrompt: function () {
      
    animateHide(playerTwoTurn, 100);
  },
  
    showDrawMessage: function() {
      
    MYAPP.timeOuts.push(
      setTimeout(function() {
        fadeInEffect(drawMessage, 50);
    }, 1500));
  },
  
    hideDrawMessage: function () {
      fadeOutEffect(drawMessage, 100);
  },
  
    showLoseMessage: function() {
      MYAPP.timeOuts.push(
        setTimeout(function() {
          fadeInEffect(loseMessage, 50);
  }, 1500)
      );
  },
  
    hideLoseMessage: function () {
      fadeOutEffect(loseMessage, 100);
  },
  
    showWinMessage: function() {
      MYAPP.timeOuts.push(
        setTimeout(function () {
          winMessage.children[0].innerText="Player " + MYAPP.turn + " wins!! :D "
          fadeInEffect(winMessage, 50);
  }, 1500));
  },
  
    hideWinMessage: function () {
      fadeOutEffect(winMessage, 100);
  },
  
    drawBoard: function() {
      MYAPP.timeOuts.push(setTimeout(function() {
      
      canvas.lineWidth = 1;
      canvas.strokeStyle = "#fff";
      //vertical lines
      canvas.beginPath();
      canvas.moveTo(100, 0);
      canvas.lineTo(100, 146.5);
      canvas.closePath();
      canvas.stroke();
      canvas.beginPath();
      canvas.moveTo(200, 0);
      canvas.lineTo(200, 146.5);
      canvas.closePath();
      canvas.stroke();
  
      // horizontal lines
      canvas.lineWidth = 0.5;
  
      canvas.beginPath();
      canvas.moveTo(4, 48.5);
      canvas.lineTo(296, 48.5);
      canvas.closePath();
      canvas.stroke();
        
      canvas.beginPath();
      canvas.moveTo(4, 98.5);
      canvas.lineTo(296, 98.5);
      canvas.closePath();
      canvas.stroke();  
    }, 1500));
  },
  
    resetSquares: function () {
      boxes.innerHTML = '';
    
    for (var i = 1; i <= 9; i++) {
      var box = '<li class="' + i + '"><i class="letter"><span></span></i></li>';
      boxes.innerHTML += box;
    }
  },
    
    showScore: function() {
      if (MYAPP.secondPlayer) {
        score1Name.textContent = 'player 1';
        score2Name.textContent = 'player 2';
      }
      else {
        score1Name.textContent = 'player 1';
        score2Name.textContent = 'computer';
      }
      score1Points.textContent = '0';
      score2Points.textContent = '0';
      fadeInEffect(score1, 0);
      fadeInEffect(score2, 0);
      fadeInEffect(pointsDivider, 0);
    },
    updateScore: function(turn) {
      var currentScore = turn === 1 ? MYAPP.playerOneScore : MYAPP.playerTwoScore;
  
      $('.score-' + turn).children('.points').text(currentScore);
    }
  };
  
  /*=========================
        Game Logic
  ==========================*/
  MYAPP.game = {
    whoStarts: function() {
      var random = Math.floor(Math.random() * 2 + 1);
      return random;
    },
    gameSelection: function (item) {
      if (item.textContent === 'One Player') {
        // returns what secondPlayer value to set
        return false;
      }
      else {
        return true;
      } 
    },
    firstGame: function () {
      MYAPP.playerOneSymbol = this.textContent;
      MYAPP.playerTwoSymbol = MYAPP.playerOneSymbol == 'X' ? 'O' : 'X'; 
      MYAPP.turn = MYAPP.game.whoStarts();
      MYAPP.display.hideGameStarter();
      fadeInEffect(canvasWrapper, 120);
      fadeInEffect(hardReset, 60);
      MYAPP.display.showScore();
      MYAPP.display.resetSquares();
      MYAPP.game.play();
    },
    play: function () {
      MYAPP.boxList = document.querySelectorAll('.boxes li');
      MYAPP.gameInPlay = true;
      MYAPP.boxList.forEach(li => {
        li.addEventListener('click', function () {
          MYAPP.game.playerTurn(this);
        });
      });
           
      MYAPP.timeOuts.push(
        setTimeout(function(){
        if (MYAPP.turn === 1) {
          MYAPP.display.showPlayerOnePrompt();
        }
        else if (MYAPP.turn === 2) {
          MYAPP.display.showPlayerTwoPrompt();
        }
      }, 1500),
      setTimeout(function() {
        if (MYAPP.turn === 2 && !MYAPP.secondPlayer) {
          MYAPP.game.computerPlay();
        }
      }, 1200));
    },
    playerTurn: function(square) {
      var symbol = MYAPP.turn === 1 ? MYAPP.playerOneSymbol : MYAPP.playerTwoSymbol;
      
      
      var box = square.children[0].children[0];
      if (box.innerText === '' && MYAPP.gameInPlay && (MYAPP.turn === 1 || (MYAPP.turn === 2 && MYAPP.secondPlayer))) {
        box.innerText=symbol;
        var number = square.className;
        MYAPP.game.updateSquare(number, symbol);
        MYAPP.game.endTurn(symbol);
      }
    },
    computerPlay: function() {
      var computer = MYAPP.computer;
      //test computer move suggestion
      var boxNumber;
      if (computer.computerWhichMove(MYAPP.game) && MYAPP.turn === 2) {
        boxNumber = computer.computerWhichMove(MYAPP.game);
       
        var currentBox = document.getElementsByClassName(boxNumber)[0].children[0];
        
        
        var symbol = MYAPP.playerTwoSymbol;
  
        MYAPP.timeOuts.push(
          setTimeout(function () {
            
          currentBox.children[0].innerText=symbol;
          MYAPP.game.updateSquare(boxNumber, MYAPP.playerTwoSymbol);
          MYAPP.game.endTurn(symbol);
        }, 1000));
      } 
    },
    endTurn: function(symbol) {
      MYAPP.numFilledIn = MYAPP.numFilledIn + 1;
      if (MYAPP.gameInPlay) {
        if (MYAPP.game.checkWin(symbol)[0]) {
          MYAPP.game.updateScore(MYAPP.turn);
          if (MYAPP.secondPlayer) {
            MYAPP.display.showWinMessage();
          }
          else {
            MYAPP.turn === 1 ? MYAPP.display.showWinMessage() : MYAPP.display.showLoseMessage();
          }
          MYAPP.gameInPlay = false;
          MYAPP.game.showWinningCombination();
          MYAPP.display.hidePlayerOnePrompt();
          MYAPP.display.hidePlayerTwoPrompt();
          MYAPP.game.reset();
        }
        // stop if it is a draw
        else if (MYAPP.numFilledIn >= 9) {
          MYAPP.gameInPlay = false;
          MYAPP.display.hidePlayerOnePrompt();
          MYAPP.display.hidePlayerTwoPrompt();
          MYAPP.display.showDrawMessage();
          MYAPP.turn = MYAPP.game.whoStarts();
          MYAPP.game.reset();
        } else {
          if (MYAPP.turn === 1) {
            MYAPP.display.hidePlayerOnePrompt();
            MYAPP.display.showPlayerTwoPrompt();
            MYAPP.turn = 2;
            // call computer turn if no second player
            if (!MYAPP.secondPlayer) {
              MYAPP.game.computerPlay();
            }
          } else if (MYAPP.turn === 2) {
            MYAPP.display.showPlayerOnePrompt();
            MYAPP.display.hidePlayerTwoPrompt();
            MYAPP.turn = 1;
          }
        }
      }
    },
    updateSquare: function(number, symbol) {
      MYAPP.currentBoard[number] = symbol;
    },
    checkWin: function(symbol) {
      var currentBoard = MYAPP.currentBoard;
      var wins = MYAPP.winCombos;
      var winningCombo = [];
      var winner = wins.some(function(combination) {
        var winning = true;
        for (var i = 0; i < combination.length; i++) {
          if (currentBoard[combination[i]] !== symbol) {
            winning = false;
          }
        }
        if (winning) {
          winningCombo = combination;
        }
        return winning;
      });
      return [winner, winningCombo];
    },
    showWinningCombination: function() {
      var symbol = MYAPP.turn === 1 ? MYAPP.playerOneSymbol : MYAPP.playerTwoSymbol;
      var combo = MYAPP.game.checkWin(symbol)[1];
      for (var i = 0; i < combo.length; i++) {
        var currentBox = document.getElementsByClassName(combo[i])[0]; 
     // Black box and rotating test for winning combo 
        currentBox.children[0].classList.add('win');
        currentBox.children[0].children[0].classList.add('rotate')
       }
    },
    updateScore: function(turn) {
      turn === 1 ? MYAPP.playerOneScore += 1 : MYAPP.playerTwoScore += 1; 
      
      MYAPP.display.updateScore(turn);
      
    },
    reset: function() {
      MYAPP.initializeVars();
      
      MYAPP.timeOuts.push(
        setTimeout(function() {
          MYAPP.display.hideDrawMessage();
          MYAPP.display.hideLoseMessage();
          MYAPP.display.hideWinMessage();
          
          
            MYAPP.boxList.forEach(li => {
            fadeOutEffect(li,0)
          });
          
          
        }, 5000),
        setTimeout(function(){
          MYAPP.display.resetSquares();
          
          
            MYAPP.boxList.forEach(li => {
            fadeInEffect(li, 0);
          });
          
          
          MYAPP.numFilledIn = 0;
        }, 6000),
      //Make sure time for next timeout is long enough
      //to not cause problems after first game
        setTimeout(function() {
          MYAPP.gameInPlay = true;
          MYAPP.game.play();
        }, 6000)
        );
    },
    resetGame: function() {
      $('#myCanvas').css('opacity', '0');
      $('.hard-reset').fadeOut();
      $('.points-divider, .score-1, .score-2').fadeOut();
      MYAPP.playerOneScore = 0;
      MYAPP.playerTwoScore = 0;
      MYAPP.display.resetSquares();
      MYAPP.initializeVars();
      MYAPP.gameInPlay = false;
      MYAPP.playerOneSymbol = null;
      MYAPP.playerTwoSymbol = null;
      MYAPP.timeOuts.forEach(function(timer) {
        clearTimeout(timer);
      });
      $('.draw-message, .win-message, .lose-message').hide();
      MYAPP.display.hidePlayerOnePrompt();
      MYAPP.display.hidePlayerTwoPrompt();
      MYAPP.display.showGameChoice();
    }
  };
  
  /* End Game Logic */
    
  /*================================
      Computer Move Decisions
  =================================*/    
  
  MYAPP.computer = {
    computerWhichMove: function () {
      var move = this.winOrBlockChoice('win')[0];
      if (!move) {
        move = this.winOrBlockChoice('block')[0];
        console.log(this.winOrBlockChoice('block'));
      }
      if (!move) {
        move = this.doubleThreatChoice('win');
      }
      if (!move) {
        move = this.doubleThreatChoice('block');
      }
      if (!move) {
        move = this.firstPlay();
      }
      if (!move) {
        move = this.playCenter();
      }
      if (!move) {
        move = this.emptyCorner();
      }
      if (!move) {
        move = this.emptySide();
      }
      move = (move && MYAPP.currentBoard[move]) === '' ? move : false;
      return move;
    },
  
    winOrBlockChoice: function(choiceType, board) {
      var board = board || MYAPP.currentBoard;
      if (choiceType === 'win') {
        var currentSymbol = MYAPP.playerTwoSymbol;
        var opponentSymbol = MYAPP.playerOneSymbol;
      } else if (choiceType === 'block') {
        var currentSymbol = MYAPP.playerOneSymbol;
        var opponentSymbol = MYAPP.playerTwoSymbol;
      } else {
        return;
      }
      var moves = [];
      MYAPP.winCombos.forEach(function(combo) {
        var notFound = [];
        var notPlayer = true;
        for (var i = 0; i < combo.length; i++) {
          if (board[combo[i]] !== currentSymbol) {
            if (board[combo[i]] === opponentSymbol) {
              notPlayer = false;
            } else {
              notFound.push(combo[i]);
            }
          }
        }
        if (notFound.length === 1 && notPlayer) {
          var move = notFound[0];
          moves.push(move);
        }
      });
      return moves;
  },
  
    doubleThreatChoice: function(choiceType) {
    // use winChoice function to test a spot for double threat
    var board = MYAPP.currentBoard;
    var move;
  
    if (choiceType === 'win') {
      var currentSymbol = MYAPP.playerTwoSymbol;
      var opponentSymbol = MYAPP.playerOneSymbol;
    } else if (choiceType === 'block') {
      var currentSymbol = MYAPP.playerOneSymbol;
      var opponentSymbol = MYAPP.playerTwoSymbol;
    }
  
    // forced diagonal win on 4th move prevention
      if (board[5] === currentSymbol && MYAPP.numFilledIn === 3) {
        if ((board[1] === opponentSymbol && board[9] === opponentSymbol) || (board[3] === opponentSymbol && board[7] === opponentSymbol)) {
          // Play an edge to block double threat
          move = this.emptySide();
        }
      }
    
      if (!move && board[5] === opponentSymbol && MYAPP.numFilledIn === 2) {
        move = this.diagonalSecondAttack();
      }
  
    if (!move) {
      // clone current board;
      var testBoard = $.extend({}, board);
      for (var i = 1; i <= 9; i++) {
  
        testBoard = $.extend({}, board);
        if (testBoard[i] === '') {
          testBoard[i] = currentSymbol;
          if (this.winOrBlockChoice(choiceType, testBoard).length >= 2) {
            move = i;
          }
        }
      }
    }
    return move || false;
  },
  
    diagonalSecondAttack: function() {
    var board = MYAPP.currentBoard;
    var comp = MYAPP.playerTwoSymbol;
    var corners = [1,3,7,9];
    for (var i = 0; i < corners.length; i++) {
      if (board[corners[i]] === comp) {
        return 10 - corners[i];
      }
    }
  },
  
    firstPlay: function() {
    var board = MYAPP.currentBoard;
    var corners = [1, 3, 7, 9];
    var move;
    if (MYAPP.numFilledIn === 1) {
      // player plays center
      if (board[5] === MYAPP.playerOneSymbol) {
        var cornerNum = Math.floor(Math.random() * 4 + 1);
        move = [1, 3, 7, 9][cornerNum];
      }
      //player plays corner, play opposite corner
      else {
        for (var i = 0; i < corners.length; i++) {
          if (MYAPP.currentBoard[corners[i]] === MYAPP.playerOneSymbol) {
            move = 5;
          }
        }
      }
    } else if (MYAPP.numFilledIn === 0) {
      var cornerNum = Math.floor(Math.random() * corners.length + 1);
      move = corners[cornerNum];
    }
    return move ? move : false;
  },
    
    playCenter: function() {
      if (MYAPP.currentBoard[5] === '') {
        return 5;
      }
    },
    emptyCorner: function() {
    var board = MYAPP.currentBoard;
    var corners = [1, 3, 7, 9];
    var move;
    for (var i = 0; i < corners.length; i++) {
      if (board[corners[i]] === '') {
        move = corners[i];
      }
    }
    return move || false;
  },
  
    emptySide: function() {
    var sides = [2, 4, 6, 8];
    for (var i = 0; i < sides.length; i++) {
      if (MYAPP.currentBoard[sides[i]] === '') {
        return sides[i];
      }
    }
    return false;
  }
  };
  
  /* End Computer Move Decisions */  
  window.addEventListener('load', (event) => {
    MYAPP.initializeGame();
});
  
  
  /* end game initialization */
  
  