let rowIndex = 2;

const rowToCopy = document.querySelector(`.titleRow`);
const main = rowToCopy.parentElement 


function addRow(rowToCopy, main, addButton) {
    const clone = rowToCopy.cloneNode(true);
    main.insertBefore(clone, addButton.parentElement);

    const newRow = document.querySelector(`main > div:nth-child(${rowIndex+1})`);
    newRow.className = `newRow`;
    newRow.id = `Row ${rowIndex}`;

    const exerciseName = newRow.querySelector('.titleName');
    exerciseName.querySelector(`p`).textContent = `Exercise #${rowIndex}`;
    exerciseName.className = `exerciseName`
    exerciseName.setAttribute('onclick', 'editFieldExName(this)');

    const numberOfSets = newRow.querySelector('.titleSets');
    numberOfSets.className = `numberOfSets`;
    numberOfSets.setAttribute('onclick', 'editFieldSets(this)');

    const numberOfRepetitions = newRow.querySelector('.titleReps');
    numberOfRepetitions.className = `numberOfRepetitions`
    numberOfRepetitions.setAttribute('onclick', 'editFieldReps(this)');

    const exerciseComment = newRow.querySelector('.titleComment');
    exerciseComment.querySelector(`p`).textContent = `Example Comment`;
    exerciseComment.className = `exerciseComment`
    exerciseComment.setAttribute('onclick', 'editFieldComment(this)');

    const deleteButton = newRow.querySelector('.deleteButtonTitle');
    deleteButton.className = `deleteButton`
    deleteButton.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';

    getAllRowDivs();
    applyDragEventsToNewRows();
    rowIndex++;
}

    function deleteRow(deleteButton) {
    deleteButton.parentElement.parentElement.remove();

    rowIndex--;
}
