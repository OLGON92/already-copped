import React from "react";
import PropTypes from "prop-types";

function ItemDetail(props) {
  const { item, onClickingDelete } = props;

  return (
    <>
      <h1>Item Detail</h1>
      <h3>Name of Item: {item.name}</h3>
      <p>Description of Item: {item.description}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Price of Item: {item.price}</p>
      <button onClick={ props.onClickingEdit }>Update Item</button>
      <button onClick={()=> onClickingDelete(item.id) }>Delete Item</button>
      <hr/>
    </>
  );
}

ItemDetail.propTypes = {
  item: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default ItemDetail;
