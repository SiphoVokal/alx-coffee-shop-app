import React, { createContext, useContext, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number | any; // e.g. "$4.20"
  rating: number;
  description: string;
  size: string | any;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  increaseQty: (id: string, size: string) => void;
  decreaseQty: (id: string, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find(
        (c) => c.id === item.id && c.size === item.size
      );
      if (existing) {
        return prev.map((c) =>
          c.id === item.id && c.size === item.size
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const increaseQty = (id: string, size: string) => {
    setCart((prev) =>
      prev.map((c) =>
        c.id === id && c.size === size
          ? { ...c, quantity: c.quantity + 1 }
          : c
      )
    );
  };

  const decreaseQty = (id: string, size: string) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.id === id && c.size === size
            ? { ...c, quantity: c.quantity - 1 }
            : c
        )
        .filter((c) => c.quantity > 0)
    );
  };

  const removeFromCart = (id: string, size: string) => {
    setCart((prev) => prev.filter((c) => !(c.id === id && c.size === size)));
  };

  // 🧮 calculate total
  const total = cart.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);


  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQty, decreaseQty, removeFromCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
