import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { db } from './firebaseConnection';
import { deleteDoc, doc } from 'firebase/firestore' 

export function UserList({ data }) {
  async function handleDeleteItem() {
    const docRef = doc(db, "users", data.id)
    await deleteDoc(docRef);
  }

  return (
    <View style={styles.container}>
      <Text>Nome: {data.nome}</Text>
      <Text>Idade: {data.idade}</Text>
      <Text>Cargo: {data.cargo}</Text>
      <TouchableOpacity style={styles.buttonDelete} onPress={handleDeleteItem}>
        <Text style={styles.buttonText}>Deletar usuário</Text>
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
    padding: 4,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
  },
});
