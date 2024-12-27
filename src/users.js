import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { db } from "./firebaseConnection";
import { deleteDoc, doc } from "firebase/firestore";

export function UserList({ data, handleEdit }) {
  async function handleDeleteItem() {
    const docRef = doc(db, "users", data.id);
    await deleteDoc(docRef);
  }

  function handleEditItem() {
    handleEdit(data);
  }

  return (
    <View style={styles.container}>
      <Text>Nome: {data.nome}</Text>
      <Text>Idade: {data.idade}</Text>
      <Text>Cargo: {data.cargo}</Text>
      <TouchableOpacity style={styles.buttonDelete} onPress={handleDeleteItem}>
        <Text style={styles.buttonText}>Deletar usuário</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonEdit} onPress={handleEditItem}>
        <Text style={styles.buttonText}>Editar usuário</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  buttonDelete: {
    backgroundColor: "#b3261e",
    alignSelf: "flex-end",
    width: 120,
    padding: 4,
    borderRadius: 4,
    marginBottom: 3,
  },
  buttonEdit: {
    backgroundColor: "#000",
    alignSelf: "flex-end",
    width: 120,
    padding: 4,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
