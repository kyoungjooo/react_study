import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timerRef = useRef(); //컴포넌트 내부에 있기 때문에 특정 컴포넌트 인스턴스에만 할당
  const modalRef = useRef();

  //컴포넌트가 처음 렌더링 될 때 초기값을 설정
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  // timeRemaining 0 이되도 게임 종료 초기화
  if (timeRemaining <= 0) {
    clearInterval(timerRef.current);
    setTimeRemaining(targetTime * 1000);
  }

  const handleStartTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => prev - 10);
    }, 10);
  };

  //stop 버튼을 눌렀을 때
  const handleStopTimer = () => {
    clearInterval(timerRef.current);
  };

  return (
    <>
      <ResultModal ref={modalRef} targetTime={targetTime} result="lost" />
      <section className="challenge">
        <h2>{title}</h2>
        {timerIsActive && <p>game is over!</p>}
        <div className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </div>
        <div>
          <button onClick={timerIsActive ? handleStopTimer : handleStartTimer}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </div>
        <div className={timerIsActive ? "active" : undefined}>
          <p>{timerIsActive ? "Time is running..." : "Timer inactive"}</p>
        </div>
      </section>
    </>
  );
}
