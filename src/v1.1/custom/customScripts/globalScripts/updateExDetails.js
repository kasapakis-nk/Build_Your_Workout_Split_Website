function updateExDetails(currentExID, allExDetails, exSets, exReps, origin) {
   // Case 1: You update after adding a new Exercise.
   if (origin === "AddEx") {
      allExDetails.allExercises[`Ex${currentExID}`] = {
         name: `\u2014`,
         sets: `\u2014`,
         reps: `\u2014`,
      };

      return allExDetails;
   }


   //the ex <= currentNumOfExs, the = might be useless. Test.
   // Case 2: You update after deleting any Exercise.
   if (origin === "DelEx") {
      const currentNumOfExs = Object.keys(allExDetails.allExercises).length;
      
      for (let ex = currentExID; ex <= currentNumOfExs; ex++) {
         const currentExKey = `Ex${ex}`;
         const nextExKey = `Ex${ex + 1}`;

         if (allExDetails.allExercises[nextExKey]) {
            allExDetails.allExercises[currentExKey] = {
               ...allExDetails.allExercises[nextExKey],
            };

            // Dom updates.
            const idToUpdateTo = `Row${ex}`;
            const nextEx = document.querySelector(`#Row${ex + 1}`);
            nextEx.id = idToUpdateTo;
         }
      }

      console.log(`Ex${currentNumOfExs - 1}`);
      delete allExDetails.allExercises[`Ex${currentNumOfExs - 1}`];

      return allExDetails;
   }

   // Case 3: You update after changing overall Ex Sets number.
   if (origin === "ExSets") {
      if (exSets[0] === "") {
         exSets[0] = 0;
      }
      const previousExSets = exSets[0];
      const newExSets = exSets[1];

      allExDetails.allExercises[`Ex${currentExID}`].sets = Number(newExSets);
      const checkReps = allExDetails.allExercises[`Ex${currentExID}`].reps;
      exReps = Number.isFinite(parseFloat(checkReps)) ? checkReps : "\u2014";

      // User added more sets.
      if (previousExSets < newExSets) {
         for (let set = previousExSets; set < newExSets; set++) {
            allExDetails.allExercises[`Ex${currentExID}`][`set${set}`].reps = exReps;
         }
      }
      // User lowered the number of sets.
      else if (previousExSets > newExSets) {
         for (let set = newExSets; set < previousExSets; set++) {
            delete allExDetails.allExercises[`Ex${currentExID}`][`set${set}`];
         }
      }

      return allExDetails;
   }

   // Case 4: You update after changing overall Ex Reps.
   if (origin === "ExReps") {
      allExDetails.allExercises[`Ex${currentExID}`].reps = Number(exReps);
      const exSets = allExDetails.allExercises[`Ex${currentExID}`].sets;

      if (Number.isFinite(parseFloat(exSets)) && exSets > 1) {
         for (let set = 0; set < exSets; set++) {
            allExDetails.allExercises[`Ex${currentExID}`][`set${set}`].reps =
               Number(exReps);
         }
      }

      return allExDetails;
   }
}

// ✓✓✓
