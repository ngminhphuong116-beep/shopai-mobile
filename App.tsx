<<<<<<< HEAD
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileHome';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';

import { CartProvider, useCart } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';
import ProfileGate from './src/components/ProfileGate';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* ===== HOME STACK ===== */
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

/* ===== MAIN TABS ===== */
function MainTabs() {
  const { items } = useCart();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        let iconName: string;

        if (route.name === 'HomeTab') {
          iconName = 'home-outline';
        } else if (route.name === 'Cart') {
          iconName = 'cart-outline';
        } else {
          iconName = 'person-outline';
        }

        return {
          headerShown: false,

          tabBarActiveTintColor: '#0a8f3c',
          tabBarInactiveTintColor: '#999',

          tabBarStyle: {
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: 5,
            height: 50,
            borderRadius: 18,
            backgroundColor: '#fff',

            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 6 },

            elevation: 10,
          },

          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 6,
          },

          tabBarIcon: ({ color, size }) => (
            <Ionicons name={iconName} size={size} color={color} />
          ),
        };
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: 'Trang chủ' }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Giỏ hàng',
          tabBarBadge: items.length > 0 ? items.length : undefined,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileGate}
        options={{ title: 'Cá nhân' }}
      />
    </Tab.Navigator>
  );
}

/* ===== APP ===== */
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <MainTabs />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}
=======
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
>>>>>>> 2b1e34fdbff0cf49721f15805e4451f37aedf3a1
