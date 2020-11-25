import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getHours,
  getMinutes,
  getDate,
  getMonth,
  getYear,
} from "date-fns";

//Style Imports
import { useSpring, animated } from "react-spring";
import five from "../images/five.svg";

function ReviewSubmitJetA() {
  //For Animation
  const trans = useSpring({ opacity: 1, from: { opacity: 0 } });

  const newAppointment = useSelector((state) => state.newAppointment);
  const dispatch = useDispatch();

  // working out date for display from service form and datepicker
  // assisted by https://stackoverflow.com/questions/25159330/convert-an-iso-date-to-the-date-format-yyyy-mm-dd-in-javascript
  //const displayDate = (parseISO(newAppointment.appointment_date));
  const date = new Date(newAppointment.appointment_date);
  const year = getYear(date);
  const month = getMonth(date) + 1;
  const dt = getDate(date);
  const hour = getHours(date);
  const minutes = getMinutes(date);

  const displayDate =
    (month < 10 ? "0" + month : month) +
    "/" +
    (dt < 10 ? "0" + dt : dt) +
    "/" +
    (year < 10 ? "0" + year : year) +
    " " +
    (hour < 10 ? "0" + hour : hour) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes);

  const createAppointment = () => {
    dispatch({
      type: "CREATE_APPOINTMENT",
      payload: newAppointment,
    });
    dispatch({
      type: "SEND_CONFIRM",
      url: "/email-confirm",
      payload: newAppointment,
    });
    dispatch({
      type: "SEND_ADMIN",
      url: "/email-admin",
      payload: newAppointment,
    });
    dispatch({
      type: "SEND_ALERT_ONE",
      url: "/sms-alert-one",
      payload: newAppointment,
    });
    dispatch({
      type: "SEND_ALERT_TWO",
      url: "/sms-alert-two",
      payload: newAppointment,
    });
    dispatch({
      type: "SEND_ALERT_THREE",
      url: "/sms-alert-three",
      payload: newAppointment,
    });
    dispatch({
      type: "SET_RESET",
    });
  };

  return (
    <animated.div style={trans}>
      <div className="step-one">
        <section className="container">
          <div className="step-display mb-3">
            <img src={five} alt="five" className="m-2 step-icon" />
            <p className="lead text-bold">Review Your Appointment Details</p>
          </div>
          <div className="card">
            <p className="lead text-bold text-color">Requested Services</p>
            <div className="row">
              <section className="col-md-3">
                <p className="lead text-bold">Fuel</p>
                <p className="sm text-lighter ">
                  Volume: {newAppointment.fuel_qty}
                </p>
              </section>
              <section className="col-md-3">
                <p className="lead text-bold">Oil</p>
                <p className="sm text-lighter ">
                  Type: {newAppointment.oil_type}
                </p>
                <p className="sm text-lighter ">
                  Amount: {newAppointment.oil_qty}qts
                </p>
              </section>
              <section className="col-md-3">
                <p className="lead ">Additional Details</p>
                <p className="sm text-lighter ">
                  {newAppointment.additional_serv}
                </p>
              </section>
            </div>
          </div>

          <hr />
          <div className="card">
            <p className="lead text-bold text-color">Appointment Details</p>
            <div className="row">
              <section className="col-md-3">
                <p className="lead">Service Date</p>
                <p className="sm text-lighter ">{displayDate}</p>
              </section>
              <section className="col-md-3">
                <p className="lead">Aircraft Details</p>
                <p className="sm text-lighter ">
                  Tail Number: N{newAppointment.tail}
                </p>
              </section>
              <section className="col-md-3">
                <p className="lead">Contact Information</p>
                <p className="sm text-lighter ">
                  Full Name: {newAppointment.first} {newAppointment.last}
                </p>
                <p className="sm text-lighter ">
                  Phone: {newAppointment.phone}
                </p>
                <p className="sm">Email: {newAppointment.email}</p>
              </section>
            </div>
          </div>

          <div className="services-flex align-center btn-grouping mt-4">
            <Link to="/JetAService">
              <button className="btn-outline text-color lead text-bold pl-3">
                Back
              </button>
            </Link>
            <Link to="/ApptSuccess">
              <button className="btn" onClick={createAppointment}>
                Submit Your Service Request!
              </button>
            </Link>
          </div>
        </section>
      </div>
    </animated.div>
  );
}
export default ReviewSubmitJetA;
