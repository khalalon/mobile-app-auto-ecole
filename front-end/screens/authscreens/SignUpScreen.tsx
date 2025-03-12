import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signUp } from "../../utils/auth";

export default function SignUpScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignUp = async () => {
    try {
      await signUp(username, password, email);
      Alert.alert("Success", "Account created. Please verify your email.");
      navigation.navigate("ConfirmSignUp", { username });
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-6"
      >
        <View className="bg-white p-6 rounded-2xl shadow-lg">
          <Text className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</Text>

          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-gray-800"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-gray-800"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            className="border border-gray-300 rounded-lg px-4 py-3 mb-6 text-gray-800"
          />

          <TouchableOpacity
            onPress={handleSignUp}
            className="bg-blue-600 py-3 rounded-lg items-center"
          >
            <Text className="text-white font-semibold text-lg">Sign Up</Text>
          </TouchableOpacity>

          <Text className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Text
              className="text-blue-600 font-semibold"
              onPress={() => navigation.navigate("SignIn")}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
