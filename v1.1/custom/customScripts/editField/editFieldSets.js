// This is what happens ON-CLICK
function editFieldSets(currentRowSetsDiv, allExDetails) {
   // Prevents error when clicking inside the div while inputting.
   if (currentRowSetsDiv.querySelector("textarea")) return;

   // Create and edit properties of the Text Area element where user inputs new data.
   const setsInputTextArea = document.createElement("textarea");
   setsInputTextArea.className = `inputTextArea`;
   setsInputTextArea.style.textAlign = "center";
   setsInputTextArea.style.resize = "none";

   // Keep the current num of sets the user has input previously.
   const previousExSets = currentRowSetsDiv
      .querySelector("p")
      .innerText.substring(1);

   // What the USER SEES when they click.
   setsInputTextArea.value = previousExSets;

   // Delete previous container and ADD the text area to the DOM.
   currentRowSetsDiv.firstElementChild.remove();
   currentRowSetsDiv.appendChild(setsInputTextArea);

   // Style to center input text vertically.
   // This has to be after insertion of textarea into DOM.
   const setsDivHeight = setsInputTextArea.parentElement.offsetHeight;
   setsInputTextArea.style.paddingTop = `${
      setsDivHeight / 2 - 0.007 * window.innerWidth
   }px`;

   // Focus user's cursor on current input text area.
   setsInputTextArea.focus();

   // Events to finalize user input.
   // In case of click away (loss of focus - blur event):
   setsInputTextArea.addEventListener("blur", function () {
      allExDetails = handleInputSets(
         currentRowSetsDiv,
         setsInputTextArea,
         previousExSets,
         allExDetails
      );
   });

   // In case of user pressing `Enter` or `Shift-Enter` to finalize input:
   setsInputTextArea.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
         allExDetails = handleInputSets(
            currentRowSetsDiv,
            setsInputTextArea,
            previousExSets,
            allExDetails
         );
      }
   });

   return allExDetails;
}

// This is what happens AFTER the user "blurs" or presses Enter.
function handleInputSets(
   currentRowSetsDiv,
   setsInputTextArea,
   previousExSets,
   allExDetails
) {
   // Save user's input for sets.
   let newExSets = setsInputTextArea.value.trim();

   // Delete the text area to allow p to be inserted.
   currentRowSetsDiv.firstElementChild.remove();

   const currentExID = parseInt(currentRowSetsDiv.parentElement.id.substring(3));

   // Checks for user input validity.
   if (Number.isFinite(parseFloat(newExSets)) && newExSets > 0 && newExSets < 100) {
      // Insert the user's input into the DOM.
      currentRowSetsDiv.insertAdjacentHTML(
         "beforeend",
         `<p><b>x</b>${newExSets}</p>`
      );
   } else if (/^\d+-\d+$/.test(newExSets)) {
      // Insert the user's input into the DOM.
      currentRowSetsDiv.insertAdjacentHTML(
         "beforeend",
         `<p><b>x</b>${newExSets}</p>`
      );
      // Save average sets since user gave a rep range.
      const startOfSetsRange = newExSets.slice(0, newExSets.indexOf("-"));
      const endOfSetsRange = newExSets.slice(
         newExSets.indexOf("-") + 1,
         newExSets.length
      );
      const averageSets =
         (parseFloat(startOfSetsRange) + parseFloat(endOfSetsRange)) / 2;
      newExSets = averageSets;
   } else {
      // Insert default value into the DOM.
      currentRowSetsDiv.insertAdjacentHTML("beforeend", `<p><b>x</b>${previousExSets}</p>`);

      if (!/^$/.test(newExSets)) {
         const errorMessage = `Your input for sets was invalid.\n
                Input must be a number (1-99) or a range (e.g. 3-4).`;
         errorPopoutMessage(errorMessage);
      }
      // Reset user input to just the number part.
      newExSets = newExSets.match(/^\d+/);
   }

   // Reset styles. These are needed only by reps and sets, not comments and name.
   setsInputTextArea.style.textAlign = "unset";
   setsInputTextArea.style.paddingTop = `0`;

   // Update global vars.
   // Initialize and update allExDetails sets if needed.
   if (Number.isFinite(parseFloat(newExSets))) {
      allExDetails = initializeExDetailsSets(
         currentExID,
         allExDetails,
         newExSets,
         null,
         "ExSets"
      );
      const exSets = [previousExSets, newExSets];
      allExDetails = updateExDetails(
         currentExID,
         allExDetails,
         exSets,
         null,
         "ExSets"
      );
   }

   // Update set count if the ex is expanded.
   if (isExExpanded[currentExID]) {
      allExDetails = updateExpandedExSets(currentRowSetsDiv, allExDetails);
   }

   // allExSets[`${currentExID}`] = parseFloat(newExSets);
   // allExSets[`${currentExID}`] = parseFloat(averageSets);
   // allExSets[`${currentExID}`] = -1;
   // return allExSets;
   return allExDetails;
}

function updateExpandedExSets(currentRowSetsDiv, allExDetails) {
   const currentExID = parseInt(currentRowSetsDiv.parentElement.id.substring(3));
   const currentExExpandedSection = document.querySelector(
      `#expandedRow${currentExID}`
   );
   const previousExSets = currentExExpandedSection.children.length - 1;
   const newExSets =  allExDetails.allExercises[`Ex${currentExID}`].sets;


   if (previousExSets > newExSets) {
      const setsToRemove = previousExSets - newExSets;
      for (let i = 0; i < setsToRemove; i++) {
         currentExExpandedSection.removeChild(
            currentExExpandedSection.lastElementChild
         );
      }
      
      return allExDetails;
   } else if (previousExSets < newExSets) {
      // To increase set rows accurately, I shrink and expand the section again.
      const shrinkMenuButton = currentRowSetsDiv.parentElement
         .querySelector(`.exRowDropDown`)
         .querySelector("button");

         shrinkExSets(shrinkMenuButton, isExExpanded);
         expandExSets(shrinkMenuButton, isExExpanded);

         return allExDetails;
   } else {
      return;
   }
}

// ✓✓✓
// MAYBE MINOR CHANGES, LIKE "RESET STYLES"
