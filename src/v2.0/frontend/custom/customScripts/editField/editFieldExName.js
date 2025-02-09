// This is what happens ON-CLICK
// Delete previous p.
// Create, change and insert textarea.
function editFieldExName(currentRowNameDiv) {
   // Prevents error when clicking inside the div while inputting.
   if (currentRowNameDiv.querySelector("textarea")) return;

   // Create and edit properties of the Text Area element where user inputs new data.
   const nameInputTextArea = document.createElement("textarea");
   nameInputTextArea.className = `inputTextArea`;
   nameInputTextArea.style.textAlign = "center";
   nameInputTextArea.style.resize = "none";

   // Keep the current exercise name the user has input previously.
   const currentExName = currentRowNameDiv.querySelector("p").innerText.trim();

   // What the USER SEES when they click, depending on previous exercise name.
   if (
      currentExName === "Example Exercise" ||
      /^Exercise #\d$/.test(currentExName) ||
      /^Exercise #\d\d$/.test(currentExName)
   ) {
      nameInputTextArea.value = "";
   } else {
      nameInputTextArea.value = currentExName;
   }

   // Delete previous container and ADD the text area to the DOM.
   currentRowNameDiv.firstElementChild.remove();
   currentRowNameDiv.appendChild(nameInputTextArea);

   // Style to center input text vertically.
   // This has to be after insertion of textarea into DOM.
   const nameDivHeight = nameInputTextArea.parentElement.offsetHeight;
   nameInputTextArea.style.paddingTop = `${
      nameDivHeight / 2 - 0.007 * window.innerWidth
   }px`;

   // Focus user's cursor on current input text area.
   nameInputTextArea.focus();


   // Events to finalize user input.
   // In case of click away (loss of focus - blur event):
   nameInputTextArea.addEventListener("blur", function () {
    handleInputExName(currentRowNameDiv, nameInputTextArea, currentExName);
 });

 // In case of user pressing `Shift-Enter` to finalize input:
 nameInputTextArea.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
       handleInputExName(currentRowNameDiv, nameInputTextArea, currentExName);
    }
 });

}

// This is what happens AFTER the user "blurs" or presses Shift-Enter.
// Delete the text area.
// Create a new p, including user input.
function handleInputExName(
    currentRowNameDiv,
    nameInputTextArea,
    currentExName
 ) {
   // Save user's exercise name input.
   let userExNameInput = nameInputTextArea.value.trim();

      // Delete the text area to allow p to be inserted.
      currentRowNameDiv.firstElementChild.remove();

      // Checks for user input validity.
   if (userExNameInput.length > 70) {
    currentRowNameDiv.insertAdjacentHTML(
        "beforeend",
        `<p>Example Exercise</p>`
    );
    allExDetails = updateAllExDetailsAfterErrorNameChange(currentRowNameDiv, allExDetails);

    const errorMessage = `Your input for exercise name was invalid.\n
    Maximum of 70 characters.`;
    errorPopoutMessage(errorMessage);
} else if (
    (currentExName === "Example Exercise" ||
        /^Exercise #\d$/.test(currentExName) ||
        /^Exercise #\d\d$/.test(currentExName)) &&
    userExNameInput === ""
) {
    currentRowNameDiv.insertAdjacentHTML(
        "beforeend",
        `<p>${currentExName}</p>`
    );
} else {
    currentRowNameDiv.innerHTML = `<p>${userExNameInput}</p>`;
    allExDetails = updateAllExDetailsAfterCorrectNameChange(currentRowNameDiv, userExNameInput, allExDetails);
}
}