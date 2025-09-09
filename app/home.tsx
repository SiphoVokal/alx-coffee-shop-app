import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function Home({ navigation }: any) {
  const categories = ["All Coffee", "Machlato", "Latte", "Americano"];

  const coffees = [
    {
      id: "1",
      name: "Caffe Mocha",
      type: "Deep Foam",
      price: 4.53,
      rating: 4.8,
      image: require("@/assets/images/mocha.png"),
      description:
        "A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85 ml of fresh milk foam.",
    },
    {
      id: "2",
      name: "Flat White",
      type: "Espresso",
      price: 3.53,
      rating: 4.7,
      image: require("@/assets/images/flatWhite.png"),
      description:
        "The Flat White combines velvety microfoam with a strong espresso base, creating a smooth yet bold taste.",
    },
  ];

  const renderCoffee = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Detail", { item })}
    >
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardSubtitle}>{item.type}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Location */}
      <Text style={styles.locationLabel}>Location</Text>
      <Text style={styles.location}>Bilzen, Tanjungbalai</Text>

      {/* Search Bar */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search coffee"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Promo Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Promo</Text>
        <Image
          source={require("@/assets/images/banner.png")}
          style={styles.bannerImage}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoryRow}>
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              index === 0 && styles.categoryButtonActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                index === 0 && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Coffee List */}
      <FlatList
        data={coffees}
        keyExtractor={(item) => item.id}
        renderItem={renderCoffee}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  locationLabel: {
    fontSize: 14,
    color: "#888",
    marginTop: 10,
  },
  location: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 14,
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: "#b07c4f",
    padding: 10,
    borderRadius: 10,
  },
  filterText: {
    color: "#fff",
    fontWeight: "bold",
  },
  banner: {
    backgroundColor: "#e6c9a8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bannerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  bannerImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  categoryRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: "#b07c4f",
    borderColor: "#b07c4f",
  },
  categoryText: {
    fontSize: 14,
    color: "#444",
  },
  categoryTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#b07c4f",
  },
  addButton: {
    backgroundColor: "#b07c4f",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
