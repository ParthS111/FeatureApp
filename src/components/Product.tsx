import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Product = ({ item, onPress }: any) => {
  const cartData = useSelector(state => state?.reducer?.cart);
  const [isAddedCart, setIsAddedCart] = useState(false);

  useEffect(() => {
    // if (cartData && cartData?.length) {
    //   cartData?.forEach(el => {
    //     if (el?.name === item?.name) {
    //       setIsAddedCart(true);
    //     } else {
    //       setIsAddedCart(false);
    //     }
    //   });
    // }
    // cartData?.forEach(el => {
    //   if (el?.name === item?.name) {
    //     setIsAddedCart(true);
    //   } else {
    //     setIsAddedCart(false);
    //   }
    // });
    const reslut = cartData?.filter(el => {
      return el?.name === item?.name;
    });
    if (reslut?.length) {
      setIsAddedCart(true);
    } else {
      setIsAddedCart(false);
    }
  }, [cartData]);

  return (
    <View key={item?.id} style={styles.card}>
      <Text style={styles.name}>{item?.name}</Text>
      <Image source={{ uri: item?.image }} style={styles.image} />
      <Text style={styles.price}>${item?.price}</Text>
      <Text style={styles.color}>{item?.color}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onPress(item, isAddedCart)}>
        <Text style={styles.buttonText}>
          {isAddedCart ? 'Remove to cart' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#888',
    marginBottom: 4,
  },
  color: {
    fontSize: 18,
    color: '#555',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
