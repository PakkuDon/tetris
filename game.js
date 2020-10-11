const COLUMNS = 10
const ROWS = 20
const DELTA_TIME = 1000

const I_TETRONIMO = [
  [
    [true],
    [true],
    [true],
    [true],
  ],
]

const L_TETRONIMO = [
  [
    [false, false, true],
    [true, true, true],
  ],
]

const J_TETRONIMO = [
  [
    [true, false, false],
    [true, true, true],
  ],
]

const O_TETRONIMO = [
  [
    [true, true],
    [true, true],
  ],
]

const S_TETRONIMO = [
  [
    [false, true, true],
    [true, true, false],
  ],
]

const T_TETRONIMO = [
  [
    [false, true, false],
    [true, true, true],
  ],
]

const Z_TETRONIMO = [
  [
    [true, true, false],
    [false, true, true],
  ],
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
    return TETRONIMOES[Math.floor(Math.random() * TETRONIMOES.length)][0]
  }

  isAtBoundary(value, boundary) {
    return value === boundary
  }

  overlapsWithSetBlock(x, y, piece) {
    for (let pieceY = 0; pieceY < piece.length && (pieceY + y) < ROWS; pieceY++) {
      for (let pieceX = 0; pieceX < piece[pieceY].length && (pieceX + x) < COLUMNS; pieceX++) {
        if (piece[pieceY][pieceX] && this.grid[y + pieceY][x + pieceX]) {
          return true
        }
      }
    }
    return false
  }

  moveLeft() {
    if (!(this.isAtBoundary(this.x, 0) || this.overlapsWithSetBlock(this.x - 1, this.y, this.currentPiece))) {
      this.x--
    }
  }

  moveRight() {
    if (!(this.isAtBoundary(this.x, COLUMNS - this.currentPiece.length - 1) || this.overlapsWithSetBlock(this.x + 1, this.y, this.currentPiece))) {
      this.x++
    }
  }

  tick() {
    if (this.isAtBoundary(this.y + this.currentPiece.length, ROWS) || this.overlapsWithSetBlock(this.x, this.y + 1, this.currentPiece)) {
      this.setPiece(this.x, this.y, this.currentPiece)
      this.initialiseCurrentPiece()
      this.nextPiece = this.getRandomPiece()
    }
    else {
      this.y++
    }
  }

  setPiece(x, y, piece) {
    for (let pieceY = 0; pieceY < piece.length; pieceY++) {
      for (let pieceX = 0; pieceX < piece[pieceY].length; pieceX++) {
        if (piece[pieceY][pieceX]) {
          this.grid[this.y + pieceY][this.x + pieceX] = true
        }
      }
    }
  }
}
