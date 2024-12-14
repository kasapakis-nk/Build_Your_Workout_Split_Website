let rowIndex = 1;

const rowToCopy = document.querySelector(`.titleRow`);
const main = rowToCopy.parentElement 


function addRow(rowToCopy, main, addButton) {
    const clone = rowToCopy.cloneNode(true);
    main.insertBefore(clone, addButton.parentElement);

    const newRow = document.querySelector(`main > div:nth-child(${rowIndex+1})`);
    newRow.className = `newRow`

    const exerciseName = newRow.querySelector('.titleName p');
    exerciseName.textContent = `Exercise #${rowIndex}`;
    exerciseName.parentElement.className = `exerciseName`

    const numberOfSets = newRow.querySelector('.titleSets');
    numberOfSets.className = `numberOfSets`
    numberOfSets.setAttribute('onclick', 'editFieldSets(this)');

    const numberOfRepetitions = newRow.querySelector('.titleReps');
    numberOfRepetitions.className = `numberOfRepetitions`
    numberOfRepetitions.setAttribute('onclick', 'editFieldReps(this)');

    const exerciseComment = newRow.querySelector('.titleComment');
    exerciseComment.className = `exerciseComment`
    exerciseComment.setAttribute('onclick', 'editFieldComment(this)');

    const deleteButton = newRow.querySelector('.deleteButtonTitle');
    deleteButton.className = `deleteButton`
    deleteButton.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';

    rowIndex++;
}

    function deleteRow(deleteButton) {
    deleteButton.parentElement.parentElement.remove();

    rowIndex--;
}
