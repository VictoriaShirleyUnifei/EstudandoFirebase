import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth } from './src/firebaseConnection';
import FormUsers from "./src/FormUsers";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function App() {

  async function handleCreateUser() {
   const user = await createUserWithEmailAndPassword(auth, "teste@gmail.com", "123123");
   console.log(user);
  }

  return (
    <View style={styles.container}>
      {/* <FormUsers /> */}
      <Text style={styles.title}>Bem-vindo!</Text>

      <Text style={styles.label}>Email:</Text>
      <TextInput style={styles.input} placeholder="Digite seu email..." />

      <Text style={styles.label}>Senha:</Text>
      <TextInput style={styles.input} placeholder="Digite sua senha..." />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
        <Text style={styles.buttonText}>Cadastrar-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 4
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
    textAlign: "center",
  },
});
