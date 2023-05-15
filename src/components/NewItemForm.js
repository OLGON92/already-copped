import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { v4 } from "uuid";

function NewItemForm(props) {

  function handleNewItemFormSubmission(event) {
    event.preventDefault();
    props.onNewItemCreation({
      name: event.target.name.value, 
      description: event.target.description.value, 
      quantity: event.target.quantity.value, 
      price: parseInt(event.target.price.value), 
      id: v4()
    });
  }

  return (
    <>
      <ReusableForm
        formSubmissionHandler={handleNewItemFormSubmission}
        buttonText="Add Item" />
    </>
  );
}

NewItemForm.propTypes = {
  onNewItemCreation: PropTypes.func
};

export default NewItemForm;