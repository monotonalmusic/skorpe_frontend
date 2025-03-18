import Basket from "../../components/Basket/Basket";
import styles from "./checkoutpage.module.css";

const CheckoutPage = () => {
  return (
    <div className={styles.container}>
      <Basket></Basket>
    </div>
  );
};

export default CheckoutPage;
