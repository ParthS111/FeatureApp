import { ADD_TO_CART, REMOVE_TO_CART, USER_LIST } from './constant';

export function addToCart(item: any) {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
}

export function removeToCart(item: any) {
  return {
    type: REMOVE_TO_CART,
    payload: item,
  };
}

export function getUserList() {
  console.log('ppppp');

  return {
    type: USER_LIST,
  };
}
