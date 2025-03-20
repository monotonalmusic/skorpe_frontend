import { useState, useEffect } from "react";
import { backendURL } from "../services/settings";

const useDishes = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState({ normal: "", family: "" });
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(`${backendURL}/ingredients`);
        if (!response.ok) {
          throw new Error("Failed to fetch ingredients.");
        }
        const data = await response.json();
        console.log(data)
        setAvailableIngredients(data.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchIngredients();
  }, []);

  const createDish = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!image) {
      setError("Image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", JSON.stringify(price));
    formData.append("category", category);
    formData.append("file", image);
    formData.append("ingredients", ingredients);

    try {
      const response = await fetch(`${backendURL}/dish/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create dish.");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateDish = async (id, e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("price", JSON.stringify(price));
    formData.append("category", category);
    formData.append("ingredients", ingredients);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(`${backendURL}/dish/`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update dish.");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteDish = async (id) => {
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`${backendURL}/dish/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete dish.");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    createDish,
    updateDish,
    deleteDish,
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
  };
};

export default useDishes;
