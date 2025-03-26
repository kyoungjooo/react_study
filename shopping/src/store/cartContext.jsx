import { createContext } from "react";

//createContext 에서는 "초기 모양(기본구조)"만 정하는 거

//쇼핑 카트의 아이템들을 저장
//자동완성을 위해 빈 함수 전달
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
});

/* 
왜 createContext에서는 실제 데이터를 넣지 않는가 ?

이 시점엔 shoppingCart가 없음 → 아직 컴포넌트 안에서 useState가 선언되기 전
Context는 리액트 컴포넌트 밖에서 만들어야 하고, 거기선 state나 함수 접근이 안 됨
*/
