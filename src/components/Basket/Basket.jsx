import { useBasket } from "../../context/AppContext";
import styles from "./basket.module.css"; // Import CSS Module
import BasketItem from "../BasketItem/BasketItem";

export default function Basket() {
  const { basket, clearBasket } = useBasket();

  console.log(basket);

  return (
    <div className={styles.basketContainer}>
      {basket.length === 0 ? (
        <p className={styles.emptyMessage}>Your basket is empty.</p>
      ) : (
        <>
          <ul className={styles.basketUl}>
            {basket.map((item, index) => (
              <li key={`${item._id}-${item.selectedSize}-${index}`} className={styles.basketList}>
                <BasketItem item={item} />
              </li>
            ))}
          </ul>

          <div className={styles.basketSummary}>
            <button className={styles.clearBasketButton} onClick={clearBasket}>
              Tøm kurv
            </button>
            <p className={styles.totalAmount}>
              I alt{" "}
              <span>
                {basket.reduce(
                  (acc, item) => acc + item.selectedPrice * item.quantity,
                  0
                )}
                ,-
              </span>
            </p>
            <input
              type="email"
              placeholder="Din email"
              className={styles.emailInput}
            />
            <button className={styles.checkoutButton}>Afgiv ordre</button>
          </div>
        </>
      )}
    </div>
  );
}
