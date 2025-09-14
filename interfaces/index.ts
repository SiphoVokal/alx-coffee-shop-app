export interface CoffeeItemType {
  id: string;
  name: string;
  image: any; // because require() returns `any` in React Native
  price: string; // keep as string for FlatList display
  rating: number;
  description: string;
  size?: "Small" | "Medium" | "Large"; // optional for cart items
};


export interface Coffee {
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