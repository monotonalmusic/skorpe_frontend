import { createContext, useContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [basket, setBasket] = useLocalStorage("basket", []);

  const addToBasket = (product) => {
    setBasket((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item._id === product._id && item.selectedSize === product.selectedSize
      );
      
      if (existingItemIndex !== -1) {
        const updatedBasket = [...prev];
        updatedBasket[existingItemIndex] = {
          ...updatedBasket[existingItemIndex],
          quantity: updatedBasket[existingItemIndex].quantity + 1,
        };
        return updatedBasket;
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromBasket = (id, size) => {
    setBasket((prev) => prev.filter((item) => !(item._id === id && item.selectedSize === size)));
  };

  const incrementBasket = (id, size) => {
    setBasket((prev) => {
      return prev.map((item) =>
        item._id === id && item.selectedSize === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
  };

  const decrementBasket = (id, size) => {
    setBasket((prev) => {
      return prev
        .map((item) =>
          item._id === id && item.selectedSize === size
            ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const clearBasket = () => {
    setBasket([]);
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket, incrementBasket, decrementBasket, clearBasket }}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  return useContext(BasketContext);
}
