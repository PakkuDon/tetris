const COLUMNS = 10
const ROWS = 20

const I_TETRONIMO = [
  [true],
  [true],
  [true],
  [true],
]

const L_TETRONIMO = [
  [true, false, false],
  [true, true, true],
]

const O_TETRONIMO = [
  [true, true],
  [true, true],
]

const T_TETRONIMO = [
  [false, true, false],
  [true, true, true],
]

const Z_TETRONIMO = [
  [true, true, false],
  [false, true, true],
]

const TETRONIMOES = [
  I_TETRONIMO,
  L_TETRONIMO,
  O_TETRONIMO,
  T_TETRONIMO,
  Z_TETRONIMO,
]

class Game {
  constructor() {
    this.grid = []
    this.linesCleared = 0
    this.levels = 1
    this.score = 0
    this.initialiseCurrentPiece()
    this.nextPiece = this.getRandomPiece()

    for (let i = 0; i < ROWS; i++) {
      let row = new Array(COLUMNS)
      row.fill(false)
      this.grid.push(row)
    }
  }

  initialiseCurrentPiece() {
    this.currentPiece = this.nextPiece || this.getRandomPiece()
    this.x = Math.floor(COLUMNS / 2) - Math.floor(this.currentPiece.length / 2)
    this.y = 0
  }

  getRandomPiece() {
    return TETRONIMOES[Math.floor(Math.random() * TETRONIMOES.length)]
  }

  isAtBoundary(y) {
    return y >= ROWS
  }

  moveBlock() {
    const bottomY = this.y + this.currentPiece.length
    if (this.isAtBoundary(bottomY) || this.grid[bottomY][this.x]) {
      for (let i = 0; i < this.currentPiece.length; i++) {
        for (let j = 0; j < this.currentPiece[i].length; j++) {
          if (this.currentPiece[i][j]) {
            this.grid[this.y + i][this.x + j] = true
          }
        }
      }

      this.initialiseCurrentPiece()
      this.nextPiece = this.getRandomPiece()
    }
    else {
      this.y++
    }
  }
}
