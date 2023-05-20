import React, { useEffect, useState } from "react";
import "../../styles/admin/categories.css";
import { TbSend, TbSendOff } from "react-icons/tb";
import axios from "axios";
import CategoryItem from "../../components/category-item";
function Categories({ backendUrl }) {
  const [categories, setCategories] = useState([]);

  const [writtenCategory, setWrittenCategory] = useState("");
  const [parent, setParent] = useState("Journal");

  const addCategory = () => {
    let newCategory = {
      id: categories[categories.length - 1].id + 1,
      parent: parent,
      category: writtenCategory,
    };
    // API'ye POST isteği gönder
    axios
      .post(`${backendUrl}/categories`, newCategory)
      .then((response) => console.log(response.data)) // Yanıtı konsola yaz
      .catch((error) => console.error(error)); // Hata olursa konsola yaz
  };
  useEffect(() => {
    // API'ye GET isteği gönder
    axios
      .get(`${backendUrl}/categories`)
      .then((response) => setCategories(response.data)) // Veriyi state'e kaydet
      .catch((error) => console.error(error)); // Hata olursa konsola yaz
  }, []);

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
