import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TodoItem {
  text: string;
}

export interface TodoListState {
  list: TodoItem[];
}

const initialState: TodoListState = {
  list: [],
};

const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoItem>) => {
      console.log(state, action);

      state.list = [...state.list, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo } = todoListSlice.actions;

export default todoListSlice.reducer;
