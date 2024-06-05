import { SafeAreaView, StyleSheet, ScrollView, Button } from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import { products } from '../../theme/data';
import Product from '../../components/Product';
import { addToCart, removeToCart } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { RootStackParamList } from '../../navigation/types';
import { RouterType } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

type NavigationType = StackNavigationProp<RootStackParamList>;

const Main = ({ navigation }: { navigation: NavigationType }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item: any, isAddedCart: boolean) => {
    if (isAddedCart) {
      dispatch(removeToCart(item));
    } else {
      dispatch(addToCart(item));
    }
  };

  const onNextScreen = () => {
    navigation.navigate(RouterType.UserList);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Button title="Go to user list" onPress={onNextScreen} />
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        {products?.map(item => (
          <Product key={item?.id} item={item} onPress={handleAddToCart} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    padding: 16,
  },
});

export default Main;
