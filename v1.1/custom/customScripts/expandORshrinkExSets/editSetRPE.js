// FIX: Future update, make it so a list pops up that you can scroll with numbers
// from 0 to 10, 10+ since the options are not that many and user should
// not have so much freedom.

// This is what happens ON-CLICK
function editSetRPE(currentSetRPEDiv, allExDetails) {
   // Prevents error when clicking inside the div while inputting.
   if (currentSetRPEDiv.querySelector("textarea")) return;

   // Create and edit properties of the Text Area element where user inputs new data.
   const setRPEInputTextArea = document.createElement("textarea");
   setRPEInputTextArea.className = `inputTextArea`;
   setRPEInputTextArea.style.textAlign = "center";
   setRPEInputTextArea.style.resize = "none";

   // Keep the current RPE the user has input previously.
   let previousSetRPE = currentSetRPEDiv.querySelector("p").innerText;

   // What the USER SEES when they click, depending on previous RPE input.
   if (!Number.isFinite(parseFloat(previousSetRPE))) {
      previousSetRPE = "\u2014";
      setRPEInputTextArea.value = previousSetRPE.substring(1);
   } else {
      setRPEInputTextArea.value = previousSetRPE;
   }

   // Delete previous container and ADD the text area to the DOM.
   currentSetRPEDiv.firstElementChild.remove();
   currentSetRPEDiv.appendChild(setRPEInputTextArea);

   // Style to center input text vertically.
   const setRPEDivHeight = setRPEInputTextArea.parentElement.offsetHeight;
   setRPEInputTextArea.style.paddingTop = `${
      setRPEDivHeight / 2 - 0.007 * window.innerWidth
   }px`;

   // Focus user's cursor on current input text area.
   setRPEInputTextArea.focus();

   // Events to finalize user input.
   // In case of click away (loss of focus - blur event):
   setRPEInputTextArea.addEventListener("blur", function () {
      handleInputSetRPE(
         currentSetRPEDiv,
         setRPEInputTextArea,
         previousSetRPE,
         allExDetails
      );
   });

   // In case of user pressing `Enter` or `Shift-Enter` to finalize input:
   setRPEInputTextArea.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
         handleInputSetRPE(
            currentSetRPEDiv,
            setRPEInputTextArea,
            previousSetRPE,
            allExDetails
         );
      }
   });
}

// This is what happens AFTER the user "blurs" or presses Enter.
function handleInputSetRPE(
   currentSetRPEDiv,
   setRPEInputTextArea,
   previousSetRPE,
   allExDetails
) {
   // Save user's input for set RPE.
   let newSetRPE = setRPEInputTextArea.value.trim();

   // Delete the text area to allow p to be inserted.
   currentSetRPEDiv.firstElementChild.remove();

   // Checks for user input validity.
   if (Number.isFinite(parseFloat(newSetRPE)) && newSetRPE >= 0 && newSetRPE <= 10) {
      // Insert the user's input into the DOM.
      currentSetRPEDiv.insertAdjacentHTML("beforeend", `<p>${newSetRPE}</p>`);
   } else {
      // Insert default value into the DOM.
      currentSetRPEDiv.insertAdjacentHTML("beforeend", `<p>${previousSetRPE}</p>`);

      if (!/^$/.test(newSetRPE)) {
         const errorMessage = `Your input for RPE was invalid.\n
      Input must be a positive number (0-10).`;
         errorPopoutMessage(errorMessage);
      }
   }

   // Reset styles.
   setRPEInputTextArea.style.textAlign = "unset";
   setRPEInputTextArea.style.paddingTop = `0`;

   const currentExID = parseInt(
      currentSetRPEDiv.parentElement.parentElement.id.substring(11)
   );
   const currentSetID = getSetID(currentSetRPEDiv, currentExID);

   // Update global vars.
   if (Number.isFinite(parseFloat(newSetRPE)) && newSetRPE >= 0 && newSetRPE <= 10) {
      allExDetails = updateSetDetails(
         currentExID,
         currentSetID,
         allExDetails,
         newSetRPE,
         "SetRPE"
      );

      allExDetails = autoCalculate10RM(
         currentExID,
         currentSetID,
         allExDetails,
         null,
         null,
         newSetRPE
      );
   }

   return allExDetails;
}

// ✓✓✓
