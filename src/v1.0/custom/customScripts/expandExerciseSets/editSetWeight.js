function editSetWeight(fieldContainerDiv) {
    const currentText = fieldContainerDiv.querySelector("p").innerText;
    const inputField = document.createElement("textarea");

    let modifiedText = currentText;
    if (currentText.startsWith("kg")) {
        modifiedText = currentText.substring(2).trim();
    }

    if (currentText.endsWith("kg")) {
        modifiedText = currentText.substring(0, currentText.length - 2).trim();
    }


    inputField.className = `inputTextArea`;
    inputField.type = "text";
    if (currentText !== "kg") {
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
            (Number.isFinite(parseFloat(inputValue)) && (inputValue >= 0)) ||
            inputValue === ""
        ) {
            if (inputValue>99999) {
                fieldContainerDiv.insertAdjacentHTML("beforeend", `<p>kg</p>`);

                const errorMessage = `Your input for weight was invalid.\n
                    Input must be a number less than 99.999. Chill bruh, you ain't no Hulk...`;
                errorPopoutMessage(errorMessage);
            } else {
            fieldContainerDiv.insertAdjacentHTML(
                "beforeend",
                `<p>${inputValue}kg</p>`
            );}
        } else {
            fieldContainerDiv.insertAdjacentHTML("beforeend", `<p>kg</p>`);

            const errorMessage = `Your input for weight was invalid.\n
                Input must be a positive number.`;
            errorPopoutMessage(errorMessage);
        }

        inputField.style.textAlign = "unset";
        inputField.style.paddingTop = `0`;
    }
}
