import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../module/Main';
import UserList from '../module/UserList';
import { RootStackParamList, RouterType } from './types';
import UserSignUp from '../module/UserLogin';
import BudgetHome from '../module/BudgetHome';
import { StackNavigationProp } from '@react-navigation/stack';
import { getContacts, getUserInfo, UserListProps } from '../sqliteDB/userList';
import { getTableNames } from '../sqliteDB/db';

const Stack = createNativeStackNavigator();

export const UserInfo = 'user_info';

export type NavigationType = StackNavigationProp<RootStackParamList>;

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName={RouterType.UserSignUp}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouterType.UserSignUp} component={UserSignUp} />
      <Stack.Screen name={RouterType.BudgetHome} component={BudgetHome} />
      {/* <Stack.Screen name={RouterType.UserSignUp} component={UserSignUp} />
      <Stack.Screen name={RouterType.UserSignUp} component={UserSignUp} /> */}

      <Stack.Screen name={RouterType.Home} component={Main} />
      <Stack.Screen name={RouterType.UserList} component={UserList} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
