export default function GameBoard({ handlegetSelectedSquare, gameBoard }) {
  return (
    <ul id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ul>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handlegetSelectedSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
