const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export default function GameBoard({ handlegetSelectedSquare, gameTurns }) {
  //gameTurns의 상태에서 파생된 gameBoard
  let gameBoard = initialGameBoard;

  for (const gameTurn of gameTurns) {
    const { square, player } = gameTurn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return (
    <ul id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ul>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handlegetSelectedSquare(rowIndex, colIndex)}>{playerSymbol}</button>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
