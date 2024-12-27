import {
  StyleSheet,
  View,
  Text
} from "react-native";
import FormUsers from './src/FormUsers';

export default function App() {

  return (
    <View style={styles.container}>
      <FormUsers />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
