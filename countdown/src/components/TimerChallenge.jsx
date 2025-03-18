import { useEffect, useRef, useState } from "react";

export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const timerRef = useRef(); //컴포넌트 내부에 있기 때문에 특정 컴포넌트 인스컨스에만 할당

  const handleStartTimer = () => {
    setTimerStarted(true);

    timerRef.current = setTimeout(() => {
      setTimerExpired(true); // n초 후 타이머 종료
    }, targetTime * 1000);
  };

  const handleStopTimer = () => {
    clearTimeout(timerRef.current);
    setTimerStarted(false);
  };

  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>game is over!</p>}
      <div className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </div>
      <div>
        <button onClick={timerStarted ? handleStopTimer : handleStartTimer}>
          {timerStarted ? "Stop" : "Start"} Challenge
        </button>
      </div>
      <div className={timerStarted ? "active" : undefined}>
        <p>{timerStarted ? "Time is running..." : "Timer inactive"}</p>
      </div>
    </section>
  );
}
