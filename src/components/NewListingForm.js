import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { v4 } from "uuid";
import supabase from "./supabase";

function NewListingForm(props) {

  function handleNewListingFormSubmission(event) {
    event.preventDefault();
    props.onNewListingCreation({
      title: event.target.title.value, 
      description: event.target.description.value, 
      quantity: parseInt(event.target.quantity.value), 
      price: parseInt(event.target.price.value), 
      //image: event.target.image.value,
      //created_at: ascending()
      id: v4()
    });
  }

  return (
    <>
      <ReusableForm
        formSubmissionHandler={handleNewListingFormSubmission}
        buttonText="Add Item" />
    </>
  );
}

NewListingForm.propTypes = {
  onNewListingCreation: PropTypes.func
};

export default NewListingForm;