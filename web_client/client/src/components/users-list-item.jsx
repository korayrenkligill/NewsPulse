import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
function UsersListItem({ item, backendUrl }) {
  const navigation = useNavigate();
  const deleteUser = () => {
    // API'ye DELETE isteği gönder
    axios
      .delete(`${backendUrl}/users/${item.id}`)
      .then((response) => console.log(response.data)) // Yanıtı konsola yaz
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.error(error)); // Hata olursa konsola yaz
  };
  return (
    <div className="table-item">
      <p>
        <span>
          {item.name} {item.surname}
        </span>
      </p>
      <p>
        <span>{item.email}</span>
      </p>
      <p>
        <span>{item.position}</span>
      </p>
      <button
        className="edit-button"
        onClick={() => {
          navigation(`/admin/users/edit/${item.id}`);
        }}
      >
        Edit
      </button>
      <button className="remove-button" onClick={deleteUser}>
        Remove
      </button>
    </div>
  );
}

export default UsersListItem;
