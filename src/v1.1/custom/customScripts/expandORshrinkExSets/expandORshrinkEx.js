function firstTimeExpandExSets(expandMenuButton, allExDetails, isExExpanded) {
   // This is WHERE I insert.
   // Below the exercise row where the expand button was pressed.
   const originalExRow = expandMenuButton.parentElement.parentElement;
   const currentExID = originalExRow.id.substring(3);
   const currentExSets = allExDetails.allExercises[`Ex${currentExID}`].sets;
   const currentExReps = allExDetails.allExercises[`Ex${currentExID}`].reps;

   if (
      Number.isFinite(parseFloat(currentExSets)) ||
      Number.isFinite(parseFloat(currentExReps))
   ) {
      // Reset button to "shrink".
      // Swap arrow icon to expanded menu and switch its functionality to shrink.
      // ADD IF STATEMENT TO NOT SWAP IF NOT EXPANDIND, IF ALREADY EXPANDED.
      expandMenuButton.style.backgroundImage =
         "url('customMedia/dropdownArrowDown.png')";
      expandMenuButton.onclick = function () {
         isExExpanded = shrinkExSets(this, isExExpanded);
      };

      // Capture the initial, bare minimum (=1 set) template.
      const currentExpandedEx = document
         .getElementById("expandedExTemplate")
         .cloneNode(true);

      // Swap the id of the inserted expanded row.
      currentExpandedEx.id = `expandedRow${currentExID}`;

      // This is where I start inserting data into set rows.
      // ADD IF STATEMENT TO MONITOR IF THERE WAS ALREADY SAVED DATA HERE.
      const firstSetRow = currentExpandedEx.querySelector(
         "#expandedExSingleRowTemplate"
      );
      firstSetRow.classList.add(`ex${currentExID}set0`);

      const firstSetRepsDiv = firstSetRow.querySelector(".setReps");
      firstSetRepsDiv.firstElementChild.remove();
      if (!Number.isFinite(parseFloat(currentExReps))) {
         firstSetRepsDiv.insertAdjacentHTML("afterbegin", `<p>\u2014</p>`);
      } else {
         firstSetRepsDiv.insertAdjacentHTML("afterbegin", `<p>${currentExReps}</p>`);
      }

      // Insert the initial template.
      originalExRow.insertAdjacentElement("afterend", currentExpandedEx);

      // Insert additional (> 1) set rows based on number of sets for this ex.
      let lastInsertedSetRow = document
         .getElementById(`${currentExpandedEx.id}`)
         .querySelector("#expandedExSingleRowTemplate");

      for (let set = 1; set < currentExSets; set++) {
         let setRowClone = lastInsertedSetRow.cloneNode(true);
         let setNumDiv = setRowClone.querySelector(".setNumber").querySelector("p");
         setNumDiv.innerHTML = `Set ${set + 1}`;

         setRowClone.classList.remove(`ex${currentExID}set${set - 1}`);
         setRowClone.classList.add(`ex${currentExID}set${set}`);

         lastInsertedSetRow = lastInsertedSetRow.insertAdjacentElement(
            `afterend`,
            setRowClone
         );
      }

      // Update Global Vars.
      isExExpanded[currentExID] = true;
   } else {
      const errorMessage =
         "Input exercise's number of sets or at least reps, in order to expand the exercise.";
      errorPopoutMessage(errorMessage);
   }

   return isExExpanded;
}

function shrinkExSets(shrinkMenuButton, isExExpanded) {
   // Reset button to "expand".
   shrinkMenuButton.style.backgroundImage =
      "url('customMedia/dropdownArrowLeft.png')";
   shrinkMenuButton.onclick = function () {
      isExExpanded = expandExSets(this, isExExpanded);
   };

   // Row whose details are to be shrunk.
   const originalExRow = shrinkMenuButton.parentElement.parentElement;
   let currentExID = originalExRow.id.substring(3);

   // Expanded exercise section id.
   const expandedExToShrink = document.querySelector(`#expandedRow${currentExID}`);
   // Remove expanded section => shrink exercise.
   expandedExToShrink.remove();

   // Update Global Vars.
   isExExpanded[currentExID] = false;
   return isExExpanded;
}

function expandExSets(expandMenuButton, isExExpanded) {
   // This is WHERE I insert.
   // Below the exercise row where the expand button was pressed.
   const originalExRow = expandMenuButton.parentElement.parentElement;
   const currentExID = originalExRow.id.substring(3);
   const currentExSets = allExDetails.allExercises[`Ex${currentExID}`].sets;
   const currentExReps = allExDetails.allExercises[`Ex${currentExID}`].reps;

   if (
      Number.isFinite(parseFloat(currentExSets)) ||
      Number.isFinite(parseFloat(currentExReps))
   ) {
      // Reset button to "shrink".
      // Swap arrow icon to expanded menu and switch its functionality to shrink.
      // ADD IF STATEMENT TO NOT SWAP IF NOT EXPANDIND, IF ALREADY EXPANDED.
      expandMenuButton.style.backgroundImage =
         "url('customMedia/dropdownArrowDown.png')";
      expandMenuButton.onclick = function () {
         isExExpanded = shrinkExSets(this, isExExpanded);
      };

      // Capture the initial, bare minimum (=1 set) template.
      const currentExpandedEx = document
         .getElementById("expandedExTemplate")
         .cloneNode(true);

      // Swap the id of the inserted expanded row.
      currentExpandedEx.id = `expandedRow${currentExID}`;

      // This is where I start inserting data into set rows.
      // Now that it's the 2nd time we expand, I do not use the initial template data.
      // I use the saved structure the user may have altered.
      const firstSetRow = currentExpandedEx.querySelector(
         "#expandedExSingleRowTemplate"
      );
      firstSetRow.classList.add(`ex${currentExID}set0`);

      // Data insertion from allExDetails:
      const firstSetRepsP = firstSetRow.querySelector(".setReps").querySelector("p");
      const firstSetReps =
         allExDetails.allExercises[`Ex${currentExID}`][`set0`].reps;
      firstSetRepsP.innerHTML = firstSetReps;

      const firstSetWeightP = firstSetRow
         .querySelector(".setWeight")
         .querySelector("p");

      let firstSetWeight =
         allExDetails.allExercises[`Ex${currentExID}`][`set0`].weight;
      if (Number.isFinite(parseFloat(firstSetWeight))) {
         firstSetWeightP.innerHTML = `${firstSetWeight}kg`;
      } else {
         firstSetWeightP.innerHTML = `kg`;
      }

      const firstSetRIRP = firstSetRow.querySelector(".setRIR").querySelector("p");
      const firstSetRIR = allExDetails.allExercises[`Ex${currentExID}`][`set0`].rir;
      firstSetRIRP.innerHTML = firstSetRIR;

      const firstSetRPEP = firstSetRow.querySelector(".setRPE").querySelector("p");
      const firstSetRPE = allExDetails.allExercises[`Ex${currentExID}`][`set0`].rpe;
      firstSetRPEP.innerHTML = firstSetRPE;

      // Insert the initial template.
      originalExRow.insertAdjacentElement("afterend", currentExpandedEx);

      // Insert additional (> 1) set rows based on number of sets for this ex.
      let lastInsertedSetRow = document
         .getElementById(`${currentExpandedEx.id}`)
         .querySelector("#expandedExSingleRowTemplate");

      for (let set = 1; set < currentExSets; set++) {
         let setRowClone = lastInsertedSetRow.cloneNode(true);
         let setNumP = setRowClone.querySelector(".setNumber").querySelector("p");
         setNumP.innerHTML = `Set ${set + 1}`;

         const setRepsP = setRowClone.querySelector(".setReps").querySelector("p");
         let setReps =
            allExDetails.allExercises[`Ex${currentExID}`][`set${set}`].reps;
         setRepsP.innerHTML = setReps;

         if (Number.isFinite(parseFloat(firstSetWeight))) {
            firstSetWeightP.innerHTML = `${firstSetWeight}kg`;
         } else {
            firstSetWeightP.innerHTML = `kg`;
         }

         const setWeightP = setRowClone.querySelector(".setWeight").querySelector("p");
         let setWeight =
            allExDetails.allExercises[`Ex${currentExID}`][`set${set}`].weight ??
            "kg";
         if (Number.isFinite(parseFloat(setWeight))) {
            setWeightP.innerHTML = `${setWeight}kg`;
         } else {
            setWeightP.innerHTML = `kg`;
         }

         const setRIRP = setRowClone.querySelector(".setRIR").querySelector("p");
         const setRIR = allExDetails.allExercises[`Ex${currentExID}`][`set${set}`].rir;
         setRIRP.innerHTML = setRIR;

         const setRPEP = setRowClone.querySelector(".setRPE").querySelector("p");
         const setRPE = allExDetails.allExercises[`Ex${currentExID}`][`set${set}`].rpe;
         setRPEP.innerHTML = setRPE;

         setRowClone.classList.remove(`ex${currentExID}set${set - 1}`);
         setRowClone.classList.add(`ex${currentExID}set${set}`);

         lastInsertedSetRow = lastInsertedSetRow.insertAdjacentElement(
            `afterend`,
            setRowClone
         );
      }

      // Update Global Vars.
      isExExpanded[currentExID] = true;
   } else {
      const errorMessage =
         "Input exercise's number of sets or at least reps, in order to expand the exercise.";
      errorPopoutMessage(errorMessage);
   }
   return isExExpanded;
}

// ✓✓✓
// MAYBE FIRSTEXPAND AND CONSEQUENTEPXANDS SHOULD BE 1 FUNCTION
// ALSO REFACTOR CAN MAKE THEM MORE CONCISE

