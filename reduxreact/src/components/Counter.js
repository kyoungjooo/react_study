import classes from "./Counter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../store";

const Counter = () => {
  //redux store에 대한 action 을 보내는 함수
  const dispatch = useDispatch();
  //state는 Redux store 전체 상태 객체, 그 중에서 counter라는 값만 뽑아오는 선택 함수
  const counter = useSelector((state) => state.counter);
  const isShow = useSelector((state) => state.show);
  const increaseHandler = () => {
    dispatch(counterActions.increment());
  };

  const increaseAmountHandler = () => {
    dispatch(counterActions.increase(5));
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };
  const toggleShowHide = () => {
    dispatch(counterActions.toggle());
  };
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {isShow && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={increaseHandler}>increment</button>
        <button onClick={increaseAmountHandler}>increment+5</button>
        <button onClick={decrementHandler}>decrement</button>
        <button onClick={toggleShowHide}>showHide</button>
      </div>
    </main>
  );
};

export default Counter;
