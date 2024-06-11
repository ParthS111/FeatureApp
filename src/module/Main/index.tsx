import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../../redux/reducer/todoList';
import { increment, decrement } from '../../redux/reducer/counterslice';
import { RootState } from '../../redux/store';

const Main = () => {
  const reduxState = useSelector((state: RootState) => state.counter);
  const todoListState = useSelector((state: RootState) => state.todoList);
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState<string>('');

  const incrementValue = () => {
    dispatch(increment());
  };

  const decrementValue = () => {
    dispatch(decrement());
  };

  const handleAddTodo = () => {
    dispatch(addTodo({ text: newTodoText }));
    setNewTodoText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.counterContainer}>
        <Button title="-" onPress={decrementValue} />
        <Text style={styles.countText}>{reduxState?.value}</Text>
        <Button title="+" onPress={incrementValue} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodoText}
          onChangeText={setNewTodoText}
          placeholder="Enter new todo"
        />
        <Button title="Add" onPress={handleAddTodo} />
      </View>
      <FlatList
        style={styles.list}
        data={todoListState?.list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 200,
    marginTop: 100,
  },
  countText: {
    fontSize: 32,
    marginHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 100,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  list: {
    flex: 1,
  },
  todoItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Main;
