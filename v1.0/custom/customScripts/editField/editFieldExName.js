function editFieldExName(fieldContainerDiv) {
    const currentText = fieldContainerDiv.querySelector("p").innerText;
    const inputField = document.createElement("textarea");

    let modifiedText = currentText.trim();

    inputField.className = `inputTextArea`;
    inputField.type = "text";
    if (
        currentText === "Example Exercise" ||
        /^Exercise #\d$/.test(currentText) ||
        /^Exercise #\d\d$/.test(currentText)
    ) {
        inputField.value = "";
    } else {
        inputField.value = modifiedText;
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
    inputField.addEventListener("blur", handleInputExName);
    // In case of user pressing `Enter` to finalize input.
    inputField.addEventListener("keydown", function (event) {
        if (
            event.key === "Enter" ||
            (event.key === "Enter" && event.shiftKey)
        ) {
            handleInputExName();
        }
    });

    function handleInputExName() {
        while (fieldContainerDiv.firstChild) {
            fieldContainerDiv.firstChild.remove();
        }

        let inputValue = inputField.value.trim();

        if (inputValue.length > 100) {
            fieldContainerDiv.insertAdjacentHTML(
                "beforeend",
                `<p>Example Exercise</p>`
            );

            const errorMessage = `Your input for exercise name was invalid.\n
            Maximum of 100 characters.`;
            errorPopoutMessage(errorMessage);
        } else if (
            (currentText === "Example Exercise" ||
                /^Exercise #\d$/.test(currentText) ||
                /^Exercise #\d\d$/.test(currentText)) &&
            inputValue === ""
        ) {
            fieldContainerDiv.insertAdjacentHTML(
                "beforeend",
                `<p>${currentText}</p>`
            );
        } else {
            fieldContainerDiv.innerHTML = `<p>${inputValue}</p>`;
        }
    }
}
