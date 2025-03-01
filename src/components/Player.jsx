import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  let editablePlayer = <span className="player-name">{playerName}</span>;
  let btnCaption = isEditing ? "Save" : "Edit";

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };
  const handleChangeValue = (e) => {
    setPlayerName(e.target.value);
  };

  if (isEditing) {
    editablePlayer = <input type="input" required value={playerName} onChange={handleChangeValue} />;
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayer}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}
