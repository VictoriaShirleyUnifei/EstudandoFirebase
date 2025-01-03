import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth } from "./src/firebaseConnection";
import FormUsers from "./src/FormUsers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, useEffect } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser({
          email: user.email,
          uid: user.uid,
        });
        setLoading(false);
        return;
      }

      setAuthUser(null);
      setLoading(false);
    });
  }, []);

  async function handleCreateUser() {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
  }

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setAuthUser({
          email: user.user.email,
          uid: user.user.id,
        });
      })
      .catch((err) => {
        if (err.code === "auth/missing-password") {
          console.log("A senha é obrigatória!!");
          return;
        }
        console.log(err.code);
      });
  }

  if (authUser) {
    return (
      <View style={styles.container}>
        <FormUsers />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={{textAlign: "center"}}>Carregando informações...</Text>
      ) : (
        <View>
          <Text style={styles.title}>Bem-vindo!</Text>

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email..."
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha..."
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
            <Text style={styles.buttonText}>Cadastrar-se</Text>
          </TouchableOpacity>

          <Text>Usuário logado: {authUser && authUser.email}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 4,
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
