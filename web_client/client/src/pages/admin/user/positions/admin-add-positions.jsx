import React, { useState } from "react";
import "../../../../styles/admin/add-position.css";
import { RxDotFilled } from "react-icons/rx";
import { AiFillPlusCircle } from "react-icons/ai";
import PowersItem from "../../../../components/powers-item";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../../components/send-notification";

const powersList = [
  "Sahip kullanıcı oluşturma",
  "Rol oluşturma",
  "İçerik ekleme",
  "Kullanıcı oluşturma",
  "Kullanıcı listesi görebilme",
  "Kullanıcı düzenleyebilme",
  "Kullanıcı kaldırabilme",
];

function PositionsAdd({ backendUrl }) {
  const navigate = useNavigate();
  const [position, setPosition] = useState("");
  const [color, setColor] = useState("#000");
  const [powers, setPowers] = useState([]);
  const addPosition = (event) => {
    event.preventDefault();
    let newPosition = {
      id: uuidv4(),
      position: position,
      color: color,
      powers: powers,
    };

    if (position.length > 0) {
      if (
        color.length > 0 &&
        (color.length === 4 || color.length === 7 || color.length === 9)
      ) {
        if (powers.length > 0) {
          // API'ye POST isteği gönder
          axios
            .post(`${backendUrl}/positions`, newPosition)
            .then(ToastNotification.success("Pozisyon başarıyla eklendi 🐣"))
            .then((response) => console.log(response.data)) // Yanıtı konsola yaz
            .then(() => {
              navigate("/admin/positions/");
            })
            .catch((error) => {
              console.error(error);
              ToastNotification.error(
                "Pozisyon ekleme esnasında bir hata ile karşılaşıldı 🚨"
              );
            }); // Hata olursa konsola yaz
        } else {
          ToastNotification.warn("En az bir yetki seçmelisin 🛠");
        }
      } else {
        ToastNotification.warn("Girilen renk kodu hatalı olabilir 🛠");
      }
    } else {
      ToastNotification.warn("Pozisyon ismi boş bırakılamaz 🛠");
    }
  };
  return (
    <div className="add-position-page">
      <h1 className="header">Add Position</h1>
      <form onSubmit={addPosition}>
        <p className="sample">
          <RxDotFilled style={{ color: color }} className="icon" />{" "}
          {position !== "" ? position : "Sample"}
        </p>
        <div className="form-item-double">
          <div className="position-name">
            <label htmlFor="">Position name</label>
            <input
              type="text"
              placeholder="Admin"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div className="color-code">
            <label htmlFor="">Hex color code</label>
            <input
              type="text"
              maxLength={9}
              minLength={1}
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label>Powers</label>
          <div className="powers">
            {powersList.map((item, key) => {
              return (
                <PowersItem
                  key={key}
                  power={item}
                  powers={powers}
                  setPowers={setPowers}
                />
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

export default PositionsAdd;
