import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BudgetHeader = ({
  title,
  onLogout,
}: {
  title: string;
  onLogout: () => void;
}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#4CAF50', // Background color of the header
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Text color of the title
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#f44336', // Background color of the logout button
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff', // Text color of the logout button
    fontSize: 16,
  },
});

export default BudgetHeader;
