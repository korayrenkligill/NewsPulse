import React, { useEffect, useState } from "react";
import "../../styles/admin/users-list.css";
import axios from "axios";
import UsersListItem from "../../components/users-list-item";
function UsersList({ backendUrl }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // API'ye GET isteği gönder
    axios
      .get(`${backendUrl}/users`)
      .then((response) => setUsers(response.data)) // Veriyi state'e kaydet
      .catch((error) => console.error(error)); // Hata olursa konsola yaz
  }, []);

  return (
    <div className="admin-users-list">
      <h1 className="header">Users List</h1>
      <div className="table-grid">
        <div className="table-header">
          <p className="table-1">Name Surname</p>
          <p className="table-2">E-mail</p>
          <p className="table-3">Position</p>
          <p className="table-4">Edit</p>
          <p className="table-5">Remove</p>
        </div>

        {users.map((item, key) => {
          return (
            <UsersListItem key={key} item={item} backendUrl={backendUrl} />
          );
        })}
      </div>
    </div>
  );
}

export default UsersList;
