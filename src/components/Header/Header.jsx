import Navigation from "../Navigation/Navigation";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header>
      <div className={styles.headerContainer}>
        <Navigation />
      </div>
    </header>
  );
};
export default Header;
