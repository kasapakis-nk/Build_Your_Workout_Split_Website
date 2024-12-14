function editFieldSets(fieldContainerDiv) {
    const currentText = fieldContainerDiv.querySelector("p").innerText;
    let modifiedText = currentText;
    const inputField = document.createElement("textarea");

    if (currentText.startsWith("x")) {
        modifiedText = currentText.substring(1).trim();
    }

    inputField.className = `inputTextArea`;
    inputField.type = "text";
    inputField.value = modifiedText;
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
            (!isNaN(parseFloat(inputValue)) &&
                isFinite(inputValue) &&
                inputValue > 0 &&
                inputValue < 100) ||
            inputValue === ""
        ) {
            fieldContainerDiv.insertAdjacentHTML(
                "beforeend",
                `<p><strong>x</strong>${inputValue}</p>`
            );
        } else if (
            /^.-.$/.test(inputValue) ||
            /^..-..$/.test(inputValue) ||
            /^.-..$/.test(inputValue)
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
            Input must be a number (1-99) or a range (5-6).`;
            errorPopoutMessage(errorMessage);
        }

        inputField.style.textAlign = "unset";
        inputField.style.paddingTop = `0`;
    }
}
