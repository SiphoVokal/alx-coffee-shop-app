import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Onboarding({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Top 60% image */}
      <ImageBackground
        source={require("@/assets/images/hero.png")}
        style={styles.image}
        resizeMode="cover"
      >
        {/* 10% overlay at the bottom of the image */}
        <View style={styles.imageOverlay} />
      </ImageBackground>

      {/* Bottom 40% black section */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>
          Fall in Love with{"\n"}Coffee in Blissful Delight!
        </Text>

        <Text style={styles.subtitle}>
          Welcome to our cozy coffee corner, where{"\n"}
          every cup is a delightful for you.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // fallback
  },
  image: {
    flex: 0.7, // 60% height
    width: "100%",
    justifyContent: "flex-end",
  },
  imageOverlay: {
    height: "4%", // small overlay area
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.3)", // 10% black fade
  },
  bottomSection: {
    flex: 0.1, // 40% height
    backgroundColor: "#000",
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#b07c4f",
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
