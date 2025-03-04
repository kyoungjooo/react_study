import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  // 기본적으로 currentPlayer은 X이다.
  // 이전이 X라면 currentPlayer은 O이다.
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  //현재 누가 플레이어인지 UI에 반영하는 용도
  const activePlayer = deriveActivePlayer(gameTurns);

  const handlegetSelectedSquare = (rowIndex, colIndex) => {
    //버튼을 누른 후
    setGameTurns((prevTurns) => {
      //현재 상태가 아닌, 이전 상태(prevTurns) 기준으로 activePlayer 계산
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ul id="players" className="highlight-player">
          <Player initialName="player1" symbol="X" isActive={activePlayer === "X"} />
          <Player initialName="player2" symbol="O" isActive={activePlayer === "O"} />
        </ul>
        <GameBoard handlegetSelectedSquare={handlegetSelectedSquare} gameTurns={gameTurns} />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
