const COLUMNS = 10
const ROWS = 20

const I_TETRONIMO = [
  [true],
  [true],
  [true],
  [true],
]

const L_TETRONIMO = [
  [false, false, true],
  [true, true, true],
]

const J_TETRONIMO = [
  [true, false, false],
  [true, true, true],
]

const O_TETRONIMO = [
  [true, true],
  [true, true],
]

const S_TETRONIMO = [
  [false, true, true],
  [true, true, false],
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
  J_TETRONIMO,
  L_TETRONIMO,
  O_TETRONIMO,
  S_TETRONIMO,
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

  isAtBoundary(x, y) {
    return x <= 0 || x >= COLUMNS || y >= ROWS
  }

  overlapsWithSetBlock(x, y, piece) {
    for (let pieceY = 0; pieceY < piece.length && (pieceY + y) < COLUMNS; pieceY++) {
      for (let pieceX = 0; pieceX < piece[pieceY].length && (pieceX + x) < ROWS; pieceX++) {
        if (piece[pieceY][pieceX] && this.grid[y + pieceY][x + pieceX]) {
          return true
        }
      }
    }
    return false
  }

  tick() {
    const bottomY = this.y + this.currentPiece.length
    if (this.isAtBoundary(this.x, bottomY) || this.overlapsWithSetBlock(this.x, this.y + 1, this.currentPiece)) {
      for (let pieceY = 0; pieceY < this.currentPiece.length; pieceY++) {
        for (let pieceX = 0; pieceX < this.currentPiece[pieceY].length; pieceX++) {
          if (this.currentPiece[pieceY][pieceX]) {
            this.grid[this.y + pieceY][this.x + pieceX] = true
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
