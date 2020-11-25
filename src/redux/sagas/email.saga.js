import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* emailConfirm(action) {
  
  yield axios({
    method: 'POST',
    url: action.url,
    data: action.payload
  });
}

function* emailAdmin(action) {
  
  yield axios({
    method: 'POST',
    url: action.url,
    data: action.payload
  });
}

function* emailComplete(action) {
 
  yield axios({
    method: 'POST',
    url: action.url,
    data: action.payload
  });
}

function* emailSaga() {
  yield takeLatest('SEND_CONFIRM', emailConfirm);
  yield takeLatest('SEND_ADMIN', emailAdmin);
  yield takeLatest('SEND_COMPLETE', emailComplete)
}

export default emailSaga;