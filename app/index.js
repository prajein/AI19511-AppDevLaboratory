// app/index.js
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI19511 MAD Lab</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => router.push('/exp1')}>
        <Text style={styles.buttonText}>Experiment 1</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/exp2')}>
        <Text style={styles.buttonText}>Experiment 2</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/exp3')}>
        <Text style={styles.buttonText}>Experiment 3</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/exp4')}>
        <Text style={styles.buttonText}>Experiment 4</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/exp5')}>
        <Text style={styles.buttonText}>Experiment 5</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/exp6')}>
        <Text style={styles.buttonText}>Experiment 6</Text>
      </TouchableOpacity>
    

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
