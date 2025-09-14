import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRouter } from "expo-router";
import { RootStackParamList } from './types';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>

export default function CoffeeWelcomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("@/assets/images/hero.png")} // replace with your coffee image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>
          Fall in Love with{"\n"}Coffee in Blissful Delight!
        </Text>

        <Text style={styles.subtitle}>
          Welcome to our cozy coffee corner, where{"\n"}
          every cup is a delightful for you.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/home')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#d1d5db", // light gray
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#f97316", // orange
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "center",
    width: 160,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
});

