import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import { Image } from 'react-native';
export default function ProfileHome() {
  const { logout } = useAuth();

  /* ================= STATE ================= */
  const [loading, setLoading] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
const [avatar, setAvatar] = useState(
  'https://i.pravatar.cc/150?img=3'
);
  const [name, setName] = useState('Nguyễn Minh');
  const [email, setEmail] = useState('nguyenminh@gmail.com');
  const [phone, setPhone] = useState('0901234567');
  const [address, setAddress] = useState('TP. Hồ Chí Minh');

  const [notify, setNotify] = useState(true);
  const [publicEmail, setPublicEmail] = useState(false);

  /* ================= VALIDATION ================= */
  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validatePhone = (value: string) =>
    /^[0-9]{9,11}$/.test(value);

  /* ================= ACTION ================= */
  const handleSave = () => {
    if (!name || !phone) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (email && !validateEmail(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ');
      return;
    }

    if (!validatePhone(phone)) {
      Alert.alert('Lỗi', 'Số điện thoại không hợp lệ');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Thành công', 'Cập nhật thông tin thành công');
    }, 1200);
  };

  /* ================= UI ================= */
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Hồ sơ cá nhân</Text>
        <View style={styles.avatarContainer}>
  <Image
    source={{ uri: avatar }}
    style={styles.avatar}
  />
</View>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Họ tên"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={phone}
            keyboardType="phone-pad"
            onChangeText={setPhone}
          />

          <TextInput
            style={styles.input}
            placeholder="Địa chỉ"
            value={address}
            onChangeText={setAddress}
          />

          <View style={styles.switchRow}>
            <Text>Nhận thông báo</Text>
            <Switch value={notify} onValueChange={setNotify} />
          </View>

          <View style={styles.switchRow}>
            <Text>Hiển thị email công khai</Text>
            <Switch value={publicEmail} onValueChange={setPublicEmail} />
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.btnText}>Lưu thay đổi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => setLogoutModal(true)}
          >
            <Text style={styles.btnText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ===== LOADING ===== */}
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: '#fff', marginTop: 10 }}>
            Đang xử lý...
          </Text>
        </View>
      )}

      {/* ===== LOGOUT MODAL ===== */}
      <Modal transparent animationType="fade" visible={logoutModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Đăng xuất</Text>
            <Text>Bạn có chắc muốn đăng xuất?</Text>

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setLogoutModal(false)}>
                <Text>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setLogoutModal(false);
                  logout();
                }}
              >
                <Text style={{ color: 'red' }}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  container: {
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  saveBtn: {
    backgroundColor: '#2f80ed',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },

  logoutBtn: {
    backgroundColor: '#E53935',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },

  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 12,
    padding: 16,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  avatarContainer: {
  alignItems: 'center',
  marginBottom: 20,
},

avatar: {
  width: 150,
  height: 150,
  borderRadius: 90,
  borderWidth: 3,
  borderColor: '#2f80ed',
  backgroundColor: '#eee',
},
});