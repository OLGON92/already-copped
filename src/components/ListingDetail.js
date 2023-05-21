import React from "react";
import PropTypes from "prop-types";

function ListingDetail(props) {
  const { listing, onClickingDelete } = props;

  return (
    <>
      <h1>Listing Detail</h1>
      <h3>Name of Item: {listing.title}</h3>
      <p>Description of Item: {listing.description}</p>
      <p>Quantity: {listing.quantity}</p>
      <p>Price of Item: {listing.price}</p>
      <button onClick={ props.onClickingEdit }>Update Item</button>
      <button onClick={()=> onClickingDelete(listing.id) }>Delete Item</button>
      <hr/>
    </>
  );
}

ListingDetail.propTypes = {
  listing: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default ListingDetail;
