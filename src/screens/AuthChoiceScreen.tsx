import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AuthChoiceScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.text}>ĐĂNG NHẬP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.text}>ĐĂNG KÝ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, textAlign: 'center', marginBottom: 30 },
  button: {
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 6,
    marginBottom: 14,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});