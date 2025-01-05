// This is what happens ON-CLICK
function editSetComment(currentSetCommentDiv) {
   // Prevents error when clicking inside the div while inputting.
   if (currentSetCommentDiv.querySelector("textarea")) return;

   // Change div styles to appropraite for text area.
   currentSetCommentDiv.style.overflowX = "unset";
   currentSetCommentDiv.style.overflowY = "unset";

   // Create and edit properties of the Text Area element where user inputs new data.
   const commInputTextArea = document.createElement("textarea");
   commInputTextArea.className = `inputTextArea`;

   // Keep the current comment the user has input previously.
   const previousSetComment = currentSetCommentDiv.querySelector("p").innerText;

   // Delete previous container and ADD the text area to the DOM.
   currentSetCommentDiv.firstElementChild.remove();
   currentSetCommentDiv.appendChild(commInputTextArea);

   // What the USER SEES when they click, depending on previous comment.
   if (previousSetComment === "Set Comment") {
      commInputTextArea.value = "";
   } else {
      commInputTextArea.value = previousSetComment;
   }

   // Focus user's cursor on current input text area.
   commInputTextArea.focus();

   // Events to finalize user input.
   // In case of click away (loss of focus - blur event):
   commInputTextArea.addEventListener("blur", function () {
      handleInputSetComment(
         currentSetCommentDiv,
         commInputTextArea,
         previousSetComment
      );
   });

   // In case of user pressing `Shift-Enter` to finalize input:
   commInputTextArea.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.shiftKey) {
         handleInputSetComment(
            currentSetCommentDiv,
            commInputTextArea,
            previousSetComment
         );
      }
   });
}

// This is what happens AFTER the user "blurs" or presses Shift-Enter.
function handleInputSetComment(
   currentSetCommentDiv,
   commInputTextArea,
   previousSetComment
) {
   // Save user's comment input.
   let newSetComment = commInputTextArea.value.trim();

   // Reset div styles to appropriate for p.
   currentSetCommentDiv.style.overflowX = "hidden";
   currentSetCommentDiv.style.overflowY = "auto";

   // Delete the text area to allow p to be inserted.
   currentSetCommentDiv.firstElementChild.remove();

   let errorIndicator = true;
   // Checks for user input validity.
   if (newSetComment.length > 300) {
      currentSetCommentDiv.insertAdjacentHTML("beforeend", `<p>Set Comment</p>`);

      const errorMessage = `Your input for set comment was invalid.\n
   Maximum of 300 characters.`;
      errorPopoutMessage(errorMessage);
   } else if (previousSetComment === "Set Comment" && newSetComment === "") {
      currentSetCommentDiv.insertAdjacentHTML("beforeend", `<p>Set Comment</p>`);
   } else {
      // Insert the user's input into the DOM.
      currentSetCommentDiv.insertAdjacentHTML(
         "beforeend",
         `<p>${newSetComment}</p>`
      );
      errorIndicator = false;
   }

   adjustSetRowHeight(currentSetCommentDiv, errorIndicator, previousSetComment);
}

// Adjust row height based on comment length.
function adjustSetRowHeight(currentSetCommentDiv, errorIndicator, previousComment) {
   const commentP = currentSetCommentDiv.querySelector("p");
   const commentPStyles = window.getComputedStyle(commentP);
   const newSetComment = commentP.innerText;
   const entireSetRow = currentSetCommentDiv.parentElement;

   if (errorIndicator === false) {
      // Calculate total p element height including margins.
      const pMarginTop = parseFloat(commentPStyles.marginTop);
      const pMarginBottom = parseFloat(commentPStyles.marginBottom);
      const commentPTotalHeight = commentP.scrollHeight + pMarginTop + pMarginBottom;
      // Get comment div height.
      const currentCommentDivHeight = currentSetCommentDiv.offsetHeight;

      // Compare length of previous comment with new comment.
      if (previousComment.length > newSetComment.length) {
         // Lower the height of the entire row, so no whitespace remains.
         if (commentPTotalHeight < currentCommentDivHeight) {
            const newSetRowHeightInVH = Math.max(
               (commentPTotalHeight / window.innerHeight) * 100,
               6 // Returns 8vh if height is less
            );
            entireSetRow.style.height = `${newSetRowHeightInVH}vh`;
         }

         // Align content back to center if no overflow occurs.
         if (commentP.scrollHeight <= currentCommentDivHeight) {
            currentSetCommentDiv.style.alignItems = "center";
            currentSetCommentDiv.style.overflowY = "hidden";
         }
      } else {
         // Compare p and div heights, adjust entire ex row height only if necessary.
         if (commentPTotalHeight > currentCommentDivHeight) {
            const newSetRowHeightInVH =
               (commentPTotalHeight / window.innerHeight) * 100;

            entireSetRow.style.height = `${newSetRowHeightInVH}vh`;
         }

         // Align content appropriately based on length of comment.
         if (commentP.scrollHeight > currentCommentDivHeight) {
            currentSetCommentDiv.style.alignItems = "flex-start";
            currentSetCommentDiv.style.overflowY = "auto";
         }
      }
   } else if (errorIndicator === true) {
      // Reset to default height if error.
      currentSetCommentDiv.parentElement.style.height = "6vh";
      currentSetCommentDiv.style.alignItems = "center";
      currentSetCommentDiv.style.overflowY = "auto";
   }
}

// ✓✓✓