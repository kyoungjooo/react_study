import { createContext } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";
import { useReducer } from "react";

//createContext 에서는 "초기 모양(기본구조)"만 정하는 거

//쇼핑 카트의 아이템들을 저장
//자동완성을 위해 빈 함수 전달
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
});

/* 
왜 createContext에서는 실제 데이터를 넣지 않는가 ?

이 시점엔 shoppingCart가 없음 → 아직 컴포넌트 안에서 useState가 선언되기 전
Context는 리액트 컴포넌트 밖에서 만들어야 하고, 거기선 state나 함수 접근이 안 됨
*/

function shoppingCartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const updatedItems = [...state.items];
      const id = action.payload.id;

      // 아이디가 같은 카트 아이템 인덱스 찾기
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );

      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        // 이미 있으면 수량 증가
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        // 없으면 새 제품 추가
        const product = DUMMY_PRODUCTS.find(
          (product) => product.id === action.payload.id
        );
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        ...state,
        items: updatedItems,
      };
    }
    case "UPDATE_CART": {
      const updatedItems = [...state.items];
      const productId = action.payload.id;
      const amount = action.payload.amount;

      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        ...state,
        items: updatedItems,
      };
    }
    default:
      return state;
  }
}

export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    { items: [] }
  );

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: {
        id,
      },
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_CART",
      payload: {
        id: productId,
        amount,
      },
    });
  }
  //자식 컴포넌트들이 쓸 전역 상태(장바구니 + 함수)를 묶은 객체
  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
