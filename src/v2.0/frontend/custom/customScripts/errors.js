function errorPopoutMessage(errorMessage) {
    const errorMesPopoutDiv = document.querySelector('.errorMessageOutput');
    // Container in which the error message will be shown.
    const errorP = document.createElement('p');
    errorP.innerHTML = `<strong>${errorMessage}</strong>`;
    errorP.classList.add('errorFadeOut');

    errorMesPopoutDiv.appendChild(errorP);
    setTimeout(function() {
        errorP.remove();
    }, 4000);
}