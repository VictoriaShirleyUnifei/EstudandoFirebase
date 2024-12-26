import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { db } from './src/firebaseConnection';
import { doc, getDoc, onSnapshot, setDoc, collection, addDoc } from 'firebase/firestore';

export default function App() {
  const [nome, setNome] = useState("Carregando...")

  useEffect(() => {
    async function getDados(){
      // const docref = doc(db, "users", "1");
      // getDoc(docref)
      // .then((snapshot) => {
      //   setNome(snapshot.data()?.nome);
      // })
      // .catch((err) => {
      //   console.log("error: ", err);
      // })

      //observer in real time
      onSnapshot(doc(db, "users", "1"), (doc) => {
        setNome(doc.data()?.nome);
      })
    } 

    getDados();
  }, [])

  async function handleRegister(){
    // await setDoc(doc(db, "users", "3"), {
    //   nome: "José",
    //   idade: 30,
    //   cargo: "Back-End"
    // })
    // .then(() => {
    //   console.log("Cadastrado com sucesso!!");
    // })
    // .catch((err) => {
    //   console.log(err);
    // })

    //id aleatório
    await addDoc(collection(db, "users"), {
      nome: "Bianca",
      idade: 20,
      cargo: "Front-End"
    })
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 16}}>Nome: {nome}</Text>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
  },
  button: {
    backgroundColor: "#000",
  },
  buttonText: {
    padding: 8,
    color: "#fff"
  }
});
