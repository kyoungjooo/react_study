//리덕스 추가
const redux = require("redux");

//리듀서 함수
//항상 기존 상태와 발송된 액션을 받아서 새로운 상태 객체를 리턴해야한다.
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }
  return state;
};

//리덕스 저장소 생성
//저장소에게 어떤 리듀서가 그 저장소를 변경하는지 알려줘야함
const store = redux.createStore(counterReducer);

//저장소를 구독할 누군가 필요
const counterSubscriber = () => {
  const latestState = store.getState(); //createStore로 생성된 저장소에서 사용할 수 있는 메소드
  console.log(latestState);
};
//리덕스가 이 구독함수를 인식하도록 하고 상태가 변경될때마다 이 함수를 실행하라고 말해줘야함
store.subscribe(counterSubscriber);

//발송할 수 있는 액션 필요
store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
