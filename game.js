const COLUMNS = 10
const ROWS = 20

class Game {
  constructor() {
    this.grid = []
    this.lines = 0
    this.score = 0
    this.currentPiece = null
    this.nextPiece = null

    for (let i = 0; i < ROWS; i++) {
      let row = new Array(COLUMNS)
      row.fill(false)
      this.grid.push(row)
    }
  }
}
