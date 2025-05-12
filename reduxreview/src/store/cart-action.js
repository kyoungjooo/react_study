import { cartActions } from "./cart-slice";
import { cartUIActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("");
      if (!response.ok) {
        throw new Error("failed fetch");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        cartUIActions.showNotification({
          status: "error",
          title: "error!",
          message: "sending cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  //즉시 비동기 작업을 수행하는 것이 아니라, '비동기 작업을 담은 함수'를 반환
  return async (dispatch) => {
    dispatch(
      cartUIActions.showNotification({
        status: "pending",
        title: "sending...",
        message: "sending cart data...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch("", {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      });
      if (!response.ok) {
        throw new Error("failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        cartUIActions.showNotification({
          status: "success",
          title: "success!",
          message: "sent cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        cartUIActions.showNotification({
          status: "error",
          title: "error!",
          message: "sending cart data failed!",
        })
      );
    }
  };
};
