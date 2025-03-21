import { useState } from "react";
import DishesCard from "../DishesCard/DishesCard";
import useFetch from "../../hooks/useFetch";
import styles from "./dishes.module.css";

const Dishes = () => {
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
      <div className={styles.textDiv}>
        <h1>Velkommen til den glade skorpe!</h1>
        <p>
          Hos os handler det om den perfekte pizza med den sprødeste skorpe. Vi
          bruger kun de bedste råvarer til både klassiske favoritter og
          spændende specialiteter som "Parma Drama" og "Rabbit Royale". Uanset
          om du er til en lille, personlig pizza eller en stor familiedeling, så
          finder du det hos os. Kom forbi og nyd en pizza lavet med kærlighed,
          eller bestil den, hent den og nyd den derhjemme!
        </p>
      </div>
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
