import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

function EditListingForm (props) {
  const { listing } = props;

  function handleEditListingFormSubmission(event) {
    event.preventDefault();
    props.onEditListing({
      title: event.target.title.value, 
      description: event.target.description.value, 
      quantity: parseInt(event.target.quantity.value), 
      price: parseInt(event.target.price.value), 
      id: listing.id
    });
  }

  return (
    <>
      <ReusableForm
        formSubmissionHandler={handleEditListingFormSubmission}
        buttonText="Update Item" />
    </>
  );
}

EditListingForm.propTypes = {
  onEditListing: PropTypes.func,
  listing: PropTypes.object
};

export default EditListingForm;