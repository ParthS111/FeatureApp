import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../module/Main';
import UserList from '../module/UserList';
import { RouterType } from './types';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouterType.Home} component={Main} />
      <Stack.Screen name={RouterType.UserList} component={UserList} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
