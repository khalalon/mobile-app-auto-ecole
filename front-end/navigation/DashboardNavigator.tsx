import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons"; // Import icons
import ClientsScreen from "../screens/appscrenns/ClientsScreens";
import SeancesScreen from "../screens/appscrenns/SeancesScreen";
import ExamensScreen from "../screens/appscrenns/ExamensScreen";

const Tab = createBottomTabNavigator();

export default function DashboardNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#fff", paddingBottom: 10, height: 60 }, // Style for tab bar
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Clients") {
            return <MaterialIcons name="people" size={size} color={color} />;
          } else if (route.name === "Séances") {
            return <FontAwesome5 name="calendar-check" size={size} color={color} />;
          } else if (route.name === "Examens") {
            return <MaterialIcons name="assignment" size={size} color={color} />;
          }

          return null;
        },
        tabBarActiveTintColor: "#007bff", // Active tab color
        tabBarInactiveTintColor: "gray",  // Inactive tab color
      })}
    >
      <Tab.Screen name="Clients" component={ClientsScreen} />
      <Tab.Screen name="Séances" component={SeancesScreen} />
      <Tab.Screen name="Examens" component={ExamensScreen} />
    </Tab.Navigator>
  );
}
