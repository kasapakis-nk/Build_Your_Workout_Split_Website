// FIX: Future update, make it so a list pops up that you can scroll with numbers
// from 0 to 10, 10+ since the options are not that many and user should
// not have so much freedom.

// This is what happens ON-CLICK
function editSetRIR(currentSetRIRDiv, allExDetails) {
   // Prevents error when clicking inside the div while inputting.
   if (currentSetRIRDiv.querySelector("textarea")) return;

   // Create and edit properties of the Text Area element where user inputs new data.
   const setRIRInputTextArea = document.createElement("textarea");
   setRIRInputTextArea.className = `inputTextArea`;
   setRIRInputTextArea.style.textAlign = "center";
   setRIRInputTextArea.style.resize = "none";

   // Keep the current RIR the user has input previously.
   let previousSetRIR = currentSetRIRDiv.querySelector("p").innerText;

   // What the USER SEES when they click, depending on previous RIR input.
   if (!Number.isFinite(parseFloat(previousSetRIR))) {
      previousSetRIR = "\u2014";
      setRIRInputTextArea.value = previousSetRIR.substring(1);
   } else {
      setRIRInputTextArea.value = previousSetRIR;
   }

   // Delete previous container and ADD the text area to the DOM.
   currentSetRIRDiv.firstElementChild.remove();
   currentSetRIRDiv.appendChild(setRIRInputTextArea);

   // Style to center input text vertically.
   const setRIRDivHeight = setRIRInputTextArea.parentElement.offsetHeight;
   setRIRInputTextArea.style.paddingTop = `${
      setRIRDivHeight / 2 - 0.007 * window.innerWidth
   }px`;

   // Focus user's cursor on current input text area.
   setRIRInputTextArea.focus();

   // Events to finalize user input.
   // In case of click away (loss of focus - blur event):
   setRIRInputTextArea.addEventListener("blur", function () {
      handleInputSetRIR(
         currentSetRIRDiv,
         setRIRInputTextArea,
         previousSetRIR,
         allExDetails
      );
   });

   // In case of user pressing `Enter` or `Shift-Enter` to finalize input:
   setRIRInputTextArea.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
         handleInputSetRIR(
            currentSetRIRDiv,
            setRIRInputTextArea,
            previousSetRIR,
            allExDetails
         );
      }
   });
}

// This is what happens AFTER the user "blurs" or presses Enter.
function handleInputSetRIR(
   currentSetRIRDiv,
   setRIRInputTextArea,
   previousSetRIR,
   allExDetails
) {
   // Save user's input for set RIR.
   let newSetRIR = setRIRInputTextArea.value.trim();

   // Delete the text area to allow p to be inserted.
   currentSetRIRDiv.firstElementChild.remove();

   // Checks for user input validity.
   if (Number.isFinite(parseFloat(newSetRIR)) && newSetRIR >= 0 && newSetRIR <= 10) {
      // Insert the user's input into the DOM.
      currentSetRIRDiv.insertAdjacentHTML("beforeend", `<p>${newSetRIR}</p>`);
   } else {
      // Insert default value into the DOM.
      currentSetRIRDiv.insertAdjacentHTML("beforeend", `<p>${previousSetRIR}</p>`);

      if (!/^$/.test(newSetRIR)) {
         const errorMessage = `Your input for RIR was invalid.\n
     Input must be a positive number (0-10).`;
         errorPopoutMessage(errorMessage);
      }
   }

   // Reset styles.
   setRIRInputTextArea.style.textAlign = "unset";
   setRIRInputTextArea.style.paddingTop = `0`;

   const currentExID = parseInt(
      currentSetRIRDiv.parentElement.parentElement.id.substring(11)
   );
   const currentSetID = getSetID(currentSetRIRDiv, currentExID);

   // Update global vars.
   if (Number.isFinite(parseFloat(newSetRIR)) && newSetRIR >= 0 && newSetRIR <= 10) {
      allExDetails = updateSetDetails(
         currentExID,
         currentSetID,
         allExDetails,
         newSetRIR,
         "SetRIR"
      );

      allExDetails = autoCalculate10RM(
         currentExID,
         currentSetID,
         allExDetails,
         null,
         null,
         newSetRIR
      );
   }

   return allExDetails;
}

// ✓✓✓
