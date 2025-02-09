// This is what happens ON-CLICK
// Delete previous p.
// Create, change and insert textarea.
function editFieldComment(currentRowCommentDiv) {
   // Prevents error when clicking inside the div while inputting.
   if (currentRowCommentDiv.querySelector("textarea")) return;

   // Change div styles to appropraite for text area.
   currentRowCommentDiv.style.overflowX = "unset";
   currentRowCommentDiv.style.overflowY = "unset";

   // Create and edit properties of the Text Area element where user inputs new data.
   const commInputTextArea = document.createElement("textarea");
   commInputTextArea.className = `inputTextArea`;

   // Keep the current comment the user has input previously.
   const currentComment = currentRowCommentDiv.querySelector("p").innerText;

   // Delete previous container and ADD the text area to the DOM.
   currentRowCommentDiv.firstElementChild.remove();
   currentRowCommentDiv.appendChild(commInputTextArea);

   // What the USER SEES when they click, depending on previous comment.
   if (currentComment === "Example Comment") {
      commInputTextArea.value = "";
   } else {
      commInputTextArea.value = currentComment;
   }

   // Focus user's cursor on current input text area.
   commInputTextArea.focus();

   // Events to finalize user input.
   // In case of click away (loss of focus - blur event):
   commInputTextArea.addEventListener("blur", function () {
      handleInputComment(currentRowCommentDiv, commInputTextArea, currentComment);
   });

   // In case of user pressing `Shift-Enter` to finalize input:
   commInputTextArea.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.shiftKey) {
         handleInputComment(currentRowCommentDiv, commInputTextArea, currentComment);
      }
   });
}

// This is what happens AFTER the user "blurs" or presses Shift-Enter.
// Delete the text area.
// Create a new p, including user input.
function handleInputComment(
   currentRowCommentDiv,
   commInputTextArea,
   currentComment
) {
   // Save user's comment input.
   let userCommInput = commInputTextArea.value.trim();

   // Reset div styles to appropriate for p.
   currentRowCommentDiv.style.overflowX = "hidden";
   currentRowCommentDiv.style.overflowY = "auto";

   // Delete the text area to allow p to be inserted.
   currentRowCommentDiv.firstElementChild.remove();
   // Checks for user input validity.
   if (userCommInput.length > 500) {
      currentRowCommentDiv.insertAdjacentHTML("beforeend", `<p>Example Comment</p>`);
      adjustRowHeight(currentRowCommentDiv, true, currentComment);

      const errorMessage = `Your input for comment was invalid.\n
  Maximum of 500 characters.`;
      errorPopoutMessage(errorMessage);
   } else if (currentComment === "Example Comment" && userCommInput === "") {
      currentRowCommentDiv.insertAdjacentHTML("beforeend", `<p>Example Comment</p>`);
      adjustRowHeight(currentRowCommentDiv, true, currentComment);
   } else {
      // Insert the user's input into the DOM.
      currentRowCommentDiv.insertAdjacentHTML(
         "beforeend",
         `<p>${userCommInput}</p>`
      );
      adjustRowHeight(currentRowCommentDiv, false, currentComment);
   }
}

// Adjust row height based on comment length.
function adjustRowHeight(currentRowCommentDiv, errorIndicator, previousComment) {
   const commentP = currentRowCommentDiv.querySelector("p");
   const commentPStyles = window.getComputedStyle(commentP);
   const newComment = commentP.innerText;
   const entireExRow = currentRowCommentDiv.parentElement;

   if (errorIndicator === false) {
      // Calculate total p element height including margins.
      const pMarginTop = parseFloat(commentPStyles.marginTop);
      const pMarginBottom = parseFloat(commentPStyles.marginBottom);
      const commentPTotalHeight = commentP.scrollHeight + pMarginTop + pMarginBottom;
      // Get comment div height.
      const currentCommentDivHeight = currentRowCommentDiv.offsetHeight;


      // Compare length of previous comment with new comment.
      if (previousComment.length > newComment.length) {
         // Lower the height of the entire row, so no whitespace remains.
         if (commentPTotalHeight < currentCommentDivHeight) {
            const newExRowHeightInVH = Math.max(
               (commentPTotalHeight / window.innerHeight) * 100,
               8 // Returns 8vh if height is less
            );
            entireExRow.style.height = `${newExRowHeightInVH}vh`;
         }

         // Align content back to center if no overflow occurs.
         if (commentP.scrollHeight <= currentCommentDivHeight) {
            currentRowCommentDiv.style.alignItems = "center";
            currentRowCommentDiv.style.overflowY = "hidden";
         }
      } else {
         // Compare p and div heights, adjust entire ex row height only if necessary.
         if (commentPTotalHeight > currentCommentDivHeight) {
            const newExRowHeightInVH =
               (commentPTotalHeight / window.innerHeight) * 100;

               entireExRow.style.height = `${newExRowHeightInVH}vh`;
         }

         // Align content appropriately based on length of comment.
         if (commentP.scrollHeight > currentCommentDivHeight) {
            currentRowCommentDiv.style.alignItems = "flex-start";
            currentRowCommentDiv.style.overflowY = "auto";
         }
      }
   } else if (errorIndicator === true) {
      // Reset to default height if error.
      currentRowCommentDiv.parentElement.style.height = "8vh";
      currentRowCommentDiv.style.alignItems = "center";
      currentRowCommentDiv.style.overflowY = "auto";
   }
}
