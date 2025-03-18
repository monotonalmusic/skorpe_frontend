import { icons } from "../../services/icons";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src="/logo.png" alt=""  className={styles.logo}/>
      <div className={styles.footerBottom}>
        <div className={styles.footerContactContainer}>
          <div className={styles.iconContainer}>{icons.FaPhone}</div>
          <div>
            <p>+88130</p>
          </div>
        </div>
        <div className={styles.footerAddressContainer}>
          <div className={styles.iconContainer}>{icons.FaLocationDot}</div>
          <div>
            <p>1234 Street Name</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
