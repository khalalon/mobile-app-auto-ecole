// screens/ClientsScreen.tsx
import React, { useEffect, useState } from "react";
import { Text,Alert, ActivityIndicator, TextInput, View } from "react-native";
import { Client, createClient, getClients, updateClient, deleteClient } from "../../services/clientService";
import ClientList from "../../componenets/ClientList";
import ClientForm from "../../componenets/ClientForm";
import ClientDetails from "../../componenets/ClientDetails";
import { ScrollView } from 'react-native-virtualized-view'


export default function ClientsScreen() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | undefined>(undefined);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    // Filter clients based on search query
    const filtered = clients.filter(client => 
      client.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.cin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.telephone.includes(searchQuery)
    );
    setFilteredClients(filtered);
  }, [searchQuery, clients]);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const fetchedClients = await getClients();
      setClients(fetchedClients);
      setFilteredClients(fetchedClients);
    } catch {
      Alert.alert("Erreur", "Impossible de récupérer les clients.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (client: Client) => {
    setIsLoading(true);
    try {
      if (editingClient) {
        await updateClient(client.cin, client);
      } else {
        await createClient(client);
      }
      fetchClients();
      setEditingClient(undefined);
    } catch {
      Alert.alert("Erreur", "Action impossible.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (client: Client) => {
    setIsLoading(true);
    try {
      await deleteClient(client.cin);
      fetchClients();
      setSelectedClient(undefined); // Return to list view after deletion
    } catch {
      Alert.alert("Erreur", "Impossible de supprimer le client.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <Text className="text-2xl font-semibold text-center text-gray-800 mt-4 mb-4">
        Liste des clients
      </Text>

      {/* Show ClientForm only when not viewing details */}
      {!selectedClient && (
        <ClientForm 
          initialData={editingClient} 
          onSubmit={handleSubmit} 
          isEditing={!!editingClient} 
        />
      )}

      {/* Search Bar - hidden when viewing details */}
      {!selectedClient && (
        <View className="mx-4 mb-4">
          <TextInput
            className="border border-gray-200 rounded-xl bg-white px-4 py-3"
            placeholder="Rechercher un client..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      {/* Toggle between Details and List */}
      {selectedClient ? (
        <ClientDetails 
          client={selectedClient} 
          onClose={() => setSelectedClient(undefined)} 
        />
      ) : isLoading ? (
        <ActivityIndicator size="large" className="mt-4" />
      ) : (
        <View className="mx-4">
          <ClientList 
            clients={filteredClients} 
            onEdit={setEditingClient} 
            onDelete={handleDelete}
            onSelect={setSelectedClient}
          />
        </View>
      )}
    </ScrollView>
  );
}