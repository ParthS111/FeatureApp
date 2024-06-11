import { combineReducers } from 'redux';
import counterslice from './counterslice';
import todoListSlice from './todoList';

export default combineReducers({
  counter: counterslice,
  todoList: todoListSlice,
});
