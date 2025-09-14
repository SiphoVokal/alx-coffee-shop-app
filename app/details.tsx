import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCart } from "../contexts/CartContext";   
import { useState } from "react";
import { useRouter } from "expo-router";
import { coffeeDataSelect } from "@/data/coffeeData";


export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const coffee = coffeeDataSelect.find((c) => c.id === id);
  const router = useRouter();
  const { favorites, addToFavorites } = useFavorites();
  const { addToCart } = useCart();   
  const [isFavorited, setIsFavorited] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedSize, setSelectedSize] = useState<"Small" | "Medium" | "Large" | null>(null);


  const handleFavorite = () => {
    if (!isFavorited && coffee) {
      addToFavorites(coffee);
      setIsFavorited(true);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

 const handleAddToCart = () => {
  if (!coffee) return;
  if (!selectedSize) {
    alert("Please select a size before adding to cart.");
    return;
  }
  addToCart({
    ...coffee,
    size: selectedSize,
    price: coffee.price[selectedSize], // 👈 correct size price
  });
  router.push("/cart");
};


  if (!coffee) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Coffee not found ☕</Text>
      </View>
    );
  }

  const sizes = ["Small", "Medium", "Large"] as const;

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.detailsTitle}>Details</Text>
        <TouchableOpacity onPress={handleFavorite} style={styles.iconButton}>
          <Ionicons 
            name="heart-outline" 
            size={24} 
            color={isFavorited ? "green" : "black"} 
          />
        </TouchableOpacity>
      </View>  

      {/* Coffee Image + Info */}
      <Image source={{ uri: coffee.image }} style={styles.image} />
      <Text style={styles.title}>{coffee.name}</Text>
      <Text style={styles.rating}>⭐ {coffee.rating}</Text>
      <Text style={styles.description}>{coffee.description}</Text>

      {/* Size Selection */}
      <View style={styles.sizesContainer}>
        {sizes.map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.selectedSizeButton,
            ]}
            onPress={() => setSelectedSize(size)}
          >
            <Text
              style={[
                styles.sizeButtonText,
                selectedSize === size && styles.selectedSizeButtonText,
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Price + Add to Cart */}
      <View style={styles.pay}>
        <Text style={styles.price}>
          ${selectedSize ? coffee.price[selectedSize] : coffee.price.Medium}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      {/* Alert */}
      {showAlert && (
        <View style={styles.alert}>
          <Text style={styles.alertText}>Added to favorites!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 56, paddingInline: 32 },
  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  iconButton: { padding: 8 },
  detailsTitle: { fontSize: 20, fontWeight: "bold", color: "black" },
  image: { width: "100%", height: 250, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "bold", color: "black", marginBottom: 8 },
  price: { fontSize: 20, color: "#D17842", marginBottom: 8 },
  rating: { fontSize: 16, color: "black", marginBottom: 12 },
  description: { fontSize: 16, color: "#ccc", marginBottom: 20 },
  button: { backgroundColor: "#D17842", padding: 14, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  text: { color: "black", fontSize: 18, fontWeight: "bold" },
  pay: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  alert: { position: "absolute", bottom: 32, left: 32, right: 32, backgroundColor: "green", padding: 12, borderRadius: 8, alignItems: "center" },
  alertText: { color: "white", fontWeight: "bold" },
  sizesContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  sizeButton: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingVertical: 8, paddingHorizontal: 16, marginRight: 12 },
  selectedSizeButton: { backgroundColor: "#D17842", borderColor: "#D17842" },
  sizeButtonText: { color: "black", fontWeight: "bold" },
  selectedSizeButtonText: { color: "white" },
});
