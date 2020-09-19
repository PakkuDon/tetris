const game = new Game()
const gridCanvas = document.querySelector('canvas')
const gridGraphicsContext = gridCanvas.getContext('2d')
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
  for (let i = 0; i < currentPiece.length; i++) {
    for (let j = 0; j < currentPiece[i].length; j++) {
      if (currentPiece[i][j]) {
        drawBlock(
          grid,
          graphicsContext,
          j + game.x,
          i + game.y,
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

drawGrid(game.grid, gridGraphicsContext)
drawStats(game)

setInterval(() => {
  game.moveBlock()
  drawGrid(game.grid, gridGraphicsContext)
  drawStats(game)
}, 1000)
