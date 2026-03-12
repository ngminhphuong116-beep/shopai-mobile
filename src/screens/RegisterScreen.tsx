import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import { registerSchema } from '../schemas/registerSchema';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {

  const { register } = useAuth();
  const navigation = useNavigation<any>();

  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);

  const handleRegister = () => {

    // BƯỚC 1: kiểm tra thông tin + gửi OTP
    if (!showOTP) {

      const result = registerSchema.safeParse({
        username,
        phone,
        email
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

    // HOÀN TẤT ĐĂNG KÝ
    register(username, phone, email);
    Alert.alert('Thành công', 'Đăng ký thành công');
  };

  const cancelRegister = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Đăng ký</Text>

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

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
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

      {/* Nút đăng ký / xác nhận OTP */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>
          {showOTP ? 'XÁC NHẬN OTP' : 'ĐĂNG KÝ'}
        </Text>
      </TouchableOpacity>

      {/* Nút hủy */}
      {showOTP && (
        <TouchableOpacity
          style={styles.cancel}
          onPress={cancelRegister}
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
    padding: 14,
    borderRadius: 10,
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