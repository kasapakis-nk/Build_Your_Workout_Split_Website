function expandExerciseMenu(rowDropDownMenuButton) {
   let checkNextDivContent;
   if (
      rowDropDownMenuButton.parentElement.parentElement.nextElementSibling.querySelector(
         ".setNumber"
      )
   ) {
      checkNextDivContent =
         rowDropDownMenuButton.parentElement.parentElement.nextElementSibling.querySelector(
            ".setNumber"
         );
   }
   if (checkNextDivContent) {
      return;
   }

   rowDropDownMenuButton.style.backgroundImage =
      "url('customMedia/dropdownArrowDown.png')";

   // This variable is useful for the position of the following rows. This is WHERE I duplicate.
   const originalExerciseRow = rowDropDownMenuButton.parentElement.parentElement;
   // This variable copies the template, giving me the needed structure. This is WHAT I duplicate.
   const cloneOfExpandedExerciseTemplate = document
      .getElementById("expandedExerciseTemplate")
      .cloneNode(true);
   cloneOfExpandedExerciseTemplate.style.display = "flex";
   // These vars draw info from the original row that was expanded. This is what is INSIDE the clone.
   const numberOfSetsOfExercise = parseInt(
      originalExerciseRow
         .querySelector(".numberOfSets")
         .querySelector("p")
         .innerText.replace("x", "")
         .trim()
   );
   const numberOfRepsOfExercise = parseInt(
      originalExerciseRow
         .querySelector(".numberOfRepetitions")
         .querySelector("p")
         .innerText.trim()
   );

   // Inserting the first set, so I have an anchor for the rest.
   let lastInsertedSetRow = originalExerciseRow.insertAdjacentElement(
      "afterend",
      cloneOfExpandedExerciseTemplate
   );

   // Inserting the rest of the sets starting from set 2.
   for (let setNumber = 1; setNumber <= numberOfSetsOfExercise; setNumber++) {
      let newClone = lastInsertedSetRow.cloneNode(true);

      newCloneChildren = newClone.querySelectorAll("div");
      newCloneChildren.forEach((childDiv) =>
         childDiv.classList.add("afterSetsExpansion")
      );
      // Edit the initial values of each container wherever needed.
      let newCloneSetNumContainer = newClone
         .querySelector(".setNumber")
         .querySelector("p");
      newCloneSetNumContainer.innerText = `${setNumber}`;

      let newCloneRepContainer = newClone
         .querySelector(".setReps")
         .querySelector("p");
      newCloneRepContainer.innerHTML = isNaN(numberOfRepsOfExercise)
         ? `<span class="emdash">&mdash;</span>`
         : `${numberOfRepsOfExercise}`;

      let newCloneWeightContainer = newClone
         .querySelector(".setWeight")
         .querySelector("p");
      newCloneWeightContainer.innerText = `kg`;

      let newCloneSetTypeContainer = newClone
         .querySelector(".setType")
         .querySelector("p");
      newCloneSetTypeContainer.innerText = `Straight`; // swap to pictures

      let newCloneRIRContainer = newClone
         .querySelector(".setRIR")
         .querySelector("p");
      newCloneRIRContainer.innerHTML = `<span class="emdash">&mdash;</span>`;
      let newCloneRPEContainer = newClone
         .querySelector(".setRPE")
         .querySelector("p");
      newCloneRPEContainer.innerHTML = `<span class="emdash">&mdash;</span>`;
      let newClone10RMContainer = newClone
         .querySelector(".set10RM")
         .querySelector("p");
      newClone10RMContainer.innerHTML = `<span class="emdash">&mdash;</span>`;

      let newCloneRestTimerContainer = newClone
         .querySelector(".setRestTimer")
         .querySelector("p");
      newCloneRestTimerContainer.innerHTML = `00:00`;

      let newCloneCommentContainer = newClone.querySelector(".setComment");
      newCloneCommentContainer.style.justifyContent = "initial";
      // newCloneCommentContainer.innerText = `Set Comment`;

      lastInsertedSetRow = lastInsertedSetRow.insertAdjacentElement(
         `afterend`,
         newClone
      );
   }
   // Set button to "shrink"
   rowDropDownMenuButton.onclick = function() {
    existsDropDownMenu = shrinkExerciseMenu(this);
};
   // This is passed to existsDropDownMenu
   return true;
}

function shrinkExerciseMenu(rowDropDownMenuButton) {
    rowDropDownMenuButton.style.backgroundImage =
    "url('customMedia/dropdownArrowLeft.png')";
    const entireExRow = rowDropDownMenuButton.parentElement.parentElement
    const setsNumberDiv = entireExRow.querySelector(`.numberOfSets`).querySelector(`p`);
    const setsNumber = setsNumberDiv.innerText.substring(1);
    for (i=0;i<=setsNumber;i++){
        entireExRow.nextElementSibling.remove();
    }

    // Reset button to "expand"
    rowDropDownMenuButton.onclick = function() {
        existsDropDownMenu = expandExerciseMenu(this);
    };
    return false;
}
