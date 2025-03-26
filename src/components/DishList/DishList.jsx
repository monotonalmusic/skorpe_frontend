import { useState, useEffect } from "react";
import styles from "./dishlist.module.css";
import useDishes from "../../hooks/useDishes";
import { backendURL } from "../../services/settings";

const DishList = () => {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentDish, setCurrentDish] = useState(null);
  const {
    title,
    setTitle,
    price,
    setPrice,
    image,
    setImage,
    ingredients,
    setIngredients,
    availableIngredients,
    category,
    setCategory,
    updateDish,
    deleteDish,
  } = useDishes();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`${backendURL}/dishes/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch dishes.");
        }

        const data = await response.json();
        console.log("Dishes:", data.data);
        setDishes(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDishes();
  }, []);

  const handleEdit = (dish) => {
    setEditMode(true);
    setCurrentDish(dish);
    setTitle(dish.title);
    setPrice(dish.price);
    setCategory(dish.category);
    setIngredients(dish.ingredients.map((ingredient) => ingredient._id));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (currentDish) {
      await updateDish(currentDish._id, e);
      setEditMode(false);
      setCurrentDish(null);
      const response = await fetch(`${backendURL}/dishes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setDishes(data.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDish(id);
      const response = await fetch(`${backendURL}/dishes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setDishes(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Dish List</h1>
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.list}>
        {dishes.length > 0 ? (
          dishes.map((dish) => (
            <li key={dish._id} className={styles.listItem}>
              <h2 className={styles.title}>{dish.title}</h2>
              <p className={styles.price}><strong>Price (Normal):</strong> {dish.price.normal}kr</p>
              <p className={styles.price}><strong>Price (Family):</strong> {dish.price.family}kr</p>
              <p className={styles.category}><strong>Category:</strong> {dish.category}</p>
              <p className={styles.ingredients}><strong>Ingredients:</strong> {dish.ingredients.map((ingredient) => ingredient).join(", ")}</p>
              <img
                src={`${dish.image}`}
                alt={dish.title}
                className={styles.image}
              />
              <div className={styles.buttonDiv}>
                <button
                  className={styles.editButton}
                  onClick={() => handleEdit(dish)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(dish._id)}
                >
                  Delete
                </button>
              </div>
              {editMode && currentDish && currentDish._id === dish._id && (
                <form className={styles.form} onSubmit={handleUpdate}>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className={styles.input}
                  />
                  <input
                    type="number"
                    value={price.normal}
                    onChange={(e) => setPrice({ ...price, normal: e.target.value })}
                    placeholder="Price (Normal)"
                    className={styles.input}
                  />
                  <input
                    type="number"
                    value={price.family}
                    onChange={(e) => setPrice({ ...price, family: e.target.value })}
                    placeholder="Price (Family)"
                    className={styles.input}
                  />
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                    className={styles.input}
                  />
                  <select
                    multiple
                    value={ingredients}
                    onChange={(e) =>
                      setIngredients([...e.target.selectedOptions].map((opt) => opt.value))
                    }
                    className={styles.input}
                  >
                    {availableIngredients.map((ingredient) => (
                      <option key={ingredient._id} value={ingredient.name}>
                        {ingredient.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className={styles.input}
                  />
                  <button type="submit" className={styles.button}>Update Dish</button>
                  <button
                    type="button"
                    className={styles.buttonSecondary}
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </form>
              )}
            </li>
          ))
        ) : (
          <p className={styles.empty}>No dishes found.</p>
        )}
      </ul>
    </div>
  );
};

export default DishList;