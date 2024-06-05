import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const cartData = useSelector(state => state.reducer);
  const [cart, setCart] = useState(0);

  useEffect(() => {
    setCart(cartData?.cart?.length ?? 0);
  }, [cartData]);

  const handleAddToCart = () => {
    console.log('Navigating to Cart');
    // Add your navigation logic to the Cart screen here
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Shop</Text>
      <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
        <Text>{cart}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
});

export default Header;
