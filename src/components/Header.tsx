import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Header() {
  return (
    <View style={styles.container}>
      {/* ===== TOP ROW ===== */}
      <View style={styles.topRow}>
        <View style={styles.logoRow}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.shopName}>ÁO BÓNG ĐÁ P-L</Text>
        </View>
      </View>

      {/* ===== SEARCH ===== */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color="#666" />
        <TextInput
          placeholder="Tìm áo đội bóng, đội tuyển, mẫu thiết kế..."
          placeholderTextColor="#999"
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0a8f3c',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },

  topRow: {
    justifyContent: 'center',
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 55,
    height: 50,
    marginRight: 8,
  },

  shopName: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  searchBox: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    elevation: 3,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    color: '#000',
    fontSize: 14,
  },
});
