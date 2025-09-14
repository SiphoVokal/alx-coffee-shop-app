// contexts/FavoritesContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type Coffee = {
  id: string;
  name: string;
  image: string;
  price: {
    Small: number;
    Medium: number;
    Large: number;
  };
  rating: number;
  description: string;
};

type FavoritesContextType = {
  favorites: Coffee[];
  addToFavorites: (coffee: Coffee) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Coffee[]>([]);

  const addToFavorites = (coffee: Coffee) => {
    setFavorites((prev) => [...prev, coffee]);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};
