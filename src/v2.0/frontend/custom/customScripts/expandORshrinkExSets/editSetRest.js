// Right now it inputs in s.
// Have to think of a better UX method.

// This is what happens ON-CLICK
function editSetRest(currentSetRestDiv, allExDetails) {
   // Prevents error when clicking inside the div while inputting.
   if (currentSetRestDiv.querySelector("textarea")) return;

   // Create and edit properties of the Text Area element where user inputs new data.
   const setRestInputTextArea = document.createElement("textarea");
   setRestInputTextArea.className = `inputTextArea`;
   setRestInputTextArea.style.textAlign = "center";
   setRestInputTextArea.style.resize = "none";

   // Keep the current rest time the user has input previously.
   let previousSetRest = currentSetRestDiv
      .querySelector("p")
      .innerText.match(/^(\d+)/); // This returns a 2x1 array.

   // What the USER SEES when they click, depending on previous rest input.
   if (!Number.isFinite(parseFloat(previousSetRest))) {
      previousSetRest = "";
   } else {
      previousSetRest = previousSetRest[1];
   }
   setRestInputTextArea.value = previousSetRest;

   // Delete previous container and ADD the text area to the DOM.
   currentSetRestDiv.firstElementChild.remove();
   currentSetRestDiv.appendChild(setRestInputTextArea);

   // Style to center input text vertically.
   const setRestDivHeight = setRestInputTextArea.parentElement.offsetHeight;
   setRestInputTextArea.style.paddingTop = `${
      setRestDivHeight / 2 - 0.007 * window.innerWidth
   }px`;

   // Focus user's cursor on current input text area.
   setRestInputTextArea.focus();

   // Events to finalize user input.
   // In case of click away (loss of focus - blur event):
   setRestInputTextArea.addEventListener("blur", function () {
      handleInputSetRest(
         currentSetRestDiv,
         setRestInputTextArea,
         previousSetRest,
         allExDetails
      );
   });

   // In case of user pressing `Enter` or `Shift-Enter` to finalize input:
   setRestInputTextArea.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
         handleInputSetRest(
            currentSetRestDiv,
            setRestInputTextArea,
            previousSetRest,
            allExDetails
         );
      }
   });
}

// This is what happens AFTER the user "blurs" or presses Enter.
function handleInputSetRest(
   currentSetRestDiv,
   setRestInputTextArea,
   previousSetRest,
   allExDetails
) {
   // Save user's input for set rest timer.
   let newSetRest = setRestInputTextArea.value.trim();

   // Delete the text area to allow p to be inserted.
   currentSetRestDiv.firstElementChild.remove();

   // Checks for user input validity.
   if (
      Number.isFinite(parseFloat(newSetRest)) &&
      newSetRest >= 0 &&
      newSetRest < 1000
   ) {
      // Insert the user's input into the DOM.
      currentSetRestDiv.insertAdjacentHTML("beforeend", `<p>${newSetRest}s</p>`);
   } else {
      // Insert previous value into the DOM.
      currentSetRestDiv.insertAdjacentHTML(
         "beforeend",
         `<p>${previousSetRest}s</p>`
      );
      if (!/^$/.test(newSetRest)) {
         const errorMessage = `Your input for rest timer was invalid.\n
         Input must be a positive number, less than 1000, meaning seconds (s).`;
         errorPopoutMessage(errorMessage);
      }
   }

   // Reset styles. These are needed only by reps and sets, not comments and name.
   setRestInputTextArea.style.textAlign = "unset";
   setRestInputTextArea.style.paddingTop = `0`;

   const currentExID = parseInt(
      currentSetRestDiv.parentElement.parentElement.id.substring(11)
   );
   const currentSetID = getSetID(currentSetRestDiv, currentExID);

   // Update global vars.
   if (
      Number.isFinite(parseFloat(newSetRest)) &&
      newSetRest >= 0 &&
      newSetRest < 1000
   ) {
      allExDetails = updateSetDetails(
         currentExID,
         currentSetID,
         allExDetails,
         newSetRest,
         "SetRest"
      );
   }

   return allExDetails;
}

// ✓✓✓