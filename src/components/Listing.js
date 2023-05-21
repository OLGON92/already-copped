import React from "react";
import PropTypes from "prop-types";

function Listing(props) {
  return (
    <>
      <div onClick = {() => props.whenListingClicked(props.id)}>
        <h3>Name of Item: {props.title}</h3>
        <p>Description of Item: {props.description}</p>
        <p>Quantity: {props.quantity}</p>
        <p>Price of Item: {props.price}</p>
      </div>
    </>
  );
}

Listing.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  id: PropTypes.string,
  whenListingClicked: PropTypes.func
};

export default Listing;