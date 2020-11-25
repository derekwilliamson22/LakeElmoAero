import { takeLatest } from "redux-saga/effects";
import axios from "axios";

function* createAppointment(action) {
  yield axios({
    method: 'POST',
    url: '/appointment',
    data: action.payload
  });
}

function* createAppointmentSaga() {
  yield takeLatest('CREATE_APPOINTMENT', createAppointment);
}

export default createAppointmentSaga;