import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, Title } from 'react-native-paper';
import { RootStackParamList, RouterType } from '../../navigation/types';
import {
  addContact,
  getUserInfo,
  UserInfo,
  UserListProps,
} from '../../sqliteDB/userList';
import { StackNavigationProp } from '@react-navigation/stack';
import { removeTable } from '../../sqliteDB/db';

interface Errors {
  firstName?: string;
  lastName?: string;
  password?: string;
  phoneNumber?: string;
}

const UserSignUp = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});

  useLayoutEffect(() => {
    (async () => {
      const getUserData: UserListProps | null = await getUserInfo();
      if (getUserData) navigation.navigate(RouterType.BudgetHome);
    })();
  }, []);

  const validate = (): boolean => {
    let valid = true;
    let errors: Errors = {};

    if (firstName.trim() === '') {
      errors.firstName = 'First name is required';
      valid = false;
    }

    if (lastName.trim() === '') {
      errors.lastName = 'Last name is required';
      valid = false;
    }

    if (password.trim().length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      valid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      errors.phoneNumber = 'Phone number must be 10 digits';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      // Handle successful form submission
      await addContact({ firstName, lastName, password, phoneNumber });
      const a = await UserInfo({ firstName, lastName, password, phoneNumber });
      console.log(a, '<====1234213456');

      navigation.navigate(RouterType.BudgetHome);
    } else {
      console.log('Validation failed');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Sign Up</Title>
      <TextInput
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
        error={!!errors.firstName}
      />
      <HelperText type="error" visible={!!errors.firstName}>
        {errors.firstName}
      </HelperText>
      <TextInput
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
        error={!!errors.lastName}
      />
      <HelperText type="error" visible={!!errors.lastName}>
        {errors.lastName}
      </HelperText>
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        error={!!errors.password}
      />
      <HelperText type="error" visible={!!errors.password}>
        {errors.password}
      </HelperText>
      <TextInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
        keyboardType="numeric"
        error={!!errors.phoneNumber}
      />
      <HelperText type="error" visible={!!errors.phoneNumber}>
        {errors.phoneNumber}
      </HelperText>
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default UserSignUp;
