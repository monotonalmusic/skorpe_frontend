import { useBasket } from "../../context/AppContext";
import styles from "./basketitem.module.css";

const BasketItem = ({ item }) => {
  const { removeFromBasket, incrementBasket, decrementBasket } = useBasket();

  return (
    <div className={styles.basketItem}>
      <div className={styles.itemInfo}>
        <img src={item.image} alt={item.name} className={styles.itemImage} />
        <div>
          <h3 className={styles.itemName}>{item.title} ({item.selectedSize})</h3>
          <p className={styles.itemPrice}>{item.selectedPrice},-</p>
        </div>
        <button
          className={styles.removeButton}
          onClick={() => removeFromBasket(item._id, item.selectedSize)}
        >
          ✖
        </button>
      </div>

      <div className={styles.quantityControls}>
        <button
          className={styles.quantityButton}
          onClick={() => decrementBasket(item._id, item.selectedSize)}
        >
          −
        </button>
        <span className={styles.quantity}>{item.quantity}</span>
        <button
          className={styles.quantityButton}
          onClick={() => incrementBasket(item._id, item.selectedSize)}
        >
          +
        </button>
      </div>
      <div className={styles.totalPriceDiv}>
        <p className={styles.totalPrice}>
          <span className={styles.totalSpan}>Total: </span>
          {item.selectedPrice * item.quantity},-
        </p>
      </div>
    </div>
  );
};

export default BasketItem;