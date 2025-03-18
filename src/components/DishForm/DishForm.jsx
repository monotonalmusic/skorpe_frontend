import { useNavigate } from "react-router-dom";
import useDishes from "../../hooks/useDishes";
import styles from "./dishform.module.css";

const DishForm = () => {
  const navigate = useNavigate();
  const {
    createDish,
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
    error,
    success,
    setSuccess,
  } = useDishes();

  const handleSubmission = async (e) => {
    e.preventDefault();
    console.log("Selected Image:", image);
    if (!image) {
      console.error("Image is null.");
      return;
    }
    await createDish(e);
    setSuccess(true);
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={() => navigate("/backoffice")}>
        &times;
      </button>
      <h1 className={styles.heading}>Create New Dish</h1>
      <form onSubmit={handleSubmission} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            type="text"
            id="title"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="priceNormal" className={styles.label}>
            Price (Normal)
          </label>
          <input
            type="number"
            id="priceNormal"
            className={styles.input}
            value={price.normal}
            onChange={(e) => setPrice({ ...price, normal: e.target.value })}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="priceFamily" className={styles.label}>
            Price (Family)
          </label>
          <input
            type="number"
            id="priceFamily"
            className={styles.input}
            value={price.family}
            onChange={(e) => setPrice({ ...price, family: e.target.value })}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="category" className={styles.label}>
            Category
          </label>
          <input
            type="text"
            id="category"
            className={styles.input}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="ingredients" className={styles.label}>
            Ingredients
          </label>
          <select
            multiple
            id="ingredients"
            className={styles.input}
            value={ingredients}
            onChange={(e) =>
              setIngredients([...e.target.selectedOptions].map((opt) => opt.value))
            }
            required
          >
            {availableIngredients.map((ingredient) => (
              <option key={ingredient._id} value={ingredient.name}>
                {ingredient.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="image" className={styles.label}>
            Image
          </label>
          <input
            type="file"
            id="image"
            className={styles.input}
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Create Dish
        </button>
      </form>

      {success && <p className={styles.success}>Dish created successfully!</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default DishForm;
