import { useImperativeHandle, useRef } from "react";

export default function ResultModal({ ref, result, targetTime }) {
  const dialog = useRef();

  const handleOpen = () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  };
  useImperativeHandle(ref, handleOpen);

  return (
    <dialog ref={dialog} className="result-modal">
      <h2>You {result}</h2>
      <p>
        The target timer is {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        You stopped the timer with <strong>X seconds left</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
}
