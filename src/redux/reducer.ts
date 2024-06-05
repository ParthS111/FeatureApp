import {
  ADD_TO_CART,
  REMOVE_TO_CART,
  SET_USER_DATA,
  USER_LIST,
} from './constant';

// Define your initial state properties here
const initialState = {
  cart: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case REMOVE_TO_CART:
      const result = state?.cart?.filter(item => {
        return item?.id != action?.payload?.id;
      });
      return {
        cart: [...result],
      };
    case SET_USER_DATA:
      return {
        ...state,
        userList: action.data,
      };
    default:
      return state;
  }
};
