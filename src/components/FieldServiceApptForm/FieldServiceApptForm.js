import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  setHours,
  setMinutes,
  formatISO,
  format,
  addDays,
  getDay,
  subMinutes,
  addMinutes,
} from "date-fns";

// Style Imports
import "./FieldServiceApptForm.css";
import { Button } from "react-bootstrap";
import MaskedInput from "react-text-mask";

function FieldServiceApptForm(props) {
  //For Input Validation
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [hangarNumError, setHangarNumError] = useState("");
  const [hangarAccessError, setHangarAccessError] = useState("");
  const [doorCodeError, setDoorCodeError] = useState("");
  const [doorCodeIsActive, setDoorCodeIsActive] = useState(false);

  const newAppointment = useSelector((state) => state.newAppointment);
  const unavailableTimes = useSelector((state) => state.unavailableTimes);
  const [firstName, setFirstName] = useState(newAppointment.first);
  const [lastName, setLastName] = useState(newAppointment.last);
  const [hangarNum, setHangarNum] = useState(newAppointment.hangar_num);
  const [phoneNum, setPhoneNum] = useState(newAppointment.phone);
  const [email, setEmail] = useState(newAppointment.email);
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [hangarAccess, setHangarAccess] = useState(
    newAppointment.hangar_access
  );
  const [doorCode, setDoorCode] = useState("");
  const [addComm, setAddComm] = useState(newAppointment.additional_comm);

  const dispatch = useDispatch();

  const ExampleCustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      {value}
    </button>
  );
  
  const formattedDateTime = formatISO(startDateTime);
  const createdDate = formatISO(new Date());
  const displayDate = format(new Date(), 'MM/dd/yyyy HH:mm');
  const emailApptDate = format(new Date(startDateTime), 'MM/dd/yyyy HH:mm');
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

  //Handles the setting of each state and resets error fields.
  const handleEmail = (event) => {
    setEmail(event);
    setEmailError(""); // resets error message to empty string; removing the error-related css classes.
  };

  const handleFirstName = (event) => {
    setFirstName(event);
    setFirstNameError("");
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
    }
  };

  console.log("doorCodeIsActive:", doorCodeIsActive);

  const handleDoorCode = (event) => {
    setDoorCode(event);
    setDoorCodeError("");
  };

  // Determines if there are any issues with required fields. If no, it returns true.
  const validateForms = () => {
    if (!email.includes("@")) {
      setEmailError("Invalid Email Format");
    }

    if (!firstName) {
      setFirstNameError("First Name Cannot Be Blank");
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
  const addDetails = () => {
    const newHangarAccess =
      hangarAccess === "Door Code" ? `Door Code: ${doorCode}` : hangarAccess;
    const newAddComm = addComm === '' ? 'None' : addComm;
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
  };

  return (
    <div className="">
      <section className="container">
        <div className="">
          <div>
            <h4>Field Service</h4>
          </div>
          <div>
            <p className="md">N{newAppointment.tail}</p>
            <h3>Appointment Details</h3>
          </div>
          <div>
            <p className="lead">Contact Information</p>
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="firstName">First Name</label>
                  <input
                    className={` form-control ${
                      firstNameError ? "is-invalid" : ""
                    }`}
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) => handleFirstName(event.target.value)}
                  />
                  <div className="invalid-feedback">{firstNameError}</div>
                </div>

                <div className="form-group col-md-6">
                  <label for="lastName">Last Name</label>
                  <input
                    className="form-control"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="email">Email</label>
                  <input
                    className={` form-control ${
                      emailError ? "is-invalid" : ""
                    }`}
                    id="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => handleEmail(event.target.value)}
                  />
                  <div className="invalid-feedback">{emailError}</div>
                </div>

                <div className="form-group col-md-6">
                  <label for="phone">Phone</label>
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
                    showMask={true}
                    className="form-control"
                    id="phone"
                    type="text"
                    placeholder="Phone"
                    value={phoneNum}
                    onChange={(event) => setPhoneNum(event.target.value)}
                  />
                </div>
              </div>
            </form>

            <section>
              <p>Please Select a Date and Time</p>
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
                customInput={<ExampleCustomInput />}
              />
            </section>

            <p className="lead">Hangar Details</p>
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="hangarNumber">Hangar Number</label>
                  <input
                    className={` form-control ${
                      hangarNumError ? "is-invalid" : ""
                    }`}
                    id="hangarNumber"
                    placeholder="Hangar Number"
                    value={hangarNum}
                    onChange={(event) => handleHangarNum(event.target.value)}
                  />
                  <div className="invalid-feedback">{hangarNumError}</div>
                </div>

                <div className="form-group col-md-6">
                  <label for="hangarAccess">How Will We Gain Access?</label>
                  <select
                    className={` form-control ${
                      hangarAccessError ? "is-invalid" : ""
                    }`}
                    id="hangarAccess"
                    defaultValue="Choose..."
                    value={hangarAccess}
                    onChange={(event) => handleHangarAccess(event.target.value)}
                  >
                    <option>Choose...</option>
                    <option value="I will be there">I will be there</option>
                    <option value="Door Code">Door Code</option>
                    <option value="Lake Elmo Aero has access">
                      Lake Elmo Aero has access
                    </option>
                    <option value="Hangar Unlocked">Hangar Unlocked</option>
                  </select>
                  <div className="invalid-feedback">{hangarAccessError}</div>
                </div>
                <div
                  className={`form-group col-md-6 ${
                    doorCodeIsActive ? "" : "hidden"
                  }`}
                >
                  <label for="doorCode">Enter Door Code</label>
                  <input
                    className={`form-control ${
                      doorCodeError ? "is-invalid" : ""
                    }`}
                    id="hangarAccess"
                    type="text"
                    // class="form-control"
                    value={doorCode}
                    onChange={(event) => handleDoorCode(event.target.value)}
                    placeholder="Enter Code"
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
          <div className="flex btn-grouping">
            <div className="btn-grouping">
              <Link to="/FieldServiceForm">
                <Button>Back</Button>
              </Link>
              {/* <Link to="/ReviewSubmit"> */}
              <Button onClick={onSubmit}>Next</Button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default withRouter(FieldServiceApptForm);
