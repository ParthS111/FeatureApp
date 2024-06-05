import { put, takeEvery } from 'redux-saga/effects';
import { SET_USER_DATA, USER_LIST } from './constant';

function* usersList() {
  console.log('ppp222');

  try {
    const url = 'https://dummyjson.com/users';
    let data = yield fetch(url);
    data = yield data.json();
    // console.log('hello', data);
    yield put({ type: SET_USER_DATA, data });
  } catch (error) {
    console.log(error, '>,');
  }
}

function* SagaData() {
  yield takeEvery(USER_LIST, usersList);
}

export default SagaData;
