import { useRouter } from "expo-router";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const router = useRouter();

  return (
    <View>
      <ImageBackground
        source={require("@/assets/images/hero.png")}
        className="flex-1 justify-end"
        resizeMode="cover"
      >
        {/* Overlay for dark effect */}
        <View className="absolute inset-0 bg-black/50" />

        <View className="px-6 pb-12 relative">
          <Text className="text-white text-2xl font-bold text-center mb-3">
            Fall in Love with{"\n"}
            Coffee in Blissful Delight!
          </Text>

          <Text className="text-gray-300 text-center mb-6">
            Welcome to our cozy coffee corner, where{"\n"}
            every cup is a delightful for you.
          </Text>

          <TouchableOpacity
            className="bg-amber-600 py-4 rounded-xl"
            onPress={() => router.push("/home")}
          >
            <Text className="text-white text-center font-semibold text-base">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}