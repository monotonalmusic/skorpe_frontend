import { useState } from "react";
import DishesCard from "../DishesCard/DishesCard";
import useFetch from "../../hooks/useFetch";
import styles from "./dishes.module.css";

const Dishes = ({ text }) => {
  const {
    data: dishes,
    loading,
    error,
  } = useFetch("http://localhost:3042/dishes");
  const [category, setCategory] = useState("all");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const filteredDishes =
    category === "all"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  return (
    <div className={styles.dishesContainer}>
      <h2>{text}</h2>
      <div className={styles.buttonContainer}>
        <div className={styles.allButtonDiv}>
          <button
            className={styles.sortButton}
            onClick={() => handleCategoryChange("all")}
          >
            All
          </button>
        </div>
        <div className={styles.pizzaerButtonDiv}>
          <button
            className={styles.sortButton}
            onClick={() => handleCategoryChange("Pizzaer")}
          >
            Pizzaer
          </button>
        </div>
        <div className={styles.durumButtonDiv}>
          <button
            className={styles.sortButton}
            onClick={() => handleCategoryChange("Durum ruller")}
          >
            Durum Ruller
          </button>
        </div>
        <div className={styles.indbagteButtonDiv}>
          <button
            className={styles.sortButton}
            onClick={() => handleCategoryChange("Indbagte pizzaer")}
          >
            Indbagte Pizzaer
          </button>
        </div>
      </div>
      <div className={styles.dishesGrid}>
        {filteredDishes.map((dish) => (
          <DishesCard key={dish._id} dish={dish} />
        ))}
      </div>
    </div>
  );
};

export default Dishes;
