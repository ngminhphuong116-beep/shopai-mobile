import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';

const categories = [
  {
    id: '1',
    title: 'Áo đội tuyển quốc gia',
    image: require('../assets/vietnam.png'),
  },
  {
    id: '2',
    title: 'Áo câu lạc bộ',
    image: require('../assets/mu.png'),
  },
  {
    id: '3',
    title: 'Áo tự thiết kế',
    image: require('../assets/custom.png'),
  },
  {
    id: '4',
    title: 'Phụ kiện thể thao',
    image: require('../assets/messi.png'),
  },
  {
    id: '5',
    title: 'Hướng dẫn chọn size',
    image: require('../assets/images/size.png'),
  }
];

const flashSale = [
  {
    id: 'f1',
    name: 'Áo đội tuyển Argentina',
    price: '299.000đ',
    oldPrice: '450.000đ',
    image: require('../assets/aghen.png'),
  },
  {
    id: 'f2',
    name: 'Áo CLB Manchester United',
    price: '279.000đ',
    oldPrice: '420.000đ',
    image: require('../assets/mu1.png'),
  },
  {
    id: 'f3',
    name: 'Áo Đội Tuyển Việt Nam',
    price: '259.000đ',
    oldPrice: '390.000đ',
    image: require('../assets/vietnam1.png'),
  },
];

const FlashSale = () => {
  return (
    <View style={styles.flashContainer}>
      <Text style={styles.flashTitle}>🔥 Flash Sale</Text>

      <FlatList
        data={flashSale}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.flashCard}>
            <Image source={item.image} style={styles.flashImage} />
            <Text style={styles.flashName}>{item.name}</Text>
            <Text style={styles.flashPrice}>{item.price}</Text>
            <Text style={styles.flashOldPrice}>{item.oldPrice}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>

      <Header />

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}

        ListHeaderComponent={
          <>
            <FlashSale />
          </>
        }

        renderItem={({ item }) => (
          <CategoryCard
            title={item.title}
            image={item.image}
          />
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },

  flashContainer: {
    marginBottom: 20,
  },

  flashTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  flashCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    elevation: 3,
  },

  flashImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },

  flashName: {
    fontSize: 14,
    marginTop: 6,
  },

  flashPrice: {
    color: 'red',
    fontWeight: 'bold',
  },

  flashOldPrice: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: 12,
  },
});