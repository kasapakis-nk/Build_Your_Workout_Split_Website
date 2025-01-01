// This is what happens ON-CLICK
function editSetReps(currentSetRepsDiv, allExDetails) {
   // Prevents error when clicking inside the div while inputting.
   if (currentSetRepsDiv.querySelector("textarea")) return;

   // Create and edit properties of the Text Area element where user inputs new data.
   const setRepsInputTextArea = document.createElement("textarea");
   setRepsInputTextArea.className = `inputTextArea`;
   setRepsInputTextArea.style.textAlign = "center";
   setRepsInputTextArea.style.resize = "none";

   // Keep the current num of reps the user has input previously.
   let previousSetReps = currentSetRepsDiv.querySelector("p").innerText;

   // What the USER SEES when they click, depending on previous num of reps input.
   if (!Number.isFinite(parseFloat(previousSetReps))) {
      previousSetReps = "";
   }
   setRepsInputTextArea.value = previousSetReps;

   // Delete previous container and ADD the text area to the DOM.
   currentSetRepsDiv.firstElementChild.remove();
   currentSetRepsDiv.appendChild(setRepsInputTextArea);

   // Style to center input text vertically.
   const setRepsDivHeight = setRepsInputTextArea.parentElement.offsetHeight;
   setRepsInputTextArea.style.paddingTop = `${
      setRepsDivHeight / 2 - 0.007 * window.innerWidth
   }px`;

   // Focus user's cursor on current input text area.
   setRepsInputTextArea.focus();

   // Events to finalize user input.
   // In case of click away (loss of focus - blur event):
   setRepsInputTextArea.addEventListener("blur", function () {
      handleInputSetReps(
         currentSetRepsDiv,
         setRepsInputTextArea,
         previousSetReps,
         allExDetails
      );
   });

   // In case of user pressing `Enter` or `Shift-Enter` to finalize input:
   setRepsInputTextArea.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
         handleInputSetReps(
            currentSetRepsDiv,
            setRepsInputTextArea,
            previousSetReps,
            allExDetails
         );
      }
   });
}

// This is what happens AFTER the user "blurs" or presses Enter.
function handleInputSetReps(
   currentSetRepsDiv,
   setRepsInputTextArea,
   previousSetReps,
   allExDetails
) {
   // Save user's input for set reps.
   let newSetReps = setRepsInputTextArea.value.trim();

   // Delete the text area to allow p to be inserted.
   currentSetRepsDiv.firstElementChild.remove();

   // Checks for user input validity.
   if (
      Number.isFinite(parseFloat(newSetReps)) &&
      newSetReps > 0 &&
      newSetReps < 1000
   ) {
      // Insert the user's input into the DOM.
      currentSetRepsDiv.insertAdjacentHTML("beforeend", `<p>${newSetReps}</p>`);
   } else if (/^\d+-\d+$/.test(newSetReps)) {
      // Save average reps since user gave a rep range.
      const startOfRepRange = newSetReps.slice(0, newSetReps.indexOf("-"));
      const endOfRepRange = newSetReps.slice(
         newSetReps.indexOf("-") + 1,
         newSetReps.length
      );
      const averageReps =
         (parseFloat(startOfRepRange) + parseFloat(endOfRepRange)) / 2;

      newSetReps = averageReps;
      // Insert the user's input into the DOM.
      currentSetRepsDiv.insertAdjacentHTML("beforeend", `<p>${newSetReps}</p>`);
   } else {
      // Insert previous value into the DOM.
      if (previousSetReps !== "") {
         currentSetRepsDiv.insertAdjacentHTML(
            "beforeend",
            `<p>${previousSetReps}</p>`
         );
      } else {
         currentSetRepsDiv.insertAdjacentHTML("beforeend", `<p>\u2014</p>`);
      }

      if (!/^$/.test(newSetReps)) {
         const errorMessage = `Your input for reps was invalid.\n
    Input must be a number (1-999) or a range (e.g. 12-15).`;
         errorPopoutMessage(errorMessage);
      }
   }

   // Reset styles.
   setRepsInputTextArea.style.textAlign = "unset";
   setRepsInputTextArea.style.paddingTop = `0`;

   const currentExID = parseInt(
      currentSetRepsDiv.parentElement.parentElement.id.substring(11)
   );
   const currentSetID = getSetID(currentSetRepsDiv, currentExID);

   // Update global vars.
   if (
      Number.isFinite(parseFloat(newSetReps)) &&
      newSetReps > 0 &&
      newSetReps < 1000
   ) {
      allExDetails = updateSetDetails(
         currentExID,
         currentSetID,
         allExDetails,
         newSetReps,
         "SetReps"
      );

      allExDetails = autoCalculate10RM(
         currentExID,
         currentSetID,
         allExDetails,
         null,
         newSetReps,
         null
      );
   }

   return allExDetails;
}

// ✓✓✓
