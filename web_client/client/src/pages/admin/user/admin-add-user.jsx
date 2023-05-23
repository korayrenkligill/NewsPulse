import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../../../styles/admin/user-add.css";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiFillPlusCircle,
} from "react-icons/ai";
import { RxDotFilled } from "react-icons/rx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/send-notification";

function UserAdd({ backendUrl }) {
  const navigate = useNavigate();

  const [positions, setPositions] = useState([]);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordVisibility2, setPasswordVisibility2] = useState(false);

  const addUser = (event) => {
    event.preventDefault();
    let newUser = {
      id: uuidv4(),
      username: username,
      password: password,
      name: name,
      surname: surname,
      email: email,
      position: selectedPosition,
    };

    if (username.length > 0) {
      if (password.length > 0) {
        if (password2.length > 0) {
          if (password === password2) {
            if (name.length > 0) {
              if (surname.length > 0) {
                if (email.length > 0) {
                  if (selectedPosition.length > 0) {
                    // API'ye POST isteği gönder
                    axios
                      .post(`${backendUrl}/users`, newUser)
                      .then(
                        ToastNotification.success(
                          "Kullanıcı başarıyla eklendi 🍬"
                        )
                      )
                      .then((response) => console.log(response.data)) // Yanıtı konsola yaz
                      .then(() => {
                        navigate("/admin/users/");
                      })
                      .catch((error) => {
                        ToastNotification.error(
                          "Kullanıcı ekleme esnasında bir hata ile karşılaşıldı 😡"
                        );
                        console.error(error);
                      }); // Hata olursa konsola yaz
                  } else {
                    ToastNotification.warn("Bir pozisyon seçmelisin 🥸");
                  }
                } else {
                  ToastNotification.warn("E-mail alanı boş bırakılamaz 🥸");
                }
              } else {
                ToastNotification.warn("Soyisim alanı boş bırakılamaz 🥸");
              }
            } else {
              ToastNotification.warn("İsim alanı boş bırakılamaz 🥸");
            }
          } else {
            ToastNotification.warn("Girilen şifre değerleri eşleşmiyor 🥸");
          }
        } else {
          ToastNotification.warn("Şifre tekrar alanı boş bırakılamaz 🥸");
        }
      } else {
        ToastNotification.warn("Şifre alanı boş bırakılamaz 🥸");
      }
    } else {
      ToastNotification.warn("Kullanıcı adı alanı boş bırakılamaz 🥸");
    }
  };
  useEffect(() => {
    // API'ye GET isteği gönder
    axios
      .get(`${backendUrl}/positions`)
      .then((response) => setPositions(response.data)) // Veriyi state'e kaydet
      .catch((error) => console.error(error)); // Hata olursa konsola yaz
  }, [backendUrl]);
  return (
    <div className="user-add-page">
      <h1 className="header">User Add</h1>
      <form onSubmit={addUser}>
        <div className="form-item-double">
          <div>
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Dora"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Surname</label>
            <input
              type="text"
              placeholder="Alexander"
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-item">
          <label htmlFor="">Username</label>
          <input
            type="text"
            placeholder="DoraAlexander"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="doraalexander@newspulse.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-item-double">
          <div>
            <label htmlFor="">Password</label>
            <div className="password">
              <input
                type={passwordVisibility ? "text" : "password"}
                id=""
                placeholder="*********"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
          <div>
            <label htmlFor="">Password again</label>
            <div className="password">
              <input
                type={passwordVisibility2 ? "text" : "password"}
                id=""
                placeholder="*********"
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
              />
              <label htmlFor="visibility2" className="visibilityCheckbox">
                {passwordVisibility2 ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </label>
              <input
                type="checkbox"
                id="visibility2"
                checked={passwordVisibility2}
                onChange={(e) => setPasswordVisibility2(!passwordVisibility2)}
              />
            </div>
          </div>
        </div>
        <div className="form-item">
          <label htmlFor="">Position</label>
          <div className="positions">
            {positions.map((item, key) => {
              return (
                <button
                  key={key}
                  type="button"
                  className={
                    selectedPosition === item.position
                      ? "selected-position"
                      : "position"
                  }
                  onClick={() => {
                    setSelectedPosition(item.position);
                  }}
                >
                  <RxDotFilled className="icon" style={{ color: item.color }} />{" "}
                  {item.position}
                </button>
              );
            })}
          </div>
        </div>
        <button type="submit" className="submit-button">
          <AiFillPlusCircle className="icon" /> Add
        </button>
      </form>
    </div>
  );
}

export default UserAdd;
