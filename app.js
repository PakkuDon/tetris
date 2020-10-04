const game = new Game()
const gridCanvas = document.querySelector('canvas#board')
const gridGraphicsContext = gridCanvas.getContext('2d')
const nextPieceCanvas = document.querySelector('canvas#next-piece')
const nextPieceGraphicsContext = nextPieceCanvas.getContext('2d')
const scoreDisplay = document.querySelector('#score')
const levelsDisplay = document.querySelector('#levels')
const linesClearedDisplay = document.querySelector('#lines')

const drawBlock = (grid, graphicsContext, x, y) => {
  const cellWidth = graphicsContext.canvas.width / grid[0].length
  const cellHeight = graphicsContext.canvas.height / grid.length

  graphicsContext.strokeStyle = '#000'
  graphicsContext.fillStyle = '#000'
  graphicsContext.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight)

  graphicsContext.strokeStyle = '#FFF'
  graphicsContext.strokeRect(x * cellWidth + 5, y * cellHeight + 5, cellWidth - 10, cellHeight - 10)
}

const clearCell = (grid, graphicsContext, x, y) => {
  const cellWidth = graphicsContext.canvas.width / grid[0].length
  const cellHeight = graphicsContext.canvas.height / grid.length

  graphicsContext.clearRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight)
}

const drawGrid = (grid, graphicsContext) => {
  const canvasWidth = graphicsContext.canvas.width
  const canvasHeight = graphicsContext.canvas.height

  graphicsContext.clearRect(0, 0, graphicsContext.canvas.width, graphicsContext.canvas.height)

  for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid[y].length; x++) {
      if (grid[y][x]) {
        drawBlock(grid, graphicsContext, x, y)
      }
      else {
        clearCell(grid, graphicsContext, x, y)
      }
    }
  }

  const currentPiece = game.currentPiece
  for (let pieceY = 0; pieceY < currentPiece.length; pieceY++) {
    for (let pieceX = 0; pieceX < currentPiece[pieceY].length; pieceX++) {
      if (currentPiece[pieceY][pieceX]) {
        drawBlock(
          grid,
          graphicsContext,
          pieceX + game.x,
          pieceY + game.y,
        )
      }
    }
  }
}

const drawStats = (game) => {
  scoreDisplay.textContent = game.score
  levelsDisplay.textContent = game.levels
  linesClearedDisplay.textContent = game.linesCleared
}

const drawNextPiece = (piece, graphicsContext) => {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x]) {
        drawBlock(piece, graphicsContext, x, y)
      }
      else {
        clearCell(piece, graphicsContext, x, y)
      }
    }
  }
}

drawGrid(game.grid, gridGraphicsContext)
drawStats(game)
drawNextPiece(game.nextPiece, nextPieceGraphicsContext)

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    game.moveLeft()
  }
  else if (event.key === 'ArrowRight') {
    game.moveRight()
  }
  drawGrid(game.grid, gridGraphicsContext)
  drawStats(game)
  drawNextPiece(game.nextPiece, nextPieceGraphicsContext)
})

setInterval(() => {
  game.tick()
  drawGrid(game.grid, gridGraphicsContext)
  drawStats(game)
  drawNextPiece(game.nextPiece, nextPieceGraphicsContext)
}, 1000)
