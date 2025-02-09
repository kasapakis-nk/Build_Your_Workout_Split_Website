// This is what happens ON-CLICK
function editFieldReps(currentExRepsDiv, allExDetails) {
   // Prevents error when clicking inside the div while inputting.
   if (currentExRepsDiv.querySelector("textarea")) return;

   // Create and edit properties of the Text Area element where user inputs new data.
   const repsInputTextArea = document.createElement("textarea");
   repsInputTextArea.className = `inputTextArea`;
   repsInputTextArea.style.textAlign = "center";
   repsInputTextArea.style.resize = "none";

   // Keep the current num of reps the user has input previously.
   let previousExReps = currentExRepsDiv.querySelector("p").innerText;
   // What the USER SEES when they click, depending on previous num of reps input.
   if (!Number.isFinite(parseFloat(previousExReps))) {
      previousExReps = "";
   }
   repsInputTextArea.value = previousExReps;

   // Delete previous container and ADD the text area to the DOM.
   currentExRepsDiv.firstElementChild.remove();
   currentExRepsDiv.appendChild(repsInputTextArea);

   // Style to center input text vertically.
   // This has to be after insertion of textarea into DOM.
   const repsDivHeight = repsInputTextArea.parentElement.offsetHeight;
   repsInputTextArea.style.paddingTop = `${
      repsDivHeight / 2 - 0.007 * window.innerWidth
   }px`;

   // Focus user's cursor on current input text area.
   repsInputTextArea.focus();

   // Events to finalize user input.
   // In case of click away (loss of focus - blur event):
   repsInputTextArea.addEventListener("blur", function () {
      allExDetails = handleInputReps(
         currentExRepsDiv,
         repsInputTextArea,
         previousExReps,
         allExDetails
      );
   });

   // In case of user pressing `Enter` or `Shift-Enter` to finalize input:
   repsInputTextArea.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
         allExDetails = handleInputReps(
            currentExRepsDiv,
            repsInputTextArea,
            previousExReps,
            allExDetails
         );
      }
   });
}

// This is what happens AFTER the user "blurs" or presses Enter.
function handleInputReps(
   currentRowRepsDiv,
   repsInputTextArea,
   previousExReps,
   allExDetails
) {
   // Save user's input for reps.
   let newExReps = repsInputTextArea.value.trim();

   // Delete the text area to allow p to be inserted.
   currentRowRepsDiv.firstElementChild.remove();

   const currentExID = parseInt(currentRowRepsDiv.parentElement.id.substring(3));

   // Checks for user input validity.
   if (Number.isFinite(parseFloat(newExReps)) && newExReps > 0 && newExReps < 1000) {
      // Insert the user's input into the DOM.
      currentRowRepsDiv.insertAdjacentHTML("beforeend", `<p>${newExReps}</p>`);
   } else if (/^\d+-\d+$/.test(newExReps)) {
      // Insert the user's input into the DOM.
      currentRowRepsDiv.insertAdjacentHTML("beforeend", `<p>${newExReps}</p>`);
      // Save average reps since user gave a rep range.
      const startOfRepRange = newExReps.slice(0, newExReps.indexOf("-"));
      const endOfRepRange = newExReps.slice(
         newExReps.indexOf("-") + 1,
         newExReps.length
      );
      const averageReps =
         (parseFloat(startOfRepRange) + parseFloat(endOfRepRange)) / 2;
      newExReps = averageReps;
   } else {
      {
         // Insert previous value into the DOM.
         if (previousExReps !== "") {
            currentRowRepsDiv.insertAdjacentHTML(
               "beforeend",
               `<p>${previousExReps}</p>`
            );
         } else {
            currentRowRepsDiv.insertAdjacentHTML(
               "beforeend",
               `<p><b><span class="emdash">&mdash;</span></b></p>`
            );
         }
      }

      if (!/^$/.test(newExReps)) {
         const errorMessage = `Your input for reps was invalid.\n
      Input must be a number (1-999) or a range (e.g. 12-15).`;
         errorPopoutMessage(errorMessage);
      }
   }

   // Reset styles. These are needed only by reps and sets, not comments and name.
   repsInputTextArea.style.textAlign = "unset";
   repsInputTextArea.style.paddingTop = `0`;

   // Update global vars.
   // Update all the set reps if the ex is expanded.
   if (isExExpanded[currentExID]) {
      allExDetails = updateExpandedExReps(
         currentRowRepsDiv,
         allExDetails,
         newExReps
      );
   }
   // Initialize and update allExDetails sets if needed.
   if (Number.isFinite(parseFloat(newExReps))) {
      allExDetails = initializeExDetailsSets(
         currentExID,
         allExDetails,
         null,
         newExReps,
         "ExReps"
      );
      allExDetails = updateExDetails(
         currentExID,
         allExDetails,
         null,
         newExReps,
         "ExReps"
      );
   }

   return allExDetails;
}

// ADD FUNCTIONALITY TO ONLY UPDATE IF THEY HAVE NOT BEEN CHANGED BY USER, OR IF THEY
// ARE ALL THE SAME, SO THEY DON'T OVERWRITE THEIR PREVIOUS WORK.
function updateExpandedExReps(currentRowRepsDiv, allExDetails, newExReps) {
   const currentExID = parseInt(currentRowRepsDiv.parentElement.id.substring(3));
   const expandedRowSetSection = document.querySelector(
      `#expandedRow${currentExID}`
   );
   const exSets = allExDetails.allExercises[`Ex${currentExID}`].sets;

   // Add all p elements that refer to "reps" to this array.
   let allSetRepPs = [];

   for (let set = 0; set < exSets; set++) {
      let setRepP = expandedRowSetSection
         .querySelector(`.ex${currentExID}set${set}`)
         .querySelector(`.setReps`)
         .querySelector("p");
      allSetRepPs.push(setRepP);
   }

   if ([...allSetRepPs].every((p) => p.innerHTML === allSetRepPs[0].innerHTML)) {
      // Change the content of the p elements based on new reps.
      allSetRepPs.forEach((repP) => (repP.innerHTML = newExReps));
   }

   return allExDetails;
}

// ✓✓✓
