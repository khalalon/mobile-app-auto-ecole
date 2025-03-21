import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Examen } from "../../types/types";
import { Edit3, Trash2, X } from "lucide-react-native";
import { deleteExamen } from "../../services/ExamenServices";

interface ExamenDetailsProps {
  examen: Examen;
  onClose: () => void;
  onEdit: (examen: Examen) => void;
  onDelete: (examen: Examen) => Promise<void>;
}

export default function ExamenDetails({ examen, onClose, onEdit, onDelete }: ExamenDetailsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    Alert.alert(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer cet examen ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          onPress: async () => {
            setIsDeleting(true);
            try {
              await deleteExamen(examen.id!);
              await onDelete(examen);
            } catch {
              Alert.alert("Erreur", "Impossible de supprimer l'examen.");
            } finally {
              setIsDeleting(false);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <View className="flex-row items-center py-2">
      <Text className="text-gray-600 text-base w-32">{label}</Text>
      <Text className="text-gray-800 text-base font-medium flex-1">{value}</Text>
    </View>
  );

  return (
    <View className="bg-white p-4 rounded-xl shadow-lg mx-4 my-6">
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-xl font-semibold text-gray-900">Détails de l'examen</Text>
        <View className="flex-row space-x-4">
          <TouchableOpacity onPress={() => onEdit(examen)} className="p-1" disabled={isDeleting}>
            <Edit3 size={20} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} className="p-1" disabled={isDeleting}>
            {isDeleting ? (
              <ActivityIndicator size="small" color="#EF4444" />
            ) : (
              <Trash2 size={20} color="#EF4444" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} className="p-1" disabled={isDeleting}>
            <X size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="space-y-3">
        <InfoItem label="Client:" value={examen.clientNom || ""} />
        <InfoItem label="CIN:" value={examen.clientCin} />
        <InfoItem label="Date:" value={examen.dateExamen} />
        <InfoItem label="Type:" value={examen.typeExamen} />
        <InfoItem label="Statut Paiement:" value={examen.statutPaiement} />
        <InfoItem label="Coût:" value={`${examen.coutExamen} TND`} />
        {examen.createdAt && (
          <InfoItem
            label="Créé le:"
            value={new Date(examen.createdAt).toLocaleDateString()}
          />
        )}
        {examen.updatedAt && (
          <InfoItem
            label="Mis à jour le:"
            value={new Date(examen.updatedAt).toLocaleDateString()}
          />
        )}
      </View>
    </View>
  );
}