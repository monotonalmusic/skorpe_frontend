import { useState } from "react";
import { useParams } from "react-router-dom";
import { useBasket } from "../../context/AppContext";
import useFetch from "../../hooks/useFetch";
import styles from "./dishdetail.module.css";

const DishDetail = () => {
    const { id } = useParams();
    const { data: dish, loading, error } = useFetch(`http://localhost:3042/dish/${id}`);
    const { addToBasket } = useBasket();
    const [selectedSize, setSelectedSize] = useState("normal");

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleAddToBasket = () => {
        const dishWithSize = {
            ...dish,
            selectedSize,
            selectedPrice: dish.price[selectedSize]
        };
        addToBasket(dishWithSize);
    };

    return (
        <div className={styles.dishDetailContainer}>
            <img src={dish.image} alt={dish.title} className={styles.dishImage} />
            <div className={styles.dishInfo}>
                <h2 className={styles.dishTitle}>{dish.title}</h2>
                <ul className={styles.ingredientsList}>
                    {dish.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <div className={styles.sizeSelector}>
                    <label htmlFor="size">Vælg størrelse</label>
                    <select 
                        id="size" 
                        className={styles.selectBox} 
                        value={selectedSize} 
                        onChange={(e) => setSelectedSize(e.target.value)}
                    >
                        <option value="normal">Almindelig: {dish.price.normal}kr</option>
                        <option value="family">Familie: {dish.price.family}kr</option>
                    </select>
                </div>
                <button className={styles.addToBasket} onClick={handleAddToBasket}>
                    Tilføj {dish.title} til kurven
                </button>
            </div>
        </div>
    );
};

export default DishDetail;