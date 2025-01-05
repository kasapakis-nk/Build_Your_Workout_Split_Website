// maybe add functionality to ask you if you REALLY want to delete.
// also functionality in settings that will allow you to delete with no prompt.

function delSet(delCurrentSetDiv, allExDetails) {
   // Delete set from the DOM.
   const setRowToBeDeleted = delCurrentSetDiv.parentElement;
   const currentExID = parseInt(setRowToBeDeleted.parentElement.id.substring(11));
   const currentSetID = getSetID(delCurrentSetDiv, currentExID);
   setRowToBeDeleted.remove();

   // Update global vars.
   allExDetails = updateSetDetails(
      currentExID,
      currentSetID,
      allExDetails,
      null,
      "DelSet"
   );

   return allExDetails;
}
