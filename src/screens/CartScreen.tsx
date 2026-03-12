import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  
  const { items, removeFromCart } = useCart();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);


  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

 
  const totalPrice = items
    .filter((item) => selectedIds.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.qty, 0);

  
  if (items.length === 0) {
    return (
      <View style={styles.center}>
        <Text>🛒 Giỏ hàng trống</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => {
          const checked = selectedIds.includes(item.id);

          return (
            <View style={styles.card}>
              {/* CHECKBOX */}
              <TouchableOpacity onPress={() => toggleSelect(item.id)}>
                <Text style={styles.checkbox}>
                  {checked ? '☑️' : '⬜'}
                </Text>
              </TouchableOpacity>

              {/* IMAGE */}
              <Image source={item.image} style={styles.image} />

              {/* INFO */}
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text>Size: {item.size}</Text>
                <Text>SL: {item.qty}</Text>
                <Text style={styles.price}>
                  {item.price.toLocaleString()} ₫
                </Text>
              </View>

              {/* REMOVE */}
              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Text style={styles.remove}>✕</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.total}>
          Tổng: {totalPrice.toLocaleString()} ₫
        </Text>

        <TouchableOpacity
          style={styles.payButton}
          onPress={() => {
            if (selectedIds.length === 0) {
              Alert.alert('Thông báo', 'Vui lòng chọn sản phẩm');
              return;
            }

            Alert.alert(
              'Thanh toán',
              `Tổng tiền: ${totalPrice.toLocaleString()} ₫`
            );
          }}
        >
          <Text style={styles.payText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  checkbox: {
    fontSize: 20,
    marginRight: 8,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 6,
  },
  name: {
    fontWeight: 'bold',
  },
  price: {
    color: '#E53935',
    marginTop: 4,
    fontWeight: 'bold',
  },
  remove: {
    fontSize: 18,
    padding: 8,
  },
 footer: {
  padding: 14,
  paddingBottom: 80, 
  borderTopWidth: 1,
  borderColor: '#eee',
  backgroundColor: '#fff',
},
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  payButton: {
    backgroundColor: '#E53935',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  payText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
