function addExercise(currentNumOfExRows, addExButton, isExExpanded, allExDetails) {
   currentNumOfExRows++;
   const currentExID = currentNumOfExRows;
   // Capture and create the clone of the new row that you intend to insert.
   const newExTemplate = document.getElementById("exNewRowTemplate");
   const clone = newExTemplate.cloneNode(true);

   // Change the clone's properties.
   clone.id = `Row${currentExID}`;
   const newExName = clone.querySelector(`.exName`).querySelector("p");
   newExName.innerText = `Exercise #${currentExID + 1}`;

   // Insert the clone in the DOM.
   const main = addExButton.parentElement.parentElement.parentElement;
   main.insertBefore(clone, addExButton.parentElement.parentElement);

   // Update global vars.
   isExExpanded.push(false);
   allExDetails = updateExDetails(currentExID, allExDetails, null, null, "AddEx");

   return [currentNumOfExRows, isExExpanded, allExDetails];
}

function delExercise(currentNumOfExRows, delExButton, isExExpanded, allExDetails) {
   // Delete row from the DOM.
   const exRowToBeDeleted = delExButton.parentElement.parentElement;
   const currentExID = parseInt(exRowToBeDeleted.id.substring(3));
   exRowToBeDeleted.remove();

   // In case the ex to be removed is currently expanded.
   if (isExExpanded[currentExID]) {
      const currentExExpandedSets = document.querySelector(`#expandedRow${currentExID}`);
      currentExExpandedSets.remove();
   }

   // Update global vars.
   currentNumOfExRows--;
   allExDetails = updateExDetails(currentExID, allExDetails, null, null, "DelEx");
   isExExpanded.splice(`${currentExID}`, 1);

   return [currentNumOfExRows, isExExpanded, allExDetails];
}

// ✓✓✓

// surely add functionality to ask you if you REALLY want to delete.
// also functionality in settings that will allow you to delete with no prompt.
