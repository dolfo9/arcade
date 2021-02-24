const gameState = {
    winner: null,
    currentPlayer: "x",
    gameStarted: false,
    singlePlayer: true,
    compPlayed: true,
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  }


function buildInitialState() {
  gameState.winner = null
  gameState.compPlayed = true
  gameState.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
  const board = $(".grid")
    board.empty()
    gameState.board.forEach((row, idx) => {
        row.forEach((cell, index) =>{
            const div = $("<div>").addClass(`cell`).html(`
                ${cell ? cell : ''}
            `).attr("id", `${idx}_${index}`)
            board.append(div)
        })
    })
    gameState.gameStarted = false
    displayTurn()
}

function displayTurn() {
  const h3 = $("#currentPlayer h3")
  if(!gameState.winner && !gameState.singlePlayer)
    gameState.currentPlayer === "x" ? h3.text("Current Player: X") : h3.text("Current Player: O")
  else if(!gameState.winner && gameState.singlePlayer){
    gameState.compPlayed ? h3.text(`Current Player: ${gameState.currentPlayer.toUpperCase()}`) : h3.text(`Current Player: Computer as '${gameState.currentPlayer.toUpperCase()}'`)
  }else
    h3.text(`Found Winner: ${gameState.winner.toUpperCase()}`)
}

function checkWinner() {
  if(checkDiags())
  return true
  else if(checkColumns())
  return true
  else if(checkRows())
  return true
  else
  return false
}

function checkRows() {
  const topRowString = [gameState.board[0][0], gameState.board[0][1], gameState.board[0][2]]
  const middleRowString = [gameState.board[1][0], gameState.board[1][1], gameState.board[1][2]]
  const bottomRowString = [gameState.board[2][0], gameState.board[2][1], gameState.board[2][2]]
  if(checkString(topRowString))
      return true
  else if (checkString(middleRowString))
      return true
  else if (checkString(bottomRowString))
      return true
  else
      return false
}
//checking  
function checkColumns() {
  const leftColumnString = [gameState.board[0][0], gameState.board[1][0], gameState.board[2][0]]
  const middleColumnString = [gameState.board[0][1], gameState.board[1][1], gameState.board[2][1]]
  const rightColumnString = [gameState.board[0][2], gameState.board[1][2], gameState.board[2][2]]
  if(checkString(leftColumnString))
      return true
  else if (checkString(middleColumnString))
      return true
  else if (checkString(rightColumnString))
      return true
  else
      return false
}


function checkTie() {
  const board = gameState.board.flat()
  if(board.includes(null)) {
    return false
  }else if (!gameState.winner) {
    gameState.winner = "tie"
    return true
  }else{
    return false
  }
}

function checkString(stringArray) {
  if(stringArray.includes(null)){
    return false
  }else if (stringArray[0] === stringArray[1] && stringArray[1] === stringArray[2]){
    gameState.winner = stringArray[0]
    console.log(gameState.winner)
    return true
  }else{
    return false
  }
}


function checkDiags() {
  const leftdiagString = [gameState.board[0][0], gameState.board[1][1], gameState.board[2][2]]
  const rightdiagString = [gameState.board[0][2], gameState.board[1][1], gameState.board[2][0]]
  if(checkString(leftdiagString))
      return true
  else if (checkString(rightdiagString))
      return true
  else
      return false
}

// render
function renderState() {
    const board = $(".grid")
    board.empty()
    gameState.board.forEach((row, idx) => {
        row.forEach((cell, index) =>{
            const div = $("<div>").addClass(`cell`).html(`
                ${cell ? cell === "x" ? `<img id="cell" src="X.png"/>`: `<img id="cell" src="O.png"/>` : ''}   
            `).attr("id", `${idx}_${index}`)
            board.append(div)
        })
    })
    if(checkWinner() || checkTie())
      console.log("found winner")
    displayTurn()
}

function compPlays(row, index) {
  if(!gameState.winner){
    setTimeout(() => {
      gameState.board[row][index] = gameState.currentPlayer
      gameState.currentPlayer === "x" ? gameState.currentPlayer = "o" : gameState.currentPlayer = "x"
      gameState.compPlayed = true
      renderState()
    }, 2000)
  }
}


// maybe a dozen or so helper functions for tiny pieces of the interface

// listeners
function onBoardClick(event) {
  // update state, maybe with another dozen or so helper functions....
  gameState.gameStarted = true
  const cell = $(event.target).attr("id")
  const row = cell[0] * 1
  const index = cell[2] * 1
  if(gameState.singlePlayer){
    if(!gameState.board[row][index] && !gameState.winner && gameState.compPlayed){
      gameState.board[row][index] = gameState.currentPlayer
      gameState.currentPlayer === "x" ? gameState.currentPlayer = "o" : gameState.currentPlayer = "x"
      gameState.compPlayed = false
    }
    renderState()
    if(gameState.singlePlayer && !gameState.compPlayed && !gameState.winner){
      let validSquare = gameState.board[row][index]
      let validRow
      let validIndex
      while(validSquare){
        validRow = Math.floor(Math.random() * 3)
        validIndex = Math.floor(Math.random() * 3)
        validSquare = gameState.board[validRow][validIndex]
      }
      compPlays(validRow, validIndex)
    }
  }else{
    if(!gameState.board[row][index] && !gameState.winner){
      gameState.board[row][index] = gameState.currentPlayer
      gameState.currentPlayer === "x" ? gameState.currentPlayer = "o" : gameState.currentPlayer = "x"
    }
    renderState()
  }
  console.log(cell)
   // show the user the new state
}


buildInitialState()
$('.grid').on('click', onBoardClick);


$('.reset').on('click', buildInitialState);

$('#selectX').on('click', () => {
  if(!gameState.gameStarted) {
    gameState.currentPlayer = ("x")
    displayTurn()
  }
});

$('#single').on('click', () => {
  gameState.singlePlayer = true
  buildInitialState()
});

$('#multi').on('click', () => {
  gameState.singlePlayer = false
  buildInitialState()
});

$('#selectO').on('click', () => {
  if(!gameState.gameStarted) {
    gameState.currentPlayer = ("o")
    displayTurn()
  }
});

