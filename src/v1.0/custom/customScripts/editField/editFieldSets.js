function editFieldSets(fieldContainerDiv) {
    if (fieldContainerDiv.querySelector("textarea")) return;

    const currentText = fieldContainerDiv.querySelector("p").innerText;
    const inputField = document.createElement("textarea");

    let modifiedText = currentText;
    if (currentText.startsWith("x")) {
        modifiedText = currentText.substring(1).trim();
    }

    inputField.className = `inputTextArea`;
    inputField.type = "text";
    if (currentText !== "Sets") {
        inputField.value = modifiedText;
    } else {
        inputField.value = "";
    }
    fieldContainerDiv.innerHTML = "";
    fieldContainerDiv.appendChild(inputField);

    inputField.style.textAlign = "center";
    inputField.style.resize = "none";
    const containerHeight = inputField.parentElement.offsetHeight;
    inputField.style.paddingTop = `${
        containerHeight / 2 - 0.007 * window.innerWidth
    }px`;

    inputField.focus(); // Allows user to type immediately. No additional click.

    // In case of click away (loss of focus - blur event).
    inputField.addEventListener("blur", handleInputSets);
    // In case of user pressing `Enter` to finalize input.
    inputField.addEventListener("keydown", function (event) {
        if (
            event.key === "Enter" ||
            (event.key === "Enter" && event.shiftKey)
        ) {
            handleInputSets();
        }
    });

    function handleInputSets() {
        while (fieldContainerDiv.firstChild) {
            fieldContainerDiv.firstChild.remove();
        }

        let inputValue = inputField.value.trim();

        if (
            (Number.isFinite(parseFloat(inputValue)) &&
                inputValue > 0 &&
                inputValue < 100) ||
            inputValue === ""
        ) {
            fieldContainerDiv.insertAdjacentHTML(
                "beforeend",
                `<p><strong>x</strong>${inputValue}</p>`
            );
        } else if (
            /^\d-\d$/.test(inputValue) ||
            /^\d\d-\d\d$/.test(inputValue) ||
            /^\d-\d\d$/.test(inputValue)
        ) {
            fieldContainerDiv.insertAdjacentHTML(
                "beforeend",
                `<p><strong>x</strong>${inputValue}</p>`
            );
        } else {
            fieldContainerDiv.insertAdjacentHTML(
                "beforeend",
                `<p><strong>x</strong></p>`
            );

            const errorMessage = `Your input for sets was invalid.\n
                Input must be a number (1-99) or a range (e.g. 3-4).`;
            errorPopoutMessage(errorMessage);
        }

        inputField.style.textAlign = "unset";
        inputField.style.paddingTop = `0`;
    }
}
