// This is what happens ON-CLICK
function editSetWeight(currentSetWeightDiv, allExDetails) {
   // Prevents error when clicking inside the div while inputting.
   if (currentSetWeightDiv.querySelector("textarea")) return;

   // Create and edit properties of the Text Area element where user inputs new data.
   const setWeightInputTextArea = document.createElement("textarea");
   setWeightInputTextArea.className = `inputTextArea`;
   setWeightInputTextArea.style.textAlign = "center";
   setWeightInputTextArea.style.resize = "none";

   // Keep the current weight the user has input previously.
   let previousSetWeight = currentSetWeightDiv
      .querySelector("p")
      .innerText.match(/^(\d+)/); // This returns a 2x1 array.

   // What the USER SEES when they click, depending on previous weight input.
   if (!Number.isFinite(parseFloat(previousSetWeight))) {
      previousSetWeight = "";
   } else {
      previousSetWeight = previousSetWeight[1];
   }
   setWeightInputTextArea.value = previousSetWeight;

   // Delete previous container and ADD the text area to the DOM.
   currentSetWeightDiv.firstElementChild.remove();
   currentSetWeightDiv.appendChild(setWeightInputTextArea);

   // Style to center input text vertically.
   const setWeightDivHeight = setWeightInputTextArea.parentElement.offsetHeight;
   setWeightInputTextArea.style.paddingTop = `${
      setWeightDivHeight / 2 - 0.007 * window.innerWidth
   }px`;

   // Focus user's cursor on current input text area.
   setWeightInputTextArea.focus();

   // Events to finalize user input.
   // In case of click away (loss of focus - blur event):
   setWeightInputTextArea.addEventListener("blur", function () {
      handleInputSetWeight(
         currentSetWeightDiv,
         setWeightInputTextArea,
         previousSetWeight,
         allExDetails
      );
   });

   // In case of user pressing `Enter` or `Shift-Enter` to finalize input:
   setWeightInputTextArea.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
         handleInputSetWeight(
            currentSetWeightDiv,
            setWeightInputTextArea,
            previousSetWeight,
            allExDetails
         );
      }
   });
}

// This is what happens AFTER the user "blurs" or presses Enter.
function handleInputSetWeight(
   currentSetWeightDiv,
   setWeightInputTextArea,
   previousSetWeight,
   allExDetails
) {
   // Save user's input for set weight.
   let newSetWeight = setWeightInputTextArea.value.trim();

   // Delete the text area to allow p to be inserted.
   currentSetWeightDiv.firstElementChild.remove();

   // Checks for user input validity.
   if (Number.isFinite(parseFloat(newSetWeight)) && newSetWeight >= 0) {
      // Insert the user's input into the DOM or output error if too high.
      if (newSetWeight < 99999) {
         currentSetWeightDiv.insertAdjacentHTML(
            "beforeend",
            `<p>${newSetWeight}kg</p>`
         );
      } else {
         currentSetWeightDiv.insertAdjacentHTML(
            "beforeend",
            `<p>${previousSetWeight}kg</p>`
         );

         if (!/^$/.test(newSetWeight)) {
            const errorMessage = `Chill Bruh! You ain't no hulk... YET!`;
            errorPopoutMessage(errorMessage);
         }
      }
   } else {
      // Insert previous value into the DOM.
      currentSetWeightDiv.insertAdjacentHTML(
         "beforeend",
         `<p>${previousSetWeight}kg</p>`
      );
      if (!/^$/.test(newSetWeight)) {
         const errorMessage = `Your input for weight was invalid.\n
        Input must be a positive number.`;
         errorPopoutMessage(errorMessage);
      }
   }

   // Reset styles. These are needed only by reps and sets, not comments and name.
   setWeightInputTextArea.style.textAlign = "unset";
   setWeightInputTextArea.style.paddingTop = `0`;

   const currentExID = parseInt(
      currentSetWeightDiv.parentElement.parentElement.id.substring(11)
   );
   const currentSetID = getSetID(currentSetWeightDiv, currentExID);

   // Update global vars.
   if (Number.isFinite(parseFloat(newSetWeight)) && newSetWeight < 99999) {
      allExDetails = updateSetDetails(
         currentExID,
         currentSetID,
         allExDetails,
         newSetWeight,
         "SetWeight"
      );

      allExDetails = autoCalculate10RM(
         currentExID,
         currentSetID,
         allExDetails,
         newSetWeight,
         null,
         null
      );
   }

   return allExDetails;
}

// ✓✓✓
// ADD FUNCTIONALITY TO SWITCH TO POUNDS. OR EVEN PLATES (2PLATES, 2.5 PLATES ETC.)
