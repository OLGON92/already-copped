import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
  return (
    <>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type='text'
          name='title'
          placeholder='Item Name' 
          required />
        <input
          type='text'
          name='description'
          placeholder='Item Description' 
          required/>
        <input
          type='number'
          name='quantity'
          placeholder='Item Quantity' 
          required />
        <input
          type='number'
          name='price'
          placeholder='Item Price' 
          required/>
        <button type='submit'>{props.buttonText}</button>
      </form>
    </>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;