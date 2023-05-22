import React, { useEffect, useState } from "react";
import PositionListItem from "../../components/position-list-item";
import "../../styles/admin/positions-list.css";
import axios from "axios";
function PositionsList({ backendUrl }) {
  const [positions, setPositions] = useState([]);
  useEffect(() => {
    // API'ye GET isteği gönder
    axios
      .get(`${backendUrl}/positions`)
      .then((response) => setPositions(response.data)) // Veriyi state'e kaydet
      .catch((error) => console.error(error)); // Hata olursa konsola yaz
  }, []);
  return (
    <div className="admin-positions-list">
      <h1
        className="header"
        onClick={() => {
          console.log(positions);
        }}
      >
        Positions List
      </h1>
      <div className="table-grid">
        <div className="table-header">
          <p className="table-1">Position</p>
          <p className="table-2">Powers</p>
          <p className="table-3">Edit</p>
          <p className="table-4">Remove</p>
        </div>

        {positions.map((item, key) => {
          return (
            <PositionListItem key={key} item={item} backendUrl={backendUrl} />
          );
        })}
      </div>
    </div>
  );
}

export default PositionsList;
