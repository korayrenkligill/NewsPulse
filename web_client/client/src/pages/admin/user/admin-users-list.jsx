import React, { useEffect, useState } from "react";
import "../../../styles/admin/users-list.css";
import axios from "axios";
import UsersListItem from "../../../components/users-list-item";
import PuffLoader from "react-spinners/ClipLoader";

function UsersList({ backendUrl }) {
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);

  const getUsers = () => {
    // API'ye GET isteği gönder
    axios
      .get(`${backendUrl}/users`)
      .then((response) => setUsers(response.data)) // Veriyi state'e kaydet
      .then(() => {
        setLoading(false);
      })
      .catch((error) => console.error(error)); // Hata olursa konsola yaz
  };
  useEffect(() => {
    getUsers();
  }, []);
  if (loading)
    return (
      <div className="loading">
        <PuffLoader color="#f86340" />
      </div>
    );
  else
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
              <UsersListItem
                key={key}
                item={item}
                backendUrl={backendUrl}
                getUsers={getUsers}
              />
            );
          })}
        </div>
      </div>
    );
}

export default UsersList;
