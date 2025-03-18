import { useNavigate } from "react-router-dom";
import styles from "./dishescard.module.css";

const DishesCard = ({ dish }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.dishCard}
      style={{
        backgroundImage: `url(${dish.image})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onClick={() => navigate(`/dish/${dish._id}`)}
    >
      <button className={styles.button}>{dish.title}</button>
    </div>
  );
};

export default DishesCard;
