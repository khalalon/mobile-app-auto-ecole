import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert, TouchableOpacity } from "react-native";
import { confirmSignUp } from "../../utils/auth";

export default function ConfirmSignUpScreen({ route, navigation }: any) {
  const [code, setCode] = useState("");
  const { username } = route.params;

  const handleConfirm = async () => {
    try {
      await confirmSignUp(username, code);
      Alert.alert("Success", "Verification successful. You can now sign in.");
      navigation.navigate("SignIn");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-gray-100">
      <Text className="text-2xl font-semibold text-center text-blue-600 mb-4">
        Confirm Your Sign-Up
      </Text>
      <View className="bg-white p-6 rounded-lg shadow-lg">
        <TextInput
          placeholder="Enter Verification Code"
          value={code}
          onChangeText={setCode}
          className="border-2 border-gray-300 rounded-lg p-4 mb-4 text-gray-700"
        />
        <TouchableOpacity
          className="bg-blue-600 rounded-lg py-3 mb-4"
          onPress={handleConfirm}
        >
          <Text className="text-white text-center font-semibold text-lg">Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="py-2"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-blue-600 text-center text-sm">Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
