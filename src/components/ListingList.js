import React from "react";
import Listing from "./Listing";
import PropTypes from "prop-types";

function ListingList(props) {
  return (
    <>
      <hr/>
      {props.listingList.map((listing) =>
        <Listing
          whenListingClicked = { props.onListingSelection }
          title={listing.title}
          description={listing.description}
          quantity={listing.quantity}
          price={listing.price}
          formattedWaitTime={listing.formattedWaitTime}
          id={listing.id}
          key={listing.id}/>
      )}
    </>
  );
}

ListingList.propTypes = {
  listingList: PropTypes.array,
  onListingSelection: PropTypes.func
};

export default ListingList;