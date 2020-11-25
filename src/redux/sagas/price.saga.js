import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPrice(action) {

    let response = yield axios({
        method: 'GET',
        url: `/price`,
    });
    yield put({
        type: 'SET_PRICE',
        payload: response.data
    });
}

function* updatePrice(action) {
    yield axios({
        method: 'PUT',
        url: action.url,
        data: action.payload
    });
    yield put({
        type: 'FETCH_PRICE'
    });
}

function* priceSaga() {
    yield takeLatest('FETCH_PRICE', fetchPrice);
    yield takeLatest('UPDATE_PRICE', updatePrice);
}

export default priceSaga;