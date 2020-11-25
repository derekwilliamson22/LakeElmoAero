import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// fetches appointments to display in admin page
function* fetchAppointmentSaga() {
  let response = yield axios({
    method: 'GET',
    url: '/appointment',
  });
  yield put({
    type: 'SET_APPOINTMENT',
    payload: response.data,
  });
}

function* completeAppointmentSaga(action) {
  yield axios({
    method: 'PUT',
    url: action.url
  });
  yield put({
    type: "FETCH_APPOINTMENT"
  });
}

function* fetchExcludedTimesSaga(action) {
    
  let response = yield axios({
    method: 'GET',
    url: '/appointment/times',
    params: action.payload
  });
  
  yield put({
    type: 'SET_EXCLUDED_TIMES',
    payload: response.data,
  });
}


function* appointmentSaga() {
  yield takeLatest('FETCH_APPOINTMENT', fetchAppointmentSaga);
  yield takeLatest('COMPLETE_APPOINTMENT', completeAppointmentSaga);
  yield takeLatest('FETCH_EXCLUDED_TIMES', fetchExcludedTimesSaga);
}

export default appointmentSaga;