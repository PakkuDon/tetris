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
    this.currentPiece = this.getRandomPiece()
    this.x = Math.floor(COLUMNS / 2) - Math.floor(this.currentPiece.length / 2)
    this.y = 0
    this.nextPiece = null

    for (let i = 0; i < ROWS; i++) {
      let row = new Array(COLUMNS)
      row.fill(false)
      this.grid.push(row)
    }
  }

  getRandomPiece() {
    return TETRONIMOES[Math.floor(Math.random() * TETRONIMOES.length)]
  }
}
