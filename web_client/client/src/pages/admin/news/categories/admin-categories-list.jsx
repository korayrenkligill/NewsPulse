import React, { useEffect, useState } from "react";
import "../../../../styles/admin/categories.css";
import { TbSend, TbSendOff } from "react-icons/tb";
import axios from "axios";
import CategoryItem from "../../../../components/category-item";
import { v4 as uuidv4 } from "uuid";
import ToastNotification from "../../../../components/send-notification";
import PuffLoader from "react-spinners/ClipLoader";

function Categories({ backendUrl }) {
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);

  const [writtenCategory, setWrittenCategory] = useState("");
  const [parent, setParent] = useState("Journal");

  const addCategory = (event) => {
    event.preventDefault();
    let newCategory = {
      id: uuidv4(),
      parent: parent,
      category: writtenCategory,
    };
    if (writtenCategory.length > 0) {
      // API'ye POST isteği gönder
      axios
        .post(`${backendUrl}/categories`, newCategory)
        .then(ToastNotification.success("Kategori başarıyla eklendi 🎉"))
        .then((response) => console.log(response.data)) // Yanıtı konsola yaz
        .then(() => {
          getCategories();
        })
        .catch((error) => {
          console.error(error);
          ToastNotification.error(
            "Kategori ekleme esnasında bir hata ile karşılaşıldı ❤️‍🩹"
          );
        }); // Hata olursa konsola yaz
    } else {
      ToastNotification.warn("Bir kategori ismi belirlemelisin 🧸");
    }
  };

  const getCategories = () => {
    // API'ye GET isteği gönder
    axios
      .get(`${backendUrl}/categories`)
      .then((response) => setCategories(response.data)) // Veriyi state'e kaydet
      .then(() => {
        setLoading(false);
      })
      .catch((error) => console.error(error)); // Hata olursa konsola yaz
  };

  useEffect(() => {
    getCategories();
  }, []);
  if (loading)
    return (
      <div className="loading">
        <PuffLoader color="#f86340" />
      </div>
    );
  else
    return (
      <div className="admin-categories">
        <h1 className="header">Categories</h1>
        <div>
          <form onSubmit={addCategory}>
            <input
              type="text"
              placeholder="category name"
              minLength={1}
              value={writtenCategory}
              onChange={(e) => {
                setWrittenCategory(e.target.value);
              }}
            />
            <div className="section">
              <div className="selected-section">
                <p>{parent}</p>
              </div>
              <div className="options">
                <p
                  onClick={() => {
                    setParent("Journal");
                  }}
                >
                  Journal
                </p>
                <p
                  onClick={() => {
                    setParent("Sports");
                  }}
                >
                  Sports
                </p>
                <p
                  onClick={() => {
                    setParent("Weather");
                  }}
                >
                  Weather
                </p>
                <p
                  onClick={() => {
                    setParent("Finance");
                  }}
                >
                  Finance
                </p>
              </div>
            </div>
            {writtenCategory.length > 0 ? (
              <button>
                <TbSend className="icon" />
              </button>
            ) : (
              <button disabled>
                <TbSendOff className="icon" />
              </button>
            )}
          </form>
          <div className="category-list">
            <p className="parent-text">Journal</p>
            {categories.map((item, key) => {
              if (item.parent === "Journal") {
                return (
                  <CategoryItem
                    key={key}
                    id={item.id}
                    category={item.category}
                    parent={item.parent}
                    backendUrl={backendUrl}
                    getCategories={getCategories}
                  />
                );
              }
            })}
            <p className="parent-text">Sports</p>
            {categories.map((item, key) => {
              if (item.parent === "Sports") {
                return (
                  <CategoryItem
                    key={key}
                    id={item.id}
                    category={item.category}
                    parent={item.parent}
                    backendUrl={backendUrl}
                    getCategories={getCategories}
                  />
                );
              }
            })}
            <p className="parent-text">Weather</p>
            {categories.map((item, key) => {
              if (item.parent === "Weather") {
                return (
                  <CategoryItem
                    key={key}
                    id={item.id}
                    category={item.category}
                    parent={item.parent}
                    backendUrl={backendUrl}
                    getCategories={getCategories}
                  />
                );
              }
            })}
            <p className="parent-text">Finance</p>
            {categories.map((item, key) => {
              if (item.parent === "Finance") {
                return (
                  <CategoryItem
                    key={key}
                    id={item.id}
                    category={item.category}
                    parent={item.parent}
                    backendUrl={backendUrl}
                    getCategories={getCategories}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    );
}

export default Categories;
