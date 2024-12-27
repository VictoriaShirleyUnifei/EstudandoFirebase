import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { db } from "./firebaseConnection";
import {
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { UserList } from "./users";

export default function FormUsers() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cargo, setCargo] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState("");

  useEffect(() => {
    async function getDados() {
      const usersRef = collection(db, "users");

      onSnapshot(usersRef, (snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nome: doc.data().nome,
            idade: doc.data().idade,
            cargo: doc.data().cargo,
          });
        });
        setUsers(lista);
      });

      //   getDocs(usersRef)
      //   .then((snapshot) => {
      //     let lista = [];

      //     snapshot.forEach((doc) => {
      //       lista.push({
      //         id: doc.id,
      //         nome: doc.data().nome,
      //         idade: doc.data().idade,
      //         cargo: doc.data().cargo
      //       })
      //     })
      //     setUsers(lista);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   })
    }

    getDados();
  }, []);

  async function handleRegister() {
    await addDoc(collection(db, "users"), {
      nome: nome,
      idade: idade,
      cargo: cargo,
    })
      .then(() => {
        console.log("Usuário cadastrado com sucesso!");
        setNome("");
        setIdade("");
        setCargo("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleToggle() {
    setShowForm(!showForm);
  }

  function editUser(data){
    setNome(data.nome);
    setIdade(data.idade);
    setCargo(data.cargo);
    setIsEditing(data.id);
  }

  async function handleEditUser() {
    const docRef = doc(db, "users", isEditing);
    await updateDoc(docRef, {
      nome: nome,
      idade: idade,
      cargo: cargo
    })

    setNome("");
    setIdade("");
    setCargo("");
    setIsEditing("");
  }

  return (
    <View style={styles.container}>
      {showForm && (
        <View>
          <Text style={styles.title}>Formulário</Text>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome..."
            value={nome}
            onChangeText={(text) => setNome(text)}
          />

          <Text style={styles.label}>Idade:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua idade..."
            value={idade}
            onChangeText={(text) => setIdade(text)}
          />

          <Text style={styles.label}>Cargo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu cargo..."
            value={cargo}
            onChangeText={(text) => setCargo(text)}
          />

          { isEditing !== "" ? (
            <TouchableOpacity style={styles.button} onPress={handleEditUser}>
              <Text style={styles.buttonText}>Editar usuário</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Adicionar usuário</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleToggle}>
        <Text style={styles.buttonText}>
          {showForm ? "Esconder formulário" : "Mostrar formulário"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>Usuários</Text>

      <FlatList
        style={styles.lista}
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <UserList data={item} handleEdit={(item) => editUser(item)} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 80,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 8,
    marginBottom: 4,
  },
  buttonText: {
    padding: 8,
    color: "#fff",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    color: "gray",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    marginTop: 8,
    marginBottom: 8,
    fontWeight: "bold",
  },
  lista: {
    marginTop: 8,
  },
});
