import React, { useEffect, useState } from "react";
import "./stadium.css";

const seatSize = 30;
const seatGap = 6;
const rows = 3;
const cols = 5;

const Stadium = () => {
  const [seatStatus, setSeatStatus] = useState({});
  const [selectedSeat, setSelectedSeat] = useState(null);

  // 👇 PUT YOUR FETCH HERE
  useEffect(() => {
    fetch("http://127.0.0.1:5000/seat_status")
      .then(res => res.json())
      .then(data => {
        setSeatStatus(data);
      })
      .catch(err => console.error("Error fetching seat status:", err));
  }, []);  // empty array = run once on load

  const renderSection = (startX, startY, sectionId, vertical = false) => {
    const seats = [];

    for (let r = 0; r < (vertical ? cols : rows); r++) {
      for (let c = 0; c < (vertical ? rows : cols); c++) {
        const number = r * (vertical ? rows : cols) + c + 1;
        const id = `${sectionId}${number}`;

        const x = startX + c * (seatSize + seatGap);
        const y = startY + r * (seatSize + seatGap);

        seats.push(
          <g key={id} onClick={() => setSelectedSeat(id)}>
            <rect
              x={x}
              y={y}
              width={seatSize}
              height={seatSize}
              rx="6"
              className={`seat 
                ${seatStatus[id] === "taken" ? "taken" : ""} 
                ${selectedSeat === id ? "selected" : ""}
              `}
            />
            <text
              x={x + seatSize / 2}
              y={y + seatSize / 1.6}
              className="label"
            >
              {number}
            </text>
          </g>
        );
      }
    }

    return seats;
  };

  return (
    <div className="stadium-container">
      <svg width="800" height="600">

        {/* Background Glow */}
        <rect width="800" height="600" className="background" />

        {/* Field (Oval) */}
        <ellipse
          cx="370"
          cy="310"
          rx="150"
          ry="80"
          className="field"
        />

        {/* Concessions */}
        <rect x="80" y="90" width="110" height="110" rx="12" className="concession" />
        <rect x="550" y="90" width="110" height="110" rx="12" className="concession" />
        <rect x="550" y="420" width="110" height="110" rx="12" className="concession" />
        <rect x="80" y="420" width="110" height="110" rx="12" className="concession" />

        <text x="125" y="135" className="con-label">Con1</text>
        <text x="600" y="135" className="con-label">Con2</text>
        <text x="600" y="485" className="con-label">Con3</text>
        <text x="125" y="485" className="con-label">Con4</text>

        {/* Sections */}
        {renderSection(280, 90, "A")}
        {renderSection(550, 220, "B", true)}
        {renderSection(280, 430, "C")}
        {renderSection(80, 220, "D", true)}

      </svg>

      {selectedSeat && (
        <div className="seat-info">
          Selected Seat: <strong>{selectedSeat}</strong>
        </div>
      )}
    </div>
  );
};

export default Stadium;