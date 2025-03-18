import { useRef, useState } from "react";

export default function Player() {
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  const playerNameRef = useRef();

  const handleSettingUserName = () => {
    setEnteredPlayerName(playerNameRef.current.value);
    playerNameRef.current.value = "";
    playerNameRef.current.focus();
  };

  return (
    <section id="player">
      {/* enteredPlayerName 값 true, false 상관없이 null, undefinded 일때만 "unknown entity" 반환 */}
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      <div>
        <input ref={playerNameRef} type="text" />
        <button type="button" onClick={handleSettingUserName}>
          Set Name
        </button>
      </div>
    </section>
  );
}
