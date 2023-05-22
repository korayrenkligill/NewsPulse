import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../../components/admin-sidebar";
import "../../styles/admin/admin.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdCheckBox } from "react-icons/md";
import axios from "axios";
function Admin({ user, setUser, backendUrl, logout }) {
  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const loggedUser = users.find(
      (element) =>
        element.username === username && element.password === password
    );
    if (loggedUser) {
      setUser(loggedUser);
      document.cookie = `loggedUser=${JSON.stringify(
        loggedUser
      )}; max-age=3600;`; // Çerez oluştur ve geçerlilik süresini ayarla
      document.cookie = `isLoggedIn=true; max-age=3600;`;
    }
  };
  useEffect(() => {
    document.title = "NewsPulse Admin Page";
    // API'ye GET isteği gönder
    axios
      .get(`${backendUrl}/users`)
      .then((response) => setUsers(response.data)) // Veriyi state'e kaydet
      .catch((error) => console.error(error)); // Hata olursa konsola yaz
  }, []);

  //Loading ekranı tamamlandığında
  if (users.length > 0) {
    if (user) {
      return (
        <div className="admin">
          <div>
            <AdminSideBar logout={logout} user={user} />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      );
    } else {
      return (
        <div className="login-screen">
          <form className="login-form" onSubmit={handleSubmit} method="get">
            <h1>Login</h1>
            <div className="form-element">
              <label htmlFor="">username</label>
              <input
                type="text"
                placeholder="Dean_Gilbert"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-element">
              <label htmlFor="password">password</label>
              <div className="password">
                <input
                  type={passwordVisibility ? "text" : "password"}
                  id=""
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="visibility" className="visibilityCheckbox">
                  {passwordVisibility ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </label>
                <input
                  type="checkbox"
                  id="visibility"
                  checked={passwordVisibility}
                  onChange={(e) => setPasswordVisibility(!passwordVisibility)}
                />
              </div>
            </div>
            <button>Login</button>
          </form>
        </div>
      );
    }
  }
}

export default Admin;
