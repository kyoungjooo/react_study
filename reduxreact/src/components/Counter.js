import classes from "./Counter.module.css";
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
  //redux store에 대한 action 을 보내는 함수
  const dispatch = useDispatch();
  //state는 Redux store 전체 상태 객체, 그 중에서 counter라는 값만 뽑아오는 선택 함수
  const counter = useSelector((state) => state.counter);
  const increaseHandler = () => {
    dispatch({ type: "increment" });
  };
  const decrementHandler = () => {
    dispatch({ type: "decrement" });
  };
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={increaseHandler}>increment</button>
        <button onClick={decrementHandler}>decrement</button>
      </div>
    </main>
  );
};

export default Counter;
