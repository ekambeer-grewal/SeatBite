import React, { useEffect, useState } from "react";
import "./stadium.css";

const seatSize = 30;
const seatGap = 6;
const rows = 3;
const cols = 5;
const sections = ["A", "B", "C", "D"];

const Stadium = () => {
  const [highlightedSeat, setHighlightedSeat] = useState("");
  const [inputSeat, setInputSeat] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setHighlightedSeat(inputSeat.toUpperCase());
  };

  const renderSection = (startX, startY, sectionId, vertical = false) => {
    const seats = [];
    for (let r = 0; r < (vertical ? cols : rows); r++) {
      for (let c = 0; c < (vertical ? rows : cols); c++) {
        const num = r * (vertical ? rows : cols) + c + 1;
        const id = `${sectionId}${num.toString().padStart(2, "0")}`;
        const x = startX + c * (seatSize + seatGap);
        const y = startY + r * (seatSize + seatGap);

        seats.push(
          <g key={id}>
            <rect
              id={id}
              x={x}
              y={y}
              width={seatSize}
              height={seatSize}
              rx="6"
              className={`seat ${highlightedSeat === id ? "selected" : ""}`}
            />
            <text
              x={x + seatSize / 2}
              y={y + seatSize / 1.6}
              className="label"
            >
              {id}
            </text>
          </g>
        );
      }
    }
    return seats;
  };

  return (
    <div className="stadium-container">
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter seat (e.g., A03)"
          value={inputSeat}
          onChange={(e) => setInputSeat(e.target.value)}
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <button type="submit">Highlight Seat</button>
      </form>

      <svg width="800" height="600">
        <rect width="800" height="600" className="background" />
        <ellipse cx="370" cy="310" rx="150" ry="80" className="field" />

      {/* Concessions */}
        <rect x="80" y="90" width="110" height="110" rx="12" className="concession" />
        <rect x="550" y="90" width="110" height="110" rx="12" className="concession" />
        <rect x="550" y="420" width="110" height="110" rx="12" className="concession" />
        <rect x="80" y="420" width="110" height="110" rx="12" className="concession" />

        <text x="125" y="135" className="con-label">Con1</text>
        <text x="600" y="135" className="con-label">Con2</text>
        <text x="600" y="485" className="con-label">Con3</text>
        <text x="125" y="485" className="con-label">Con4</text>

        {renderSection(280, 90, "A")}
        {renderSection(550, 220, "B", true)}
        {renderSection(280, 430, "C")}
        {renderSection(80, 220, "D", true)}
      </svg>
    </div>
  );
};

export default Stadium;