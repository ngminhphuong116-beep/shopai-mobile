import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { loginSchema } from '../schemas/loginSchema';

export default function LoginScreen() {

  const { login } = useAuth();
  const navigation = useNavigation<any>();

  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);

  const handleLogin = () => {

    // BƯỚC 1: validate + gửi OTP
    if (!showOTP) {

      const result = loginSchema.safeParse({
        username,
        phone,
      });

      if (!result.success) {
        Alert.alert(
          'Lỗi',
          result.error.issues[0].message
        );
        return;
      }

      Alert.alert('OTP', 'Mã xác nhận đã gửi về SĐT');
      setShowOTP(true);
      return;
    }

    // BƯỚC 2: xác nhận OTP
    if (!otp) {
      Alert.alert('Lỗi', 'Vui lòng nhập mã xác nhận');
      return;
    }

    // ĐĂNG NHẬP THÀNH CÔNG
    login(username, phone);
  };

  const cancelLogin = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Đăng nhập</Text>

      <TextInput
        placeholder="Tên đăng nhập"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Số điện thoại"
        style={styles.input}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      {showOTP && (
        <TextInput
          placeholder="Mã xác nhận"
          style={styles.input}
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          {showOTP ? 'XÁC NHẬN OTP' : 'ĐĂNG NHẬP'}
        </Text>
      </TouchableOpacity>

      {showOTP && (
        <TouchableOpacity
          style={styles.cancel}
          onPress={cancelLogin}
        >
          <Text style={styles.cancelText}>HỦY</Text>
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2'
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12
  },

  button: {
    backgroundColor: '#2f80ed',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },

  cancel: {
    backgroundColor: '#999',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },

  cancelText: {
    color: '#fff',
    fontWeight: 'bold'
  }

});