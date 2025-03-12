import React from "react";
import { View, Alert, SafeAreaView, TouchableOpacity, Text } from "react-native";
import { signOut } from "../../utils/auth";
import DashboardNavigator from "../../navigation/DashboardNavigator";

export default function HomeScreen({ navigation }: any) {
  const handleSignOut = async () => {
    try {
      await signOut();
      Alert.alert("Success", "Signed out successfully.");
      navigation.navigate("SignIn");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
{/*       <View className="p-4 bg-white shadow-md">
        <Text className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Welcome to the Home Screen!
        </Text>
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-red-600 py-3 rounded-lg items-center mx-4"
        >
          <Text className="text-white font-semibold text-lg">Sign Out</Text>
        </TouchableOpacity>
      </View> */}

      {/* DashboardNavigator inside HomeScreen */}
      <View className="flex-1">
        <DashboardNavigator />
      </View>
    </SafeAreaView>
  );
}
