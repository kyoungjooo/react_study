export function Log({ gameTurns }) {
  return (
    <ul id="log">
      {gameTurns.map((turn) => {
        const { square, player } = turn;
        const { row, col } = square;
        return (
          <li key={`${row}${col}`}>
            player: {player} selected: {row},{col}
          </li>
        );
      })}
    </ul>
  );
}
