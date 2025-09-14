// app/index.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { coffeeData } from "@/data/coffeeData";

type CoffeeItemType = {
  id: string;
  name: string;
  image: any;
  price: number;
  rating: number;
  description: string;
};



export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Coffee");
  const [cart, setCart] = useState<CoffeeItemType[]>([]);
  const [location, setLocation] = useState("Johannesburg, SA");

  const addToCart = (item: CoffeeItemType) => {
    setCart([...cart, item]);
  };

    const handleLocationPress = () => {
    Alert.alert(
      "Select Location",
      "Choose your preferred location",
      [
        { text: "Johannesburg, SA", onPress: () => setLocation("Johannesburg, SA") },
        { text: "Cape Town, SA", onPress: () => setLocation("Cape Town, SA") },
        { text: "Durban, SA", onPress: () => setLocation("Durban, SA") },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const filteredData = coffeeData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All Coffee" || item.description === selectedCategory)
  );

  const CoffeeItem = ({ item }: { item: CoffeeItemType }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: "/details", params: { id: item.id } })}
    >
      <Image source={item.image } style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color="gold" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
            <AntDesign name="plus" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       {/* Location Picker */}
      <TouchableOpacity style={styles.locationPicker} onPress={handleLocationPress}>
        <Ionicons name="location-outline" size={18} color="#D17842" />
        <Text style={styles.locationText}>{location}</Text>
        <Ionicons name="chevron-down" size={16} color="white" />
      </TouchableOpacity>
      {/* Search + Filter */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search coffee"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.promoContainer}>
        <Image
         source={require("../assets/images/banner.png")} 
         style={styles.promoImage}
        />
        <View style={styles.promoTag}>
        <Text style={styles.promoTagText}>Promo</Text>
        </View>
      </View>
      {/* Category Tabs */}
      <View style={styles.categoryTabs}>
        {["All Coffee", "Macchiato", "Espresso", "Latte"].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryTab, selectedCategory === cat && styles.activeTab]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[styles.categoryText, selectedCategory === cat && styles.activeText]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Coffee List */}
      <FlatList
  data={filteredData}
  keyExtractor={(item) => item.id.toString()}
  numColumns={2}
  contentContainerStyle={styles.coffeeList}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.coffeeCard}
      onPress={() => router.push({ pathname: "/details", params: { id: item.id } })}
    >
      <Image source={item.image} style={styles.coffeeImage} />
      <Text style={styles.coffeeName}>{item.name}</Text>
      <Text style={styles.coffeeDesc}>{item.description}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.coffeePrice}>{item.price}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addToCart(item)}
        >
          <Ionicons name="add" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )}
/>


      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/")}>
          <Ionicons name="home-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/favorites")}
        >
          <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/cart")}>
          <Ionicons name="bag-outline" size={24} color="black" />
          {cart.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/notifications")}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, color: "black", paddingInline: 26, paddingTop: 86 },
  locationPicker: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  locationText: {
    color: "black",
    marginHorizontal: 6,
    fontWeight: "600",
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingBlock: 11
  },
  promoContainer: {
  marginVertical: 16,
  borderRadius: 12,
  overflow: "hidden",
  position: "relative",
},

promoImage: {
  width: "100%",
  height: 160,
  borderRadius: 12,
},

promoTag: {
  position: "absolute",
  top: 10,
  left: 10,
  backgroundColor: "#D17842",
  paddingVertical: 4,
  paddingHorizontal: 8,
  borderRadius: 6,
},

promoTagText: {
  color: "white",
  fontWeight: "bold",
  fontSize: 12,
},

  filterButton: {
    marginLeft: 10,
    backgroundColor: "#D17842",
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: { flex: 1, color: "white", marginLeft: 8 },
  categoryTabs: { flexDirection: "row", marginBottom: 16 },
  categoryTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#1E1E1E",
    borderRadius: 20,
    marginRight: 8,
  },
  activeTab: { backgroundColor: "#D17842" },
  categoryText: { color: "white" },
  activeText: { color: "white", fontWeight: "bold" },
  list: { paddingBottom: 80 },
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  cardImage: { width: "100%", height: 150 },
  cardContent: { padding: 10 },
  cardTitle: { color: "white", fontSize: 16, fontWeight: "bold" },
  cardPrice: { color: "#D17842", marginVertical: 4 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  rating: { flexDirection: "row", alignItems: "center" },
  ratingText: { color: "white", marginLeft: 4 },
 

  coffeeList: {
  paddingHorizontal: 1,
  paddingBottom: 80, // leave space for nav bar
},

coffeeCard: {
  flex: 1,
  margin: 8,
  padding: 10,
},

coffeeImage: {
  width: "100%",
  height: 120,
  borderRadius: 10,
  marginBottom: 8,
},

coffeeName: {
  color: "black",
  fontWeight: "bold",
  fontSize: 16,
},

coffeeDesc: {
  color: "#aaa",
  fontSize: 12,
  marginBottom: 4,
},

coffeePrice: {
  color: "#black",
  fontWeight: "bold",
  fontSize: 18,
  marginBottom: 6,
},
priceRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginTop: 6,
},

addButton: {
  backgroundColor: "#D17842",
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 8,
},

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingInline: 12,
    paddingBlock:28,
    marginBottom:12,
    backgroundColor: "#fff",
    color: "black",
    borderRadius: 30,
    position: "absolute",
    bottom: -12,
    left: 1,
    right: 1,
  },
  navItem: { alignItems: "center" },
  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: { color: "white", fontSize: 12, fontWeight: "bold" },
});
