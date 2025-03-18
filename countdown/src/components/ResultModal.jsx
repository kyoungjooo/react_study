import { useImperativeHandle, useRef } from "react";

export default function ResultModal({
  ref,
  targetTime,
  timeRemaining,
  handleReset,
}) {
  const dialog = useRef();
  const yourLost = timeRemaining <= 0; //버튼을 누르지 않고 0 일 때,
  const formattedRemainingTime = (timeRemaining / 1000).toFixed(2);
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

  const handleOpen = () => {
    return {
      open() {
        dialog.current.showModal();
      },
      onClose() {
        dialog.current.onReset();
      },
    };
  };
  useImperativeHandle(ref, handleOpen);

  return (
    <dialog ref={dialog} className="result-modal" onClose={handleReset}>
      {yourLost && <h2>You lost</h2>}
      {!yourLost && <h2>Your Score: {score}</h2>}
      <p>
        The target timer is {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        You stopped the timer with
        <strong> {formattedRemainingTime} seconds left</strong>
      </p>
      <form method="dialog" onSubmit={handleReset}>
        <button type="submit">Close</button>
      </form>
    </dialog>
  );
}
