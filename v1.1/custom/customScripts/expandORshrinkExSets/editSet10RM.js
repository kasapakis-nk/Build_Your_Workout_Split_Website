// ADD FUNCTIONALITY TO EDIT THIS FIELD
// THEN IT ASKS FOR RPE OR RIR THE USER WANTS
// OR IT CAN ASK FOR HOW MANY REPS THEY WANNA DO
// AND THEN IT REVERSE CALCULATES THE OTHER VARIABLE
//IF YOU GIVE RIR IT GIVES REPS TO ACHIEVE SAID 10RM AND VICE VERSA

// PROVIDE SOURCES FOR YOUR FOMULAS FOR 10RM AND GIVE DIFFERENT
// OPTIONS, LIKE USE THE BRZYCKI FORMULA OR THE EPLEY ONE
// below is bryzcki

// ALSO GIVE OPTIONS FOR 1RM IN THE SAME CONTAINER

/*function that calculates 10rm after input to either rir
or rpe. the calculation is probably the same. if it's not do origin stuff.
then updates allExDetails and updates all sets as well (if expanded?). */

function autoCalculate10RM(
   currentExID,
   currentSetID,
   allExDetails,
   newSetWeight,
   newSetReps,
   newSetRIRorRPE
) {
   // When user enters RIR/RPE last, after reps and weight.
   if (
      !Number.isFinite(parseFloat(newSetReps)) &&
      !Number.isFinite(parseFloat(newSetWeight))
   ) {
      const setReps =
         allExDetails.allExercises[`Ex${currentExID}`][`set${currentSetID}`].reps;
      const setWeight =
         allExDetails.allExercises[`Ex${currentExID}`][`set${currentSetID}`].weight;
      if (
         Number.isFinite(parseFloat(setReps)) &&
         Number.isFinite(parseFloat(setWeight))
      ) {
         // Calculate 1RM which is the basis for all other calculations.
         //Bryzcki formula.
         const set1RM =
            setWeight / (1.0278 - 0.0278 * (setReps + Number(newSetRIRorRPE)));

         // 10RM Calculation.
         const set10RM = (set1RM * (1.0278 - 0.0278 * 10)).toFixed(1);

         const currentSet10RMDiv = document
            .querySelector(`.ex${currentExID}set${currentSetID}`)
            .querySelector(".set10RM");

         // Delete the text area to allow p to be inserted.
         currentSet10RMDiv.firstElementChild.remove();

         // Insert calculated 10RM value into the DOM.
         currentSet10RMDiv.insertAdjacentHTML("beforeend", `<p>${set10RM}</p>`);

         allExDetails = updateSetDetails(
            currentExID,
            currentSetID,
            allExDetails,
            set10RM,
            "Set10RM"
         );

         return allExDetails;
      }
   }

   // When user enters Reps last, after weight and rir/rpe.
   if (
      !Number.isFinite(parseFloat(newSetRIRorRPE)) &&
      !Number.isFinite(parseFloat(newSetWeight))
   ) {
      const setRIR =
         allExDetails.allExercises[`Ex${currentExID}`][`set${currentSetID}`].rir;
      const setWeight =
         allExDetails.allExercises[`Ex${currentExID}`][`set${currentSetID}`].weight;
      if (
         Number.isFinite(parseFloat(setRIR)) &&
         Number.isFinite(parseFloat(setWeight))
      ) {
         // Calculate 1RM which is the basis for all other calculations.
         //Bryzcki formula.
         const set1RM =
            setWeight / (1.0278 - 0.0278 * (Number(newSetReps) + Number(setRIR)));

         // 10RM Calculation.
         const set10RM = (set1RM * (1.0278 - 0.0278 * 10)).toFixed(1);

         const currentSet10RMDiv = document
            .querySelector(`.ex${currentExID}set${currentSetID}`)
            .querySelector(".set10RM");

         // Delete the text area to allow p to be inserted.
         currentSet10RMDiv.firstElementChild.remove();

         // Insert calculated 10RM value into the DOM.
         currentSet10RMDiv.insertAdjacentHTML("beforeend", `<p>${set10RM}</p>`);

         allExDetails = updateSetDetails(
            currentExID,
            currentSetID,
            allExDetails,
            set10RM,
            "Set10RM"
         );

         return allExDetails;
      }
   }

   // When user enters Weight last, after reps and rir/rpe.
   if (
    !Number.isFinite(parseFloat(newSetRIRorRPE)) &&
    !Number.isFinite(parseFloat(newSetReps))
 ) {
    const setRIR =
       allExDetails.allExercises[`Ex${currentExID}`][`set${currentSetID}`].rir;
    const setReps =
       allExDetails.allExercises[`Ex${currentExID}`][`set${currentSetID}`].reps;
    if (
       Number.isFinite(parseFloat(setRIR)) &&
       Number.isFinite(parseFloat(setReps))
    ) {
       // Calculate 1RM which is the basis for all other calculations.
       //Bryzcki formula.
       const set1RM =
          newSetWeight / (1.0278 - 0.0278 * (Number(setReps) + Number(setRIR)));

       // 10RM Calculation.
       const set10RM = (set1RM * (1.0278 - 0.0278 * 10)).toFixed(1);

       const currentSet10RMDiv = document
          .querySelector(`.ex${currentExID}set${currentSetID}`)
          .querySelector(".set10RM");

       // Delete the text area to allow p to be inserted.
       currentSet10RMDiv.firstElementChild.remove();

       // Insert calculated 10RM value into the DOM.
       currentSet10RMDiv.insertAdjacentHTML("beforeend", `<p>${set10RM}</p>`);

       allExDetails = updateSetDetails(
          currentExID,
          currentSetID,
          allExDetails,
          set10RM,
          "Set10RM"
       );

       return allExDetails;
    }
 }
}

// make the repeated part a different function,
// so you don't repeat it all the time.
