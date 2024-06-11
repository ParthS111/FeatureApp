import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import BudgetHeader from '../../components/BudgetHeader';
import AddBudgetForm from '../../components/AddBudgetForm';
import { addBudget, BudgetProps, getBudget } from '../../sqliteDB/budgetDB';
import { deleteUserInfo, getUserInfo } from '../../sqliteDB/userList';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../../navigation/router';
import { RouterType } from '../../navigation/types';

const BudgetHome = () => {
  const [budgetList, setBudgetList] = useState<BudgetProps[]>([]);
  const navigation = useNavigation<NavigationType>();

  const setBudget = async (): Promise<void> => {
    const budgets = await getBudget();
    if (budgets.length) setBudgetList(budgets);
    console.log(budgets);
  };

  useLayoutEffect(() => {
    setBudget();
  }, []);

  const onLogout = async () => {
    const result = await deleteUserInfo('UserInfo');
    // console.log('ppp', result);
    if (result) navigation.navigate(RouterType.UserSignUp);
  };

  const handleAddBudget = async (
    title: string,
    description: string,
    price: number,
  ) => {
    const userInfo = await getUserInfo();
    await addBudget({
      title,
      description,
      price,
      userId: Number(userInfo?.id),
    });
    setBudget();
    // Handle the form submission logic here, e.g., save the budget
    Alert.alert(
      'Budget Added',
      `Title: ${title}\nDescription: ${description}\nPrice: RS.${price.toFixed(
        2,
      )}`,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BudgetHeader title="Budget App" onLogout={onLogout} />
      <AddBudgetForm onSubmit={handleAddBudget} />
      <View>
        <FlatList
          data={budgetList}
          keyExtractor={(item: BudgetProps, index: number) =>
            `${item.id}_${index}`
          }
          renderItem={({ item }) => (
            <View key={item?.id} style={styles.itemContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>
                Description
                <Text style={styles.description}>{item.description}</Text>
              </Text>
              <Text>
                Price: <Text style={styles.price}>{item.price}</Text>
              </Text>
            </View>
          )}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

export default BudgetHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
});
