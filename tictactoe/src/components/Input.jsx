import { useState } from "react";

export function Input() {
  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState("");
  const buttonStatus = isEditing ? "수정" : "저장";
  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleEditing = () => {
    setEditing((prev) => !prev);
  };
  return (
    <>
      <input type="text" value={text} onChange={handleChangeText} readOnly={!isEditing} />
      <button onClick={handleEditing}>{buttonStatus}</button>
    </>
  );
}
