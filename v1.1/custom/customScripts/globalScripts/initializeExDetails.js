function initializeExDetailsSets(
   currentExID,
   allExDetails,
   newExSets,
   newExReps,
   origin
) {
   if (origin === "ExSets") {
      let checkReps = allExDetails.allExercises[`Ex${currentExID}`].reps;
      if (!Number.isFinite(parseFloat(checkReps))) {
         checkReps = "\u2014";
      }

      let set = newExSets - 1;
      while (
         !allExDetails.allExercises[`Ex${currentExID}`][`set${set}`] &&
         set >= 0
      ) {
         allExDetails.allExercises[`Ex${currentExID}`][`set${set}`] = {
            setNum: set + 1,
            weight: "\u2014",
            reps: checkReps,
            setType: "straight",
            rir: "\u2014",
            rpe: "\u2014",
            rm10: "\u2014",
            rest: "\u2014",
         };
         set--;
      }

      return allExDetails;
   }

   if (origin === "ExReps") {
      newExSets = allExDetails.allExercises[`Ex${currentExID}`].sets;
      if (!Number.isFinite(parseFloat(newExSets))) {
         newExSets = 0;
         allExDetails.allExercises[`Ex${currentExID}`].sets = 1;
      }

      for (let set = 0; set <= newExSets; set++) {
         if (!allExDetails.allExercises[`Ex${currentExID}`][`set${set}`]) {
            allExDetails.allExercises[`Ex${currentExID}`][`set${set}`] = {
               setNum: set + 1,
               weight: "\u2014",
               reps: Number(newExReps),
               setType: "straight",
               rir: "\u2014",
               rpe: "\u2014",
               rm10: "\u2014",
               rest: "\u2014",
            };
         }
      }

      return allExDetails;
   }
}

// ✓✓✓
