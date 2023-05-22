import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function PositionListItem({ item, backendUrl }) {
  const navigation = useNavigate();
  const deletePosition = () => {
    // API'ye DELETE isteği gönder
    axios
      .delete(`${backendUrl}/positions/${item.id}`)
      .then((response) => console.log(response.data)) // Yanıtı konsola yaz
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.error(error)); // Hata olursa konsola yaz
  };

  return (
    <div className="table-item">
      <p>
        <span>{item.position}</span>
      </p>
      <div className="powers">
        {item.powers.map((power, key) => {
          return (
            <span key={key} className="power">
              {power}
            </span>
          );
        })}
      </div>
      <button
        className="edit-button"
        onClick={() => {
          navigation(`/admin/positions/edit/${item.id}`);
        }}
      >
        Edit
      </button>
      <button className="remove-button" onClick={deletePosition}>
        Remove
      </button>
    </div>
  );
}

export default PositionListItem;
