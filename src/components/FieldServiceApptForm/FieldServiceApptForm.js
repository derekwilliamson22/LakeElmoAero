import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  setHours,
  setMinutes,
  formatISO,
  format,
  addDays,
  subMinutes,
  addMinutes,
} from "date-fns";
import moment from "moment";


// Style Imports
import "./FieldServiceApptForm.css";
import { useSpring, animated } from "react-spring";
import MaskedInput from "react-text-mask";
import two from "../images/two.svg";
import three from "../images/three.svg";
import four from "../images/four.svg";
import calendar from "../images/calendar.svg";

function FieldServiceApptForm(props) {
  //For Animation
  const trans = useSpring({ opacity: 1, from: { opacity: 0 } });

  //For Input Validation
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [tailError, setTailError] = useState("");
  const [hangarNumError, setHangarNumError] = useState("");
  const [hangarAccessError, setHangarAccessError] = useState("");
  const [doorCodeError, setDoorCodeError] = useState("");
  const [doorCodeIsActive, setDoorCodeIsActive] = useState(false);

  // For Data Fields
  const newAppointment = useSelector((state) => state.newAppointment);
  const unavailableTimes = useSelector((state) => state.unavailableTimes);
  const [firstName, setFirstName] = useState(newAppointment.first);
  const [lastName, setLastName] = useState(newAppointment.last);
  const [hangarNum, setHangarNum] = useState(newAppointment.hangar_num);
  const [phoneNum, setPhoneNum] = useState(newAppointment.phone);
  const [email, setEmail] = useState(newAppointment.email);
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [tail, setTail] = useState(newAppointment.tail);
  const [hangarAccess, setHangarAccess] = useState(
    newAppointment.hangar_access
  );
  const [aircraftLocation, setAircraftLocation] = useState("Aero");
  const [doorCode, setDoorCode] = useState("");
  const [addComm, setAddComm] = useState(newAppointment.additional_comm);

  const dispatch = useDispatch();

  //Custom Date Selector
  const ApptPicker = ({ value, onClick }) => (
    <div className="flex btn-light" onClick={onClick}>
      <p className="text-bold text-color">Click To Select</p>
      <img src={calendar} alt="calendar" className="m-2 step-icon" />
    </div>
  );

  const formattedDateTime = formatISO(startDateTime);
  const createdDate = formatISO(new Date());
  const displayDate = format(new Date(), "MM/dd/yyyy HH:mm");
  const emailApptDate = format(new Date(startDateTime), "MM/dd/yyyy HH:mm");
  const reducedDateTime = formatISO(startDateTime, { representation: "date" });
  const dateOne = reducedDateTime;
  const dateTwo = formatISO(addDays(startDateTime, 1), {
    representation: "date",
  });

  useEffect(() => {
    setStartDateTime(startDateTime);
    dispatch({
      type: "FETCH_EXCLUDED_TIMES",
      payload: {
        dateOne: dateOne,
        dateTwo: dateTwo,
      },
    });
  }, [startDateTime]);

  let baseTimes = unavailableTimes.map((item) => {
    return new Date(item.appointment_date);
  });

  let subTimes = unavailableTimes.map((item) => {
    return subMinutes(new Date(item.appointment_date), 15);
  });

  let addTimes = unavailableTimes.map((item) => {
    return addMinutes(new Date(item.appointment_date), 15);
  });

  let omittedTimes = baseTimes.concat(subTimes, addTimes);

  // a fancy way to do the above 
//   let omittedTimes = unavailableTimes.reduce((times, appt) => {
//   let apptDate = new Date(appt.appointment_date);
//   return times.concat([
//     apptDate,
//     subMinutes(apptDate, 15),
//     addMinutes(apptDate, 15),
//   ]);
// }, []);

  //Handles the setting of each state and resets error fields.
  const handleEmail = (event) => {
    setEmail(event);
    setEmailError(""); // resets error message to empty string; removing the error-related css classes.
  };

  const handleFirstName = (event) => {
    setFirstName(event);
    setFirstNameError("");
  };

  //Handles the setting of each state and resets error fields.
  const handleTail = (event) => {
    setTail(event);
    setTailError("");
  };

  //Handles the location of the aircraft; Lake Elmo Aero or Elsewhere
  const handleLocationChange = (event) => {
    console.log("in handleLocationChange with:", event);
    setAircraftLocation(event);

    if (event === "Aero") {
      setHangarNum("Lake Elmo Aero");
      setHangarAccess("Lake Elmo Aero Has Access");
    } else {
      setHangarNum(""); // hangarNum input field populates with hangarNum. If aircraft location is elsewhere, this clears the input field
      setHangarAccess(""); // resets Hangar Access
    }
  };

  const handleHangarNum = (event) => {
    setHangarNum(event);
    setHangarNumError("");
  };

  //Also sets the Door Code active status. If Event matches "Door Code", Door Code is set to Active, which helps with form validation.
  const handleHangarAccess = (event) => {
    console.log("handleHangar is:", event);

    if (event === "Door Code") {
      setHangarAccess(event);
      setDoorCodeIsActive(true);
    } else {
      setHangarAccess(event);
      setHangarAccessError("");
      setDoorCodeIsActive(false);
    }
  };

  console.log("doorCodeIsActive:", doorCodeIsActive);

  const handleDoorCode = (event) => {
    setDoorCode(event);
    setDoorCodeError("");
  };

  //Test Logs
  console.log("doorCodeIsActive:", doorCodeIsActive);
  console.log("hangarNum is:", hangarNum);
  console.log("hangarAccess is:", hangarAccess);

  // Determines if there are any issues with required fields. If no, it returns true.
  const validateForms = () => {
    if (!email.includes("@")) {
      setEmailError("Invalid Email Format");
    }

    if (!firstName) {
      setFirstNameError("First Name Cannot Be Blank");
    }

    if (!tail) {
      setTailError("Please Enter Tail Number");
    }

    if (!hangarNum) {
      setHangarNumError("Hangar Number Must Be Included");
    }

    if (!hangarAccess) {
      setHangarAccessError("Please Specify Hangar Access");
    }

    if (doorCodeIsActive && !doorCode) {
      setDoorCodeError("Please Enter Door Code");
    }

    if (
      !email.includes("@") ||
      !firstName ||
      !hangarNum ||
      !hangarAccess ||
      !tail ||
      (doorCodeIsActive && !doorCode)
    ) {
      console.log("Input Field Error");
      console.log("doorCodeError:", doorCodeError);
      return false;
    }

    return true;
  };

  //If Forms are validated, addDetails is triggered
  const onSubmit = () => {
    const isValid = validateForms();

    if (isValid) {
      addDetails();
      props.history.push("/ReviewSubmit");

      console.log("doorCodeIsActive:", doorCodeIsActive);
    }
  };

  // Dispatches form details
  // the newAppointment object is built in the createAppointment reducer
  const addDetails = () => {
    const newHangarAccess =
      hangarAccess === "Door Code" ? `Door Code: ${doorCode}` : hangarAccess;
    const newAddComm = addComm === "" ? "None" : addComm;
    dispatch({
      type: "SET_FIRST",
      payload: firstName,
    });
    dispatch({
      type: "SET_LAST",
      payload: lastName,
    });
    dispatch({
      type: "SET_HANGAR_NUM",
      payload: hangarNum,
    });
    dispatch({
      type: "SET_PHONE",
      payload: phoneNum,
    });
    dispatch({
      type: "SET_EMAIL",
      payload: email,
    });
    dispatch({
      type: "SET_APPT_DATE",
      payload: formattedDateTime,
    });
    dispatch({
      type: "SET_HANGAR_ACCESS",
      payload: newHangarAccess,
    });
    dispatch({
      type: "SET_ADD_COMM",
      payload: newAddComm,
    });
    dispatch({
      type: "SET_CREATED_DATE",
      payload: createdDate,
    });
    dispatch({
      type: "SET_DISPLAY_DATE",
      payload: displayDate,
    });
    dispatch({
      type: "SET_EMAIL_DATE",
      payload: emailApptDate,
    });

    dispatch({
      type: "SET_TAIL",
      payload: tail,
    });
  };

  return (
    <animated.div style={trans}>
      <div className="container">
        <div className="step-one">
          <div className="row mb-5">
            <section className="col">
              <div className="step-display mb-3 mt-2">
                <img src={two} alt="two" className="m-2 step-icon" />
                <p className="lead text-bold">
                  Select Your Service Date And Time
                </p>
              </div>
              <div className="card mb-4">
                <DatePicker
                  todayButton="Today"
                  selected={startDateTime}
                  onChange={(datetime) => setStartDateTime(datetime)}
                  minDate={new Date()}
                  showTimeSelect
                  timeIntervals={15}
                  minTime={setHours(setMinutes(new Date(), 0), 7)}
                  maxTime={setHours(setMinutes(new Date(), 0), 19)}
                  excludeTimes={omittedTimes}
                  timeCaption="Time"
                  dateFormat="MM/dd/yyyy HH:mm"
                  timeFormat="HH:mm"
                  customInput={<ApptPicker />}
                />

                <div className="flex">
                  {/* <p>You've Selected</p> */}
                  <p className="p-1">
                    {moment(formattedDateTime).format("MM/DD/YYYY")}
                  </p>
                  <p className="p-1">At</p>
                  <p className="p-1">
                    {moment(formattedDateTime).format("HH:mm")}
                  </p>
                </div>
              </div>
            </section>

            <div className="col">
              <p className="md text-color ">Ready For Takeoff</p>
              <div className="">
                <p>
                  {" "}
                  Our extended service hours make it easy to ensure that your
                  aircraft will be ready for takeoff when you are.{" "}
                </p>
                <p className="text-bold">Service Hours:</p>
                <p> 7:00 - 19:00 | Seven Days A Week </p>
              </div>
            </div>
          </div>
          {/* Contact Info section */}
          <div className="row">
            {/* Aircraft Details */}
            <section className="col">
              <div className="step-display mb-3">
                <img src={three} alt="two" className="m-2 step-icon" />
                <p className="lead text-bold">Confirm Your Aircraft Details</p>
              </div>
              <div className="card mb-4">
                <div>
                  <p className="lead">Tail Number *</p>
                  <div className="form-group col-md-10 mt-3 flex">
                    <label className="md" htmlFor="nNumber">
                      N
                    </label>
                    <input
                      className={`form-control ${
                        tailError ? "is-invalid" : ""
                      }`}
                      id="nNumber"
                      type="text"
                      value={tail}
                      onChange={(event) => handleTail(event.target.value)}
                      placeholder="number"
                    />
                    <div className="invalid-feedback">{tailError}</div>
                  </div>
                </div>
                <div>
                  <p className="lead">Aircraft Location *</p>
                  <label>
                    Lake Elmo Aero
                    <input
                      type="radio"
                      name="aircraft-location"
                      className=""
                      value="Aero"
                      onChange={(event) =>
                        handleLocationChange(event.target.value)
                      }
                    />
                  </label>
                  <label>
                    Other Hangar
                    <input
                      type="radio"
                      name="aircraft-location"
                      className=""
                      value="Elsewhere"
                      onChange={(event) =>
                        handleLocationChange(event.target.value)
                      }
                    />
                  </label>
                </div>

                <form
                  className={`${aircraftLocation === "Aero" ? "hidden" : ""}`}
                >
                  <div className="card row">
                    <div className="form-row">
                      <input
                        className={` form-control col-md-8 ${
                          hangarNumError ? "is-invalid" : ""
                        }`}
                        id="hangarNumber"
                        placeholder="Hangar Number *"
                        value={hangarNum}
                        onChange={(event) =>
                          handleHangarNum(event.target.value)
                        }
                      />
                      <div className="invalid-feedback">{hangarNumError}</div>
                    </div>

                    <div className="">
                      <label htmlFor="hangarAccess">
                        How Will We Gain Access? *
                      </label>
                      <select
                        className={` form-control col-md-8 ${
                          hangarAccessError ? "is-invalid" : ""
                        }`}
                        id="hangarAccess"
                        defaultValue="Choose..."
                        value={hangarAccess}
                        onChange={(event) =>
                          handleHangarAccess(event.target.value)
                        }
                      >
                        <option>Choose...</option>
                        <option value="I will be there">I Will Be There</option>
                        <option value="Door Code">Door Code</option>
                        <option value="Lake Elmo Aero has access">
                          Lake Elmo Aero Has Access
                        </option>
                        <option value="Hangar Unlocked">Hangar Unlocked</option>
                      </select>
                      <div className="invalid-feedback">
                        {hangarAccessError}
                      </div>
                    </div>
                    <div className={`${doorCodeIsActive ? "" : "hidden"}`}>
                      <input
                        className={`form-control col-md-8 ${
                          doorCodeError ? "is-invalid" : ""
                        }`}
                        id="hangarAccess"
                        type="text"
                        value={doorCode}
                        onChange={(event) => handleDoorCode(event.target.value)}
                        placeholder="Enter Door Code *"
                      />
                      <div className="invalid-feedback">{doorCodeError}</div>
                    </div>
                  </div>
                </form>

                <form>
                  <div>
                    <section>
                      <p className="lead">Additional Comments</p>
                      <div className="input-group">
                        <textarea
                          className="form-control"
                          aria-label="With textarea"
                          value={addComm}
                          onChange={(event) => setAddComm(event.target.value)}
                        ></textarea>
                      </div>
                    </section>
                  </div>
                </form>
              </div>
            </section>

            {/* Contact Info */}
            <section className="col">
              <div className="step-display mb-3">
                <img src={four} alt="four" className="m-2 step-icon" />
                <p className="lead text-bold">Add Your Contact Information</p>
              </div>
              <form>
                <div className="card mb-4">
                  <div className="form-group col-md-10">
                    <input
                      className={` form-control ${
                        firstNameError ? "is-invalid" : ""
                      }`}
                      id="firstName"
                      type="text"
                      placeholder="First Name *"
                      value={firstName}
                      onChange={(event) => handleFirstName(event.target.value)}
                    />
                    <div className="invalid-feedback">{firstNameError}</div>
                  </div>

                  <div className="form-group col-md-10">
                    {/* <label htmlFor="lastName">Last Name</label> */}
                    <input
                      className="form-control"
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </div>

                  <div className="">
                    <div className="form-group col-md-10">
                      {/* <label htmlFor="email">Email *</label> */}
                      <input
                        className={` form-control ${
                          emailError ? "is-invalid" : ""
                        }`}
                        id="email"
                        type="text"
                        placeholder="Email *"
                        value={email}
                        onChange={(event) => handleEmail(event.target.value)}
                      />
                      <div className="invalid-feedback">{emailError}</div>
                    </div>

                    <div className="form-group col-md-10">
                      {/* <label htmlFor="phone">Phone</label> */}
                      <MaskedInput
                        mask={[
                          "(",
                          /[1-9]/,
                          /\d/,
                          /\d/,
                          ")",
                          " ",
                          /\d/,
                          /\d/,
                          /\d/,
                          "-",
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                        ]}
                        guide={true}
                        // showMask={true}
                        className="form-control"
                        id="phone"
                        type="text"
                        placeholder="Phone"
                        value={phoneNum}
                        onChange={(event) => setPhoneNum(event.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </div>

          <div className="services-flex align-center btn-grouping">
            <Link to="/FieldServiceForm">
              <button className="btn-outline text-color lead text-bold">
                Back
              </button>
            </Link>

            <button className="btn" onClick={onSubmit}>
              Review Your Appointment Details
            </button>
          </div>
        </div>
      </div>
    </animated.div>
  );
}

export default withRouter(FieldServiceApptForm);
