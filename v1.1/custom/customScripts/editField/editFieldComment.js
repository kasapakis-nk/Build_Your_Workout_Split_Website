function editFieldComment(fieldContainerDiv) {
    if (fieldContainerDiv.querySelector("textarea")) return;

    fieldContainerDiv.style.overflowX = "unset";
    fieldContainerDiv.style.overflowY = "unset";

    const currentText = fieldContainerDiv.querySelector("p").innerText;
    // console.log(`current text is ${currentText}`);
    const inputField = document.createElement("textarea");

    inputField.className = `inputTextArea`;
    inputField.type = "text";

    if (currentText === "Example Comment") {
        inputField.value = "";
    } else {
        inputField.value = currentText;
    }

    fieldContainerDiv.innerHTML = "";
    fieldContainerDiv.appendChild(inputField);
    inputField.focus(); // Allows user to type immediately. No additional click.

    // In case of click away (loss of focus - blur event).
    inputField.addEventListener("blur", handleInputComment);
    // In case of user pressing `Enter` to finalize input.
    inputField.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && event.shiftKey) {
            handleInputComment();
        }
    });

    function handleInputComment() {
        while (fieldContainerDiv.firstChild) {
            fieldContainerDiv.firstChild.remove();
        }

        let inputValue = inputField.value.trim();

        fieldContainerDiv.innerHTML = `<p>${inputValue}</p>`;
        fieldContainerDiv.style.overflowX = "hidden";
        fieldContainerDiv.style.overflowY = "auto";

        if (inputValue.length > 500) {
            while (fieldContainerDiv.firstChild) {
                fieldContainerDiv.firstChild.remove();
            }
            fieldContainerDiv.insertAdjacentHTML(
                "beforeend",
                `<p>Example Comment</p>`
            );

            adjustRowHeight(fieldContainerDiv, true);
            const errorMessage = `Your input for comment was invalid.\n
            Maximum of 500 characters.`;
            errorPopoutMessage(errorMessage);
        } else if (currentText === "Example Comment" && inputValue === "") {
            while (fieldContainerDiv.firstChild) {
                fieldContainerDiv.firstChild.remove();
            }
            fieldContainerDiv.insertAdjacentHTML(
                "beforeend",
                `<p>Example Comment</p>`
            );
            adjustRowHeight(fieldContainerDiv, true);
        } else {
            fieldContainerDiv.innerHTML = `<p>${inputValue}</p>`;
            adjustRowHeight(fieldContainerDiv, false);
        }
    }
}

function adjustRowHeight(fieldContainerDiv, errorIndicator) {
    const pElementWithin = fieldContainerDiv.querySelector("p");
    const pStyle = window.getComputedStyle(pElementWithin);
    if (errorIndicator === false) {
        const pMarginTop = parseFloat(pStyle.marginTop);
        const pMarginBottom = parseFloat(pStyle.marginBottom);

        // Calculate total content height including margins
        const pTotalHeight =
            pElementWithin.scrollHeight + pMarginTop + pMarginBottom;
        const containerHeight = fieldContainerDiv.offsetHeight;

        // Adjust container height only if necessary
        if (pTotalHeight > containerHeight) {
            const newHeightInVH = (pTotalHeight / window.innerHeight) * 100;
            fieldContainerDiv.parentElement.style.height = `${newHeightInVH}vh`;
        }

        // Align content appropriately
        if (pElementWithin.scrollHeight > containerHeight) {
            fieldContainerDiv.style.alignItems = "flex-start";
            fieldContainerDiv.style.overflowY = "auto";
        }
    } else if (errorIndicator === true) {
        fieldContainerDiv.parentElement.style.height = "8vh";
        fieldContainerDiv.style.alignItems = "center";
        fieldContainerDiv.style.overflowY = "auto";
    }
}
