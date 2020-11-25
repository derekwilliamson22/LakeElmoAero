import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import mapStoreToProps from '../../redux/mapStoreToProps';


function FuelPriceItem(props) {
  const [fuelPrice, setFuelPrice] = useState(props.price.pricePerGal);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch({
      type: "UPDATE_PRICE",
      url: `price/${props.price.id}`,
      payload: { newPrice: fuelPrice }
    });
  }

  return (
    <section className="m-1">
      <p className="lead text-bold">{props.price.type}</p>
      <p className="sm">Current Price: {props.price.pricePerGal}/gal</p>
      <input
        className="sm"
        type='money'
        placeholder='new price/gal'
        value={fuelPrice}
        onChange={(event) => setFuelPrice(event.target.value)}
      />
      <button
        className="btn"
        id="adminBtn"
        onClick={handleSubmit}
      >Change Price
                  </button>
    </section>
  );
}

export default connect(mapStoreToProps)(FuelPriceItem);
