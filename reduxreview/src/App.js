import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { cartUIActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.showHide);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.showNotification);
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        cartUIActions.showNotification({
          status: "pending",
          title: "sending...",
          message: "sending cart data...",
        })
      );
      const response = await fetch("", {
        method: "PUT",
        body: JSON.stringify(cart),
      });
      if (!response.ok) {
        throw new Error("failed");
      }
      dispatch(
        cartUIActions.showNotification({
          status: "success",
          title: "success!",
          message: "sent cart data successfully",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }
    sendCartData().catch((error) => {
      dispatch(
        cartUIActions.showNotification({
          status: "error",
          title: "error!",
          message: "sending cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
