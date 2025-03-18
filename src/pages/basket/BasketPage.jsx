import Basket from "../../components/Basket/Basket";
import styles from "./basketpage.module.css";

const CheckoutPage = () => {
  return (
    <div className={styles.checkoutContainer}>
      <Basket></Basket>
    </div>
  );
};

export default CheckoutPage;
