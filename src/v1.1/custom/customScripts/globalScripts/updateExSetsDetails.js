//generlize below.
function getSetID(currentSetFieldDiv, currentExID) {
   const thisSetClass = Array.from(currentSetFieldDiv.parentElement.classList).find(
      (cls) => cls.startsWith(`ex${currentExID}set`)
   );

   let currentSetID = thisSetClass.match(/set(\d+)$/);
   currentSetID = currentSetID[1];

   return currentSetID;
}

function updateSetDetails(
   currentExID,
   currentSetID,
   allExDetails,
   newInput,
   origin
) {
   // Case 1: You update after changing set WEIGHT.
   if (origin === "SetWeight") {
      allExDetails.allExercises[`Ex${currentExID}`][`set${currentSetID}`].weight =
         Number(newInput);

      return allExDetails;
   }

   // Case 2: You update after changing set REPS.
   if (origin === "SetReps") {
      allExDetails.allExercises[`Ex${currentExID}`][`set${currentSetID}`].reps =
         Number(newInput);

      return allExDetails;
   }

   // Case 3: You update after changing set TYPE.

   // Case 4: You update after changing set RIR.
   if (origin === "SetRIR") {
      allExDetails.allExercises[`Ex${currentExID}`][`set${currentSetID}`].rir =
         Number(newInput);

      allExDetails = correspondingRPEorRIR(
         currentExID,
         currentSetID,
         newInput,
         allExDetails,
         "rir"
      );

      return allExDetails;
   }

   // Case 5: You update after changing set RPE.
   if (origin === "SetRPE") {
      allExDetails.allExercises[`Ex${currentExID}`][`set${currentSetID}`].rpe =
         Number(newInput);

      allExDetails = correspondingRPEorRIR(
         currentExID,
         currentSetID,
         newInput,
         allExDetails,
         "rpe"
      );

      return allExDetails;
   }

   // Case 6: You update after changing set 10RM. (autoCalculation so far)
   if (origin === "Set10RM") {
      allExDetails.allExercises[`Ex${currentExID}`][`set${currentSetID}`].rm10 =
         Number(newInput);

      return allExDetails;
   }

   // Case 7: You update after changing set Rest Timer.
   if (origin === "SetRest") {
      allExDetails.allExercises[`Ex${currentExID}`][`set${currentSetID}`].rest =
         Number(newInput);

      return allExDetails;
   }

   // Case 8: You update after deleting a set.
   if (origin === "DelSet") {
      const currentExKey = `Ex${currentExID}`;
      const currentExNumOfSets = allExDetails.allExercises[currentExKey].sets;
      allExDetails.allExercises[currentExKey].sets -= 1;

      // allExDetails update.
      for (let set = currentSetID; set <= currentExNumOfSets; set++) {
         const currentSetKey = `set${set}`;
         const nextSetKey = `set${Number(set) + 1}`;

         if (allExDetails.allExercises[currentExKey][nextSetKey]) {
            allExDetails.allExercises[currentExKey][currentSetKey] = {
               ...allExDetails.allExercises[currentExKey][nextSetKey],
            };
         }
      }

      delete allExDetails.allExercises[currentExKey][`set${currentExNumOfSets - 1}`];

      // Dom updates.
      for (let set = Number(currentSetID) + 1; set <= currentExNumOfSets; set++) {
         const setToRemoveClass = document.querySelector(
            `.ex${currentExID}set${set}`
         );

         if (setToRemoveClass) {
            setToRemoveClass.classList.remove(`ex${currentExID}set${set}`);
            setToRemoveClass.classList.add(`ex${currentExID}set${Number(set) - 1}`);
            const currentSetNumberDiv = setToRemoveClass.querySelector(`.setNumber`);
            currentSetNumberDiv.querySelector("p").innerHTML = `Set ${set}`;
         }
      }

      return allExDetails;
   }
}

function correspondingRPEorRIR(
   currentExID,
   currentSetID,
   newInput,
   allExDetails,
   origin
) {
   if (origin === "rir") {
      const correspondingRPE = parseFloat(10 - newInput);

      allExDetails.allExercises[`Ex${currentExID}`][`set${currentSetID}`].rpe =
         correspondingRPE;

      const currentSetRPEDiv = document
         .querySelector(`.ex${currentExID}set${currentSetID}`)
         .querySelector(".setRPE");
      currentSetRPEDiv.firstElementChild.remove();
      currentSetRPEDiv.insertAdjacentHTML("beforeend", `<p>${correspondingRPE}</p>`);

      return allExDetails;
   }

   if (origin === "rpe") {
      const correspondingRIR = parseFloat(10 - newInput);

      allExDetails.allExercises[`Ex${currentExID}`][`set${currentSetID}`].rir =
         correspondingRIR;

      const currentSetRIRDiv = document
         .querySelector(`.ex${currentExID}set${currentSetID}`)
         .querySelector(".setRIR");
      currentSetRIRDiv.firstElementChild.remove();
      currentSetRIRDiv.insertAdjacentHTML("beforeend", `<p>${correspondingRIR}</p>`);

      return allExDetails;
   }
}
