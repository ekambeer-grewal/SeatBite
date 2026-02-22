
const svg = document.getElementById("stadium");

const seatSize = 25;
const seatGap = 5;
const sectionRows = 3;
const sectionCols = 5;

// Stadium boundaries
const leftX = 120;
const rightX = 430;
const topY = 120;
const bottomY = 380;

// Draw the central field with rounded corners
const field = document.createElementNS("http://www.w3.org/2000/svg", "rect");
field.setAttribute("x", leftX + 70);        // start a bit inside the seating
field.setAttribute("y", topY + 70);
field.setAttribute("width", rightX - leftX - 100);  // width spans between sections
field.setAttribute("height", bottomY - topY - 105); // height spans top to bottom sections
field.setAttribute("rx", 20);               // rounded corners
field.setAttribute("ry", 20);
field.setAttribute("class", "field");      // CSS class to control color
svg.appendChild(field);

// Function to create a horizontal section
function createHorizontalSection(startX, startY, sectionId) {
    for (let row = 0; row < sectionRows; row++) {
        for (let col = 0; col < sectionCols; col++) {
            const seatNumber = row * sectionCols + col + 1;
            const seatId = `${sectionId}${seatNumber}`;

            const seat = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            seat.setAttribute("x", startX + col * (seatSize + seatGap));
            seat.setAttribute("y", startY + row * (seatSize + seatGap));
            seat.setAttribute("width", seatSize);
            seat.setAttribute("height", seatSize);
            seat.setAttribute("class", "seat");
            seat.setAttribute("id", seatId);

            const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
            label.setAttribute("x", startX + col * (seatSize + seatGap) + seatSize/2);
            label.setAttribute("y", startY + row * (seatSize + seatGap) + seatSize/1.5);
            label.setAttribute("class", "label");
            label.textContent = seatNumber;

            svg.appendChild(seat);
            svg.appendChild(label);
        }
    }
}

// Function to create a vertical section (rotated seats)
function createVerticalSection(startX, startY, sectionId) {
    for (let row = 0; row < sectionCols; row++) {
        for (let col = 0; col < sectionRows; col++) {
            const seatNumber = row * sectionRows + col + 1;
            const seatId = `${sectionId}${seatNumber}`;

            const seat = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            seat.setAttribute("x", startX + col * (seatSize + seatGap));
            seat.setAttribute("y", startY + row * (seatSize + seatGap));
            seat.setAttribute("width", seatSize);
            seat.setAttribute("height", seatSize);
            seat.setAttribute("class", "seat");
            seat.setAttribute("id", seatId);

            const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
            label.setAttribute("x", startX + col * (seatSize + seatGap) + seatSize/2);
            label.setAttribute("y", startY + row * (seatSize + seatGap) + seatSize/1.5);
            label.setAttribute("class", "label");
            label.textContent = seatNumber;

            svg.appendChild(seat);
            svg.appendChild(label);
        }
    }
}

// Create concessions at corners
function createConcession(x, y, labelText) {
    const stand = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    stand.setAttribute("x", x);
    stand.setAttribute("y", y);
    stand.setAttribute("width", 100);
    stand.setAttribute("height", 100);
    stand.setAttribute("class", "concession");

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", x + 20);
    label.setAttribute("y", y + 25);
    label.setAttribute("class", "label");
    label.textContent = labelText;

    svg.appendChild(stand);
    svg.appendChild(label);
}

// Place concessions
createConcession(leftX - 20, topY - 30, "Con1");      // top-left
createConcession(rightX - 40, topY - 30, "Con2");     // top-right
createConcession(rightX - 40, bottomY - 35, "Con3");  // bottom-right
createConcession(leftX - 20, bottomY - 35, "Con4");   // bottom-left

// Place seat sections
createHorizontalSection(leftX + 105, topY - 20, "A");            // top side
createVerticalSection(rightX - 25, topY + 75, "B");        // right side
createHorizontalSection(leftX + 105, bottomY - 25, "C");         // bottom side
createVerticalSection(leftX - 20, topY + 75, "D");    // left side

// Fetch seat status and color
fetch("http://127.0.0.1:5000/seat_status")
    .then(res => res.json())
    .then(data => {
        for (const seatId in data) {
            const seat = document.getElementById(seatId);
            if (seat && data[seatId] === "taken") {
                seat.classList.add("taken");
            }
        }
    })
    .catch(err => console.error(err));