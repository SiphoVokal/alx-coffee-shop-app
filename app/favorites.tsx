import { View, Text, StyleSheet } from "react-native";

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>❤️ Favorites</Text>
      <Text style={styles.subText}>Your favorite coffees will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
  text: { fontSize: 24, fontWeight: "bold", color: "white" },
  subText: { fontSize: 16, color: "#aaa", marginTop: 10 },
});
