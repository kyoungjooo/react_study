import { cartActions } from "../../store/cart-slice";
import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, quantity, total, price } = props.item;
  const handleRemoveItem = (item) => {
    dispatch(cartActions.removeItemToCart(item));
  };
  const handleAddItem = (item) => {
    dispatch(cartActions.addItemToCart(item));
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
          <button onClick={() => handleRemoveItem(props.item)}>-</button>
          <button onClick={() => handleAddItem(props.item)}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
