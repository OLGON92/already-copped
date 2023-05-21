import React, { useEffect, useState } from "react";
import NewListingForm from "./NewListingForm";
import ListingList from "./ListingList";
import ListingDetail from "./ListingDetail";
import EditListingForm from "./EditListingForm";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "../supabase";



function ListingControl() {

      const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
      const [mainListingList, setMainListingList] = useState([]);
      const [selectedListing, setSelectedListing] = useState(null);
      const [editing, setEditing] = useState(false);
      const [error, setError] = useState(null);
      //const { user } = useAuth();
      
  
      useEffect(() => {
        const fetchListings = async () => {
          try {
            const { data: listings, error } = await supabase
              .from("listings")
              .select("*");
    
            if (error) {
              setError(error.message);
            } else {
              setMainListingList(listings);
            }
          } catch (error) {
            setError(error.message);
          }
        };
    
        fetchListings();
      }, []);
    

  const handleClick = () => {
    if (selectedListing != null) {
      setFormVisibleOnPage(false);
      setSelectedListing(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  };

  const handleAddingNewListingToList = async (newListingData) => {
    try {
      await supabase.from("listings").insert(newListingData);
      setFormVisibleOnPage(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChangingSelectedListing = (id) => {
    const selectedListing = mainListingList.filter((listing) => listing.id === id)[0];
    setSelectedListing(selectedListing); 
  };

  const handleDeletingListing = async (id) => {
    try {
      await supabase.from("listings").delete().match({ id: id });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditClick = (id) => {
    const selectedListing = mainListingList.find((listing) => listing.id === id);
    setEditing(true);
    setSelectedListing(selectedListing);
  };

  const handleEditingListingInList = async (listingToEdit) => {
    try {
      await supabase.from("listings").update(listingToEdit).match({ id: listingToEdit.id });
      setEditing(false);
      setSelectedListing(null);
    } catch (error) {
      setError(error.message);
    }
  };
    

    let currentlyVisibleState = null;
    let buttonText = null;

    if (error) {
      currentlyVisibleState = <React.Fragment>Error: {error.message}</React.Fragment>
    } else if(editing) {
      currentlyVisibleState = 
      <EditListingForm
        listing = {selectedListing}
        onEditListing = {handleEditingListingInList} />
        buttonText = "Return to List";
    } else if (selectedListing != null) {
      currentlyVisibleState =
      <ListingDetail
        listing = {selectedListing}
        onClickingDelete = {handleDeletingListing}
        onClickingEdit = {handleEditClick} />
        buttonText = "Return to List";
    }
    else if (formVisibleOnPage) {
      currentlyVisibleState =
      <NewListingForm
        onNewListingCreation = {handleAddingNewListingToList} />
        buttonText = "Return to List";
    } else {
      currentlyVisibleState =
      <ListingList
        listingList = {mainListingList}
        onListingSelection = {handleChangingSelectedListing} />;
        buttonText = "Add Item";
    }

    return (
      <> 
        {currentlyVisibleState}
        {error ? null : <button onClick={handleClick}>{buttonText}</button>}
      </>
    );
}   

export default ListingControl;