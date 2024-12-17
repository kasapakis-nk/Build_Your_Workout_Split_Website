function editFieldReps(fieldContainerDiv) {
    const currentText = fieldContainerDiv.querySelector("p").innerText;
    const inputField = document.createElement("textarea");

    inputField.className = `inputTextArea`;
    inputField.type = "text";
    if ((currentText === "Reps") || (currentText.startsWith("\u2014")))  {
        inputField.value = "";
    } else {
        inputField.value = currentText;
    }
    fieldContainerDiv.innerHTML = "";
    fieldContainerDiv.appendChild(inputField);

    inputField.style.textAlign = "center";
    inputField.style.resize = "none";

    const containerHeight = inputField.parentElement.offsetHeight;
    inputField.style.paddingTop = `${
        containerHeight / 2 - 0.007 * window.innerWidth
    }px`;

    inputField.focus();
    // In case of click away (loss of focus - blur event).
    inputField.addEventListener("blur", handleInputReps);
    // In case of user pressing `Enter` to finalize input.
    inputField.addEventListener("keydown", function (event) {
        if (
            event.key === "Enter" ||
            (event.key === "Enter" && event.shiftKey)
        ) {
            handleInputReps();
        }
    });

    function handleInputReps() {
        while (fieldContainerDiv.firstChild) {
            fieldContainerDiv.firstChild.remove();
        }

        let inputValue = inputField.value.trim();

        if (
            !isNaN(parseFloat(inputValue)) &&
            isFinite(inputValue) &&
            inputValue > 0 &&
            inputValue < 1000
        ) {
            fieldContainerDiv.insertAdjacentHTML(
                "beforeend",
                `<p>${inputValue}</p>`
            );
        } else if (
            /^\d-\d$/.test(inputValue) ||
            /^\d\d-\d\d$/.test(inputValue) ||
            /^\d\d\d-\d\d\d$/.test(inputValue) ||
            /^\d-\d\d$/.test(inputValue) ||
            /^\d\d-\d\d\d$/.test(inputValue)
        ) {
            fieldContainerDiv.insertAdjacentHTML(
                "beforeend",
                `<p>${inputValue}</p>`
            );
        } else {
            fieldContainerDiv.insertAdjacentHTML(
                "beforeend",
                `<p><span class="emdash">&mdash;</span></p>`
            );
            if (inputValue !== "") {
            const errorMessage = `Your input for reps was invalid.\n
                Input must be a number (1-999) or a range (e.g. 12-15).`;
            errorPopoutMessage(errorMessage);
            }
        }

        inputField.style.textAlign = "unset";
        inputField.style.paddingTop = `0`;
    }
}
