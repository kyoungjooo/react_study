import { cartUIActions } from "../../store/ui-slice";
import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartTotalItems = useSelector((state) => state.cart.totalQuantity);
  const handleToggleCart = () => {
    dispatch(cartUIActions.toggleCart());
  };

  return (
    <button className={classes.button} onClick={handleToggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartTotalItems}</span>
    </button>
  );
};

export default CartButton;
