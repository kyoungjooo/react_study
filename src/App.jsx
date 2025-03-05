import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

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

  let gameBoard = initialGameBoard;

  for (const gameTurn of gameTurns) {
    const { square, player } = gameTurn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = null;
  const isDraw = gameTurns.length === 9 && !winner;

  //게임판에서 symbol 추출해 우승 조건에 맞는지 확인
  for (const combination of WINNING_COMBINATIONS) {
    //combination -> 하나의 승리 조합(배열)
    //combination[0] -> [{ row: 0, column: 0 }, { row: 0, column: 1 }, { row: 0, column: 2 }]
    //각 칸의 값 가져오기
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }
  }

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
        {(winner || isDraw) && <GameOver winner={winner} />}
        <GameBoard handlegetSelectedSquare={handlegetSelectedSquare} gameBoard={gameBoard} />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
