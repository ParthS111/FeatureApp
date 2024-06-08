import { Alert, SafeAreaView, StyleSheet, Text } from 'react-native';
import React from 'react';
import BudgetHeader from '../../components/BudgetHeader';
import AddBudgetForm from '../../components/AddBudgetForm';
import { addBudget } from '../../sqliteDB/budgetDB';
import { getUserInfo } from '../../sqliteDB/userList';

const BudgetHome = () => {
  const onLogout = () => {
    console.log('ppp');
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
    // Handle the form submission logic here, e.g., save the budget
    Alert.alert(
      'Budget Added',
      `Title: ${title}\nDescription: ${description}\nPrice: $${price.toFixed(
        2,
      )}`,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BudgetHeader title="Budget App" onLogout={onLogout} />
      <AddBudgetForm onSubmit={handleAddBudget} />
    </SafeAreaView>
  );
};

export default BudgetHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
