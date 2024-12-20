function errorPopoutMessage(errorMessage) {
    const errorDiv = document.querySelector('.errorOutput')
    const errorP = document.createElement('p');
    errorP.innerHTML = `<strong>${errorMessage}</strong>`;
    errorP.classList.add('errorFadeAway');

    errorDiv.appendChild(errorP);
    setTimeout(function() {
        errorP.remove();
    }, 4000);
}