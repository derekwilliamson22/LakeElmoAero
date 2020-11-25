import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatISO, format } from "date-fns";
import moment from "moment";

//Style Imports
import "./JetAFuelForm.css";
import MaskedInput from "react-text-mask";
import oil from "./images/oil.svg";
import one from "../images/one.svg";
import two from "../images/two.svg";
import three from "../images/three.svg";
import four from "../images/four.svg";
import calendar from "../images/calendar.svg";

function JetAFuelForm(props) {
  //For Input Validation
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [oilError, setOilError] = useState("");
  const [fuelError, setFuelError] = useState("");
  const [servicesError, setServicesError] = useState("");
  const [tailError, setTailError] = useState("");

  //For rendering form fields
  const [oilIsChecked, setOilIsChecked] = useState(false);

  //For Data Fields
  const newAppointment = useSelector((state) => state.newAppointment);
  const [firstName, setFirstName] = useState(newAppointment.first);
  const [lastName, setLastName] = useState(newAppointment.last);
  const [phoneNum, setPhoneNum] = useState(newAppointment.phone);
  const [email, setEmail] = useState(newAppointment.email);
  const [tail, setTail] = useState(newAppointment.tail);
  const [fuelQty, setFuelQty] = useState(newAppointment.fuel_qty);
  const [oilType, setOilType] = useState(newAppointment.oil_type);
  const [oilQty, setOilQty] = useState(newAppointment.oil_qty);
  const [addService, setAddService] = useState(newAppointment.additional_serv);
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();

  //Custom Date Selector
  const ApptPicker = ({ value, onClick }) => (
    <div className="flex btn-light" onClick={onClick}>
      <p className="text-bold text-color">Click To Select</p>
      <img src={calendar} alt="calendar" className="m-2 step-icon" />
    </div>
  );

  //Handles the setting of each state and resets error fields.
  const handleEmail = (event) => {
    setEmail(event);
    setEmailError("");
  };

  const handleFirstName = (event) => {
    setFirstName(event);
    setFirstNameError("");
  };

  const handleOilType = (event) => {
    setOilType(event);
    setOilError("");
  };

  const handleOilQty = (event) => {
    setOilQty(event);
    setOilError("");
  };

  //Handles the setting of each state and resets error fields.
  const handleTail = (event) => {
    setTail(event);
    setTailError("");
  };

  //Handles whether or not the Oil Checkbox is marked, and resets any errors that may have occurred.
  const oilStatus = () => {
    setOilIsChecked(oilIsChecked === false ? true : false);

    if (oilError) {
      setOilError(""); // removes error message if conditions are met
    }
  };

  // Determines if there are any issues with required fields. If no, it returns true.
  const validateContactForm = () => {
    if (!email.includes("@")) {
      setEmailError("Invalid Email Format");
    }

    if (!firstName) {
      setFirstNameError("First Name Cannot Be Blank");
    }

    if (!tail) {
      setTailError("Please Enter Tail Number");
    }

    if (!email.includes("@") || !firstName || !tail) {
      console.log("Input Field Error");
      return false;
    }

    return true;
  };

  const validateOilForm = () => {
    console.log("in validateOilForms");

    //If Oil is checked, but no Qty or Type, add this error
    if (
      oilIsChecked &&
      (oilType === "Choose..." || oilQty === 0 || oilQty === "Choose...")
    ) {
      setOilError("Please Confirm Oil Type and Quantity");
      return false;
    }

    return true;
  };

  // Confirms if ANY service is selected. If not, returns false;
  const validateServices = () => {
    //If Oil and Fuel are NOT checked, and addService is null, add this error
    if (!oilIsChecked && fuelQty === "0") {
      setServicesError("Please Confirm Services Needed");
      console.log("No Services Selected");
      return false;
    }

    return true;
  };

  //If Forms are validated, addDetails is triggered
  const onSubmit = () => {
    const serviceIsValid = validateServices();
    const contactIsValid = validateContactForm();
    const oilIsValid = validateOilForm();

    if (serviceIsValid && contactIsValid && oilIsValid) {
      addDetails();
      props.history.push("/ReviewSubmitJetA");
      console.log("FORM IS VALID");
    }
  };

  const formattedDateTime = formatISO(startDate);
  const createdDate = formatISO(new Date());
  const displayDate = format(new Date(), "MM/dd/yyyy HH:mm");
  const emailApptDate = format(new Date(startDate), "MM/dd/yyyy HH:mm");
  const addDetails = () => {
    const fuelType = "Jet A";
    const newAddService = addService === "" ? "None" : addService;
    dispatch({
      type: "SET_FIRST",
      payload: firstName,
    });
    dispatch({
      type: "SET_LAST",
      payload: lastName,
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
      type: "SET_FUEL_TYPE",
      payload: fuelType,
    });
    dispatch({
      type: "SET_FUEL_QTY",
      payload: `${fuelQty}gal`,
    });
    dispatch({
      type: "SET_OIL_TYPE",
      payload: oilType,
    });
    dispatch({
      type: "SET_OIL_QTY",
      payload: oilQty,
    });
    dispatch({
      type: "SET_APPT_DATE",
      payload: formattedDateTime,
    });
    dispatch({
      type: "SET_ADD_SERV",
      payload: newAddService,
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
    <div className="container">
      <div className="step-one">
        <div className="row">
          <section className="col">
            <div className="step-display mb-3 mt-2">
              <img src={one} alt="one" className="m-2 step-icon" />
              <p className="lead text-bold">What Services Do You Need?</p>
            </div>
            <div className="card mb-4">
              <p className="lead ml-1">Jet A Fuel</p>
              <div className="form-group w-50 services-flex align-center">
                <input
                  className="form-control"
                  type="number"
                  aria-label="Dollar amount (with dot and two decimal places)"
                  value={fuelQty}
                  onChange={(event) => setFuelQty(event.target.value)}
                />
                <label for="gallons">Gallons</label>
              </div>

              {/* OIL SERVICE MENU */}
              <div>
                <div className="service-menu col">
                  <div className="service-selector">
                    <div className="service-checkbox">
                      <input
                        className={`${oilError ? "is-invalid" : ""}`}
                        type="checkbox"
                        onChange={() => oilStatus()}
                      />
                      <p className="lead text-bold ml-1">Oil</p>
                      <div className="invalid-feedback ml-2">{oilError}</div>
                    </div>
                    <img src={oil} alt="oil" className="oil-icon mr-2" />
                  </div>
                  <form
                    className={`service-fields m-3 ${
                      oilIsChecked === false ? "hidden" : ""
                    }`}
                  >
                    <div className="form-row">
                      <div className="form-group">
                        <label for="oilType">Oil Type</label>
                        <select
                          className="form-control"
                          id="oilType"
                          value={oilType}
                          onChange={(event) =>
                            handleOilType(event.target.value)
                          }
                        >
                          <option selected>Choose...</option>
                          <option value="Aero Shell 15W50">
                            Aero Shell 15W50
                          </option>
                          <option value="Philips 20W50">Philips 20W50</option>
                        </select>
                      </div>
                      <div className="form-group ml-2">
                        <label for="quantity">Quantity</label>
                        <select
                          className="form-control"
                          id="quantity"
                          value={oilQty}
                          onChange={(event) => handleOilQty(event.target.value)}
                        >
                          <option selected>Quarts...</option>
                          <option value="1">1 qt</option>
                          <option value="2">2 qts</option>
                          <option value="3">3 qts</option>
                          <option value="4">4 qts</option>
                          <option value="5">5 qts</option>
                        </select>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* Additional Service Details */}
              <section>
                <p className="lead">Additional Service Details</p>
                <div class="input-group">
                  <textarea
                    className={`form-control ${
                      servicesError ? "is-invalid" : ""
                    }`}
                    aria-label="With textarea"
                    value={addService}
                    onChange={(event) => setAddService(event.target.value)}
                  ></textarea>
                  <div className="invalid-feedback">{servicesError}</div>
                </div>
              </section>
            </div>
          </section>

          <div className="col">
            {/* About Jet A Fuel Service */}
            <section className="mb-5">
              <p className="md text-color ">24-Hour Service</p>
              <div className="">
                <p>
                  Our round-the-clock Jet Refueling Services make it easy to
                  keep you on schedule.
                </p>
              </div>
            </section>
            {/* Appointment Time */}
            <section className="col">
              <div className="step-display mb-3">
                <img src={three} alt="three" className="m-2 step-icon" />
                <p className="lead text-bold">
                  Select Your Service Date And Time
                </p>
              </div>
              <div className="card ">
                <DatePicker
                  todayButton="Today"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  minDate={new Date()}
                  showTimeSelect
                  timeIntervals={1}
                  dateFormat="MM/dd/yyyy HH:mm"
                  timeFormat="HH:mm"
                  customInput={<ApptPicker />}
                />

                <div className="flex">
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
          </div>
        </div>

        <div className="row">
          {/* Aircraft Details */}
          <section className="col mr-5">
            <div className="step-display mb-3 mt-2">
              <img src={two} alt="two" className="m-2 step-icon" />
              <p className="lead text-bold">Confirm Your Aircraft Details</p>
            </div>
            <div className="card mb-4">
              <div>
                <p className="lead">Tail Number *</p>
                <div className="form-groupmt-3 flex">
                  <label className="md" for="nNumber">
                    N
                  </label>
                  <input
                    className={`form-control ${tailError ? "is-invalid" : ""}`}
                    id="nNumber"
                    type="text"
                    value={tail}
                    onChange={(event) => handleTail(event.target.value)}
                    placeholder="number"
                  />
                  <div className="invalid-feedback">{tailError}</div>
                </div>
              </div>
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
                    {/* <label for="phone">Phone</label> */}
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

        <div>
          <div className="services-flex align-center btn-grouping mt-4">
            <Link to="/">
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
    </div>
  );
}

export default JetAFuelForm;
