import { Stack } from "expo-router";
import { FavoritesProvider } from "../contexts/FavoritesContext";
import { CartProvider } from "@/contexts/CartContext";

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </CartProvider>
    </FavoritesProvider>
  );
}
