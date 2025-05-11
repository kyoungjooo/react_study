import { cartActions } from "../../store/cart-slice";
import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { id, title, quantity, total, price } = item;
  const handleRemoveItem = () => {
    dispatch(cartActions.removeItemToCart(id));
  };
  const handleAddItem = () => {
    dispatch(cartActions.addItemToCart({ id, title, price }));
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleRemoveItem}>-</button>
          <button onClick={handleAddItem}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
