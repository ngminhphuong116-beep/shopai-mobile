import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { products } from '../data/Products';
import { CartContext } from '../context/CartContext';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ route }: any) {
  const { productId } = route.params;

  const product = products.find(p => p.id === productId);
  const { addToCart } = useContext(CartContext);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  if (!product) return null;

  const handleAddToCart = () => {
    if (product.size.length > 0 && !selectedSize) {
      Alert.alert('Thông báo', 'Vui lòng chọn size');
      return;
    }

    if (!selectedColor) {
      Alert.alert('Thông báo', 'Vui lòng chọn màu');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image[0],
      size: selectedSize!,
      color: selectedColor,
      qty: 1,
    });

    Alert.alert('Thành công', 'Đã thêm vào giỏ hàng');
  };

  return (
    <ScrollView style={styles.container}>
      {/* IMAGE SLIDER */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setActiveImage(index);
        }}
      >
        {product.image.map((img, index) => (
          <Image
            key={index}
            source={img}
            style={styles.image}
          />
        ))}
      </ScrollView>

      {/* DOTS */}
      <View style={styles.dots}>
        {product.image.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeImage === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.ratingRow}>
  <Text style={styles.star}>⭐</Text>
  <Text style={styles.ratingText}>
    {product.rating} ({product.reviewCount} đánh giá)
  </Text>
</View>


        <Text style={styles.price}>
          {product.price.toLocaleString()} ₫
        </Text>
        <Text style={styles.desc}>{product.description}</Text>

        {/* SIZE */}
        {product.size.length > 0 && (
          <>
            <Text style={styles.section}>Chọn size</Text>
            <View style={styles.row}>
              {product.size.map(size => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.option,
                    selectedSize === size && styles.selected,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* COLOR */}
        <Text style={styles.section}>Màu sắc</Text>
        <View style={styles.row}>
          {product.colors.map(color => (
            <TouchableOpacity
              key={color}
              style={[
                styles.option,
                selectedColor === color && styles.selected,
              ]}
              onPress={() => setSelectedColor(color)}
            >
              <Text>{color}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddToCart}
        >
          <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: {
    width,
    height: 370,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: '#E53935',
    marginVertical: 8,
  },
  desc: {
    color: '#555',
  },
  section: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginTop: 8,
  },
  option: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  selected: {
    borderColor: '#000',
  },
  button: {
    backgroundColor: '#E53935',
    padding: 14,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ratingRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 4,
},
star: {
  fontSize: 16,
  marginRight: 4,
},
ratingText: {
  color: '#555',
},

});
