const game = new Game()
const gridCanvas = document.querySelector('canvas')
const gridGraphicsContext = gridCanvas.getContext('2d')
const scoreDisplay = document.querySelector('#score')
const levelsDisplay = document.querySelector('#levels')
const linesClearedDisplay = document.querySelector('#lines')

const drawGrid = (grid, graphicsContext) => {
  const canvasWidth = graphicsContext.canvas.width
  const canvasHeight = graphicsContext.canvas.height
  const cellWidth = canvasWidth / grid[0].length
  const cellHeight = canvasHeight / grid.length

  graphicsContext.clearRect(0, 0, canvasWidth, canvasHeight)

  for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid[y].length; x++) {
      if (grid[y][x]) {
        graphicsContext.fillStyle = '#000'
      }
      else {
        graphicsContext.fillStyle = '#FFF'
      }
      graphicsContext.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight)
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
