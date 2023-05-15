import React from "react";
import PropTypes from "prop-types";

function Item(props) {
  return (
    <>
      <div onClick = {() => props.whenItemClicked(props.id)}>
        <h3>Name of Item: {props.name}</h3>
        <p>Description of Item: {props.description}</p>
        <p>Quantity: {props.quantity}</p>
        <p>Price of Item: {props.price}</p>
      </div>
    </>
  );
}

Item.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  id: PropTypes.string,
  whenItemClicked: PropTypes.func
};

export default Item;