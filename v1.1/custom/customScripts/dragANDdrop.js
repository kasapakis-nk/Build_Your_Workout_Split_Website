let allRowDivs = [];

function getAllRowDivs() {
    allRowDivs = Array.from(document.querySelectorAll("div")).filter(
        (div) => /^Row \d$/.test(div.id) || /^Row \d\d$/.test(div.id)
    );
}

getAllRowDivs();
applyDragEventsToNewRows();

let divBeingDraggedCurrently = null;
let dragTimerIndicator = false;
let startDragTimer;

function applyDragEventsToNewRows() {
    allRowDivs.forEach((div) => {
        div.removeEventListener("mousedown", identifyRowAsBeingDragged);
        div.addEventListener("mousedown", identifyRowAsBeingDragged);

        div.removeEventListener("mouseup", identifyClickVsHoldToDrag);
        div.addEventListener("mouseup", identifyClickVsHoldToDrag);

        document.removeEventListener("mouseup", resetAfterDragComplete);
        document.addEventListener("mouseup", resetAfterDragComplete);

        div.removeEventListener("mousemove", draggingProcessSettings);
        div.addEventListener("mousemove", draggingProcessSettings);
    });
}

function identifyRowAsBeingDragged() {
    divBeingDraggedCurrently = this;
    dragTimerIndicator = true;
    startDragTimer = setTimeout(() => {
        dragTimerIndicator = false;
        divBeingDraggedCurrently.classList.add("divBeingDraggedCurrently");
        document.body.style.userSelect = "none";
    }, 100);
}

function identifyClickVsHoldToDrag() {
    if (dragTimerIndicator) {
        clearTimeout(startDragTimer);
        dragTimerIndicator = false;
        if (divBeingDraggedCurrently) {
            divBeingDraggedCurrently.classList.remove(
                "divBeingDraggedCurrently"
            );
            divBeingDraggedCurrently = null;
            document.body.style.userSelect = "auto";
        }
    }
}

function resetAfterDragComplete() {
    if (divBeingDraggedCurrently) {
        divBeingDraggedCurrently.classList.remove("divBeingDraggedCurrently");
        divBeingDraggedCurrently = null;
        document.body.style.userSelect = "auto";
    }
}

function draggingProcessSettings(event) {
    if (divBeingDraggedCurrently && divBeingDraggedCurrently !== this) {
        const targetDivGeometry = this.getBoundingClientRect();
        const mouseYpostition = event.clientY;

        if (
            mouseYpostition >
            targetDivGeometry.top + targetDivGeometry.height / 2
        ) {
            this.parentNode.insertBefore(
                divBeingDraggedCurrently,
                this.nextSibling
            ); // Insert dragged div below the div being hovered
        } else if (
            mouseYpostition <
            targetDivGeometry.top + targetDivGeometry.height / 2
        ) {
            this.parentNode.insertBefore(divBeingDraggedCurrently, this); // Insert dragged div above the div being hovered
        }
    }
}

// targetDivGeometry.top is the distance from the top of the page
// to the top edge of the div being hovered over currently

// y position of the mouse is 0 at the top of the viewport
// and icreases as we move down

// (mouseYpostition > targetDivGeometry.top + targetDivGeometry.height / 2)
// checks if the mouse is below the hovered div's midpoint line

// maybe the below

// let testVar = false;

//         div.addEventListener("mouseleave", () => {
//             if (testVar) {
//                 clearTimeout(startDragTimer);
//                 dragTimerIndicator = false;
//                 if (divBeingDraggedCurrently) {
//                     divBeingDraggedCurrently.classList.remove(
//                         "divBeingDraggedCurrently"
//                     );
//                     divBeingDraggedCurrently = null;
//                     document.body.style.userSelect = "auto";
//                 }
//             }
//         });
