import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import "./App.css";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const PLAYERS = {
  X: "PLAYER1",
  O: "PLAYER2",
};

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";
  // 기본적으로 currentPlayer은 X이다.
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  // 이전이 X라면 currentPlayer은 O이다.
  return currentPlayer;
};

const deriveWinner = (gameBoard, playerName) => {
  let winner;
  //게임판에서 symbol 추출해 우승 조건에 맞는지 확인
  for (const combination of WINNING_COMBINATIONS) {
    //combination -> 하나의 승리 조합(배열)
    //combination[0] -> [{ row: 0, column: 0 }, { row: 0, column: 1 }, { row: 0, column: 2 }]
    //각 칸의 값 가져오기
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = playerName[firstSquareSymbol];
    }
  }
  return winner;
};

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD].map((array) => [...array]);
  for (const gameTurn of gameTurns) {
    const { square, player } = gameTurn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setPlayerName] = useState(PLAYERS);

  //현재 누가 플레이어인지 UI에 반영하는 용도
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, playerName);
  const isDraw = gameTurns.length === 9 && !winner;
  const handlegetSelectedSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      //현재 상태가 아닌, 이전 상태(prevTurns) 기준으로 activePlayer 계산
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    });
  };

  const handleRematch = () => setGameTurns([]);

  const handleChangePlayerName = (symbol, playerName) => {
    setPlayerName((prev) => ({ ...prev, [symbol]: playerName }));
  };

  return (
    <main>
      <div id="game-container">
        <ul id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            handleChangePlayerName={handleChangePlayerName}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            handleChangePlayerName={handleChangePlayerName}
          />
        </ul>
        {(winner || isDraw) && <GameOver winner={winner} handleRematch={handleRematch} />}
        <GameBoard handlegetSelectedSquare={handlegetSelectedSquare} gameBoard={gameBoard} />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
