import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from './src/firebaseConnection';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

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

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 16}}>Nome: {nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
  },
});
