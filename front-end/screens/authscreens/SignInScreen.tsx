import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { signIn } from "../../utils/auth";

export default function SignInScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      await signIn(username, password);
      Alert.alert("Success", "Signed in successfully!");
      navigation.navigate("Home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="flex-1 justify-center px-6 py-12">
          <Text className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign In
          </Text>

          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            className="border border-gray-300 rounded-lg px-4 py-3 mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <TouchableOpacity
            onPress={handleSignIn}
            className="bg-blue-600 py-3 rounded-lg mb-4 items-center"
          >
            <Text className="text-white font-semibold text-lg">Sign In</Text>
          </TouchableOpacity>

          <Text className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Text
              className="text-blue-600 font-semibold"
              onPress={() => navigation.navigate("SignUp")}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
