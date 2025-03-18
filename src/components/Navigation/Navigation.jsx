import { Link, NavLink } from "react-router-dom";
import styles from "./navigation.module.css";
import { useState, useEffect } from "react";
import { icons } from "../../services/icons";
import { useBasket } from "../../context/AppContext";

const Navigation = () => {
  const { basket } = useBasket();
  const [isOpen, setIsOpen] = useState(false);

  //.map extracts ID's
  //new Set removes duplicates
  //.size counts

  let uniqueItemCount = new Set(basket.map((item) => item._id)).size;

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  const closeNavigation = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className={styles.navigation}>
      <div className={styles.navLeft}>
        <Link to={"/"}>
          <img src="/logo.png" alt="" className={styles.logo}/>
        </Link>
      </div>
      <div className={styles.navRight}>
        <div onClick={toggleNavigation}>{icons.FaBars}</div>
        <div className={styles.basketDiv}>
          <p className={styles.basketCount}>{uniqueItemCount}</p>
          <Link to={"/checkout"}>
          <img src="/basket_icon.png" className={styles.basketIcon}></img></Link>
        </div>
      </div>

      <div className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={closeNavigation}
        >
          Home
        </NavLink>
        <NavLink
          to={"/kontakt"}
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={closeNavigation}
        >
          Kontakt
        </NavLink>
        <NavLink
          to={"/om"}
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={closeNavigation}
        >
          Om
        </NavLink>
        <NavLink
          to={"/services"}
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={closeNavigation}
        >
          Services
        </NavLink>
        <NavLink
          to={"/shop"}
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={closeNavigation}
        >
          Shop
        </NavLink>
      </div>
    </div>
  );
};
export default Navigation;
