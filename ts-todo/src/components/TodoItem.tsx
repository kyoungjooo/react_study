import React from "react";

const TodoItem: React.FC<{
  text: string;
  removeTodo: () => void;
}> = (props) => {
  return (
    <li>
      {props.text} <button onClick={props.removeTodo}>X</button>
    </li>
  );
};
export default TodoItem;
