import { useState } from "react";
import { useParams } from "react-router-dom";
import { useBasket } from "../../context/AppContext";
import useFetch from "../../hooks/useFetch";
import Dropdown from "../../components/Dropdown/Dropdown";
import styles from "./dishdetail.module.css";

const DishDetail = () => {
  const { id } = useParams();
  const {
    data: dish,
    loading,
    error,
  } = useFetch(`http://localhost:3042/dish/${id}`);
  const { addToBasket } = useBasket();
  const [selectedSize, setSelectedSize] = useState("normal");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleAddToBasket = () => {
    const dishWithSize = {
      ...dish,
      selectedSize,
      selectedPrice: dish.price[selectedSize],
    };
    addToBasket(dishWithSize);
  };

  return (
    <div className={styles.dishDetailContainer}>
      <img src={dish.image} alt={dish.title} className={styles.dishImage} />
      <div className={styles.dishInfo}>
        <div className={styles.dishText}>
          <h2 className={styles.dishTitle}>{dish.title}</h2>
          <ul className={styles.ingredientsList}>
            {dish.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className={styles.sizeSelector}>
          <h1>Vælg Størrelse</h1>
          <Dropdown
            selected={selectedSize}
            onSelect={setSelectedSize}
            options={[
              { label: `Almindelig: ${dish.price.normal}kr`, value: "normal" },
              { label: `Familie: ${dish.price.family}kr`, value: "family" },
            ]}
          />
        </div>
        <button className={styles.addToBasketButton} onClick={handleAddToBasket}>
          Tilføj {dish.title} til kurven
        </button>
      </div>
    </div>
  );
};

export default DishDetail;
