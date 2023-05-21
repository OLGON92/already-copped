import React, { useEffect, useState } from "react";
import NewListingForm from "./NewListingForm";
import ListingList from "./ListingList";
import ListingDetail from "./ListingDetail";
import EditListingForm from "./EditListingForm";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "../supabase";
import { formatDistanceToNow } from "date-fns";

function ListingControl() {

      const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
      const [mainListingList, setMainListingList] = useState([]);
      const [selectedListing, setSelectedListing] = useState(null);
      const [editing, setEditing] = useState(false);
      const [error, setError] = useState(null);
      
      useEffect(() => {
        const fetchListings = async () => {
          try {
          const { data: listings, error } = await supabase.from("listings").select("*").order("created_at");

          if (error) {
            setError(error.message);
          } else {
            const formattedListings = listings.map((listing) => ({
              ...listing,
              created_at: new Date(listing.created_at),
              formattedWaitTime: formatDistanceToNow(new Date (listing.created_at)),
            }));
            setMainListingList(formattedListings);
          }
        } catch (error) {
          setError(error.message);
        }
      };

      fetchListings();

      const subscription = supabase
        .from("listings")
        .on("*", () =>{
          fetchListings();
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }, []);

    useEffect(() => {
      const updateListingElapsedWaitTime = () => {
        const newMainListingList = mainListingList.map((listing) => ({
          ...listing,
          formattedWaitTime: formatDistanceToNow(new Date(listing.created_at)),
        }));
        setMainListingList(newMainListingList);
      };
      const waitTimeUpdateTimer = setInterval(updateListingElapsedWaitTime, 6000);

      return () => {
        clearInterval(waitTimeUpdateTimer);
    };
  }, [mainListingList]);

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

  const handleEditClick= () => {
    setEditing(true);
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
        <button onClick={this.handleClick}>{buttonText}</button>
      </>
    );
  
}   

export default ListingControl;