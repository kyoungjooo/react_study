import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import { Log } from "./components/Log";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");
  const handlegetSelectedSquare = (rowIndex, colIndex) => {
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";
      if (gameTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: activePlayer }, ...prevTurns];
      return updatedTurns;
    });
  };

  console.log(gameTurns);
  return (
    <main>
      <div id="game-container">
        <ul id="players" className="highlight-player">
          <Player initialName="player1" symbol="X" isActive={activePlayer === "X"} />
          <Player initialName="player2" symbol="O" isActive={activePlayer === "O"} />
        </ul>
        <GameBoard handlegetSelectedSquare={handlegetSelectedSquare} gameTurns={gameTurns} />
      </div>
      <Log />
    </main>
  );
}

export default App;
