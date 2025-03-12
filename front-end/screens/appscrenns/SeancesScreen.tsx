import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';

export default function SeancesScreen() {
  const [seance, setSeance] = useState('');
  const [dateSeance, setDateSeance] = useState('');
  const [fraisPaye, setFraisPaye] = useState('');

  const handleCreateSeance = () => {
    // Validation
    if (!seance || !dateSeance || !fraisPaye) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Clear form after submission
    setSeance('');
    setDateSeance('');
    setFraisPaye('');

    Alert.alert("Success", "Seance added successfully.");
  };

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-semibold text-center mb-4">Add New Seance</Text>

      <TextInput
        value={seance}
        onChangeText={setSeance}
        placeholder="Séance"
        className="mb-4 p-3 border rounded-lg border-gray-300"
      />
      <TextInput
        value={dateSeance}
        onChangeText={setDateSeance}
        placeholder="Date de séance (YYYY-MM-DD)"
        className="mb-4 p-3 border rounded-lg border-gray-300"
      />
      <TextInput
        value={fraisPaye}
        onChangeText={setFraisPaye}
        placeholder="Frais payés (Oui/Non)"
        className="mb-4 p-3 border rounded-lg border-gray-300"
      />

      <Button title="Add Seance" onPress={handleCreateSeance} />
    </ScrollView>
  );
}
