import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useCart } from "../contexts/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CartScreen() {
  const { cart, increaseQty, decreaseQty, total } = useCart();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>🛒 Cart</Text>
      </View>    
      

      {cart.length === 0 ? (
        <Text style={styles.subText}>Items you’ve added will appear here.</Text>
      ) : (
        <>
          {cart.map((item) => (
            <View key={`${item.id}-${item.size}`} style={styles.itemRow}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name} ({item.size})</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>

              <View style={styles.qtyContainer}>
                <TouchableOpacity onPress={() => decreaseQty(item.id, item.size)}>
                  <Text style={styles.qtyButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qty}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => increaseQty(item.id, item.size)}>
                  <Text style={styles.qtyButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* 🧮 Show total */}
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 76, paddingInline: 32, backgroundColor: "#fff" },
  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16, },
  iconButton: { padding: 8 },
  title: { fontSize: 24, fontWeight: "bold", color: "", marginBottom: 20 },
  subText: { fontSize: 16, color: "#aaa" },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  image: { width: 50, height: 50, borderRadius: 8, marginRight: 12 },
  itemName: { color: "white", fontSize: 16, fontWeight: "bold" },
  itemPrice: { color: "#aaa", fontSize: 14 },
  qtyContainer: { flexDirection: "row", alignItems: "center" },
  qtyButton: {
    backgroundColor: "#D17842",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  qty: { color: "white", fontSize: 16, fontWeight: "bold" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  totalText: { color: "white", fontSize: 18, fontWeight: "bold" },
  totalAmount: { color: "#D17842", fontSize: 18, fontWeight: "bold" },
});
