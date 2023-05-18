import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../../components/admin-sidebar";
import "../../styles/admin/admin.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdCheckBox } from "react-icons/md";
import axios from "axios";
function Admin({ user, setUser }) {
  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handleSubmit = () => {
    const loggedUser = users.filter(
      (element) =>
        element.username === username && element.password === password
    );
    if (loggedUser.length > 0) {
      setUser(loggedUser);
      console.log(loggedUser);
    }
  };

  // const addUser = () => {
  //   let newUser = {
  //     id: 2,
  //     username: "koray",
  //     password: "1234",
  //   };
  //   // API'ye POST isteği gönder
  //   axios
  //     .post("http://localhost:4000/users", newUser)
  //     .then((response) => console.log(response.data)) // Yanıtı konsola yaz
  //     .catch((error) => console.error(error)); // Hata olursa konsola yaz
  // };
  useEffect(() => {
    // API'ye GET isteği gönder
    axios
      .get("http://localhost:4000/users")
      .then((response) => setUsers(response.data)) // Veriyi state'e kaydet
      .catch((error) => console.error(error)); // Hata olursa konsola yaz
  }, []);

  //Loading ekranı tamamlandığında
  if (users.length > 0) {
    if (user) {
      return (
        <div className="admin">
          <div>
            <AdminSideBar />
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
                  placeholder="Uic9XLF"
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
