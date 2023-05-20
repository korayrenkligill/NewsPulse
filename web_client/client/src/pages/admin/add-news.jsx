import React, { useEffect, useState } from "react";
import "../../styles/admin/add-news.css";
import { BiImageAdd, BiChevronDown } from "react-icons/bi";
import axios from "axios";
import AddNewsCategory from "../../components/add-news-category";
import { v4 as uuidv4 } from "uuid";

const date = new Date();

function nowDate() {
  let hour = date.getHours().toString();
  let minute = date.getMinutes().toString();
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString();
  if (hour.length < 2) {
    hour = "0" + hour;
  }
  if (minute.length < 2) {
    minute = "0" + minute;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  if (month.length < 2) {
    month = "0" + month;
  }
  return `${hour}:${minute} ${day}/${month}/${year}`;
}

function AddNews() {
  const [categories, setCategories] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [parent, setParent] = useState("Journal");

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addNews = () => {
    let newNews = {
      id: uuidv4(),
      title: title,
      content: content,
      time: nowDate(),
      image: selectedImage,
      categories: selectedCategories,
      parent: parent,
    };
    // API'ye POST isteği gönder
    axios
      .post("http://localhost:4000/news", newNews)
      .then((response) => console.log(response.data)) // Yanıtı konsola yaz
      .catch((error) => console.error(error)); // Hata olursa konsola yaz
  };
  useEffect(() => {
    // API'ye GET isteği gönder
    axios
      .get("http://localhost:4000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error)); // Hata olursa konsola yaz
  }, []);
  return (
    <div className="add-news">
      <h1 className="header">Add News</h1>
      <form onSubmit={addNews}>
        <label
          htmlFor="image-selector"
          className="image-uploader drop-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {selectedImage ? (
            <img src={selectedImage} alt="Selected" />
          ) : (
            <div className="placeholder">
              <BiImageAdd className="icon" />
              <span>drag and drop or click to select a news image</span>
            </div>
          )}
          <input
            id="image-selector"
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            style={{ display: "none" }}
          />
        </label>
        <label htmlFor="">Title</label>
        <input
          type="text"
          placeholder="Last minute development..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="">Content</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        <div className="categories">
          <div className="parent-selector">
            <p className="choosed-parent">
              {parent} <BiChevronDown className="icon" />
            </p>
            <div className="parents">
              <button
                type="button"
                onClick={() => {
                  setParent("Journal");
                  setSelectedCategories([]);
                }}
              >
                Journal
              </button>
              <button
                type="button"
                onClick={() => {
                  setParent("Sports");
                  setSelectedCategories([]);
                }}
              >
                Sports
              </button>
              <button
                type="button"
                onClick={() => {
                  setParent("Weather");
                  setSelectedCategories([]);
                }}
              >
                Weather
              </button>
              <button
                type="button"
                onClick={() => {
                  setParent("Finance");
                  setSelectedCategories([]);
                }}
              >
                Finance
              </button>
            </div>
          </div>
          <div className="categories-list">
            {categories.map((item, key) => {
              if (item.parent === parent)
                return (
                  <AddNewsCategory
                    key={key}
                    category={item.category}
                    id={item.id}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                  />
                );
            })}
          </div>
        </div>
        <button type="submit" className="submit-button">
          Complete
        </button>
      </form>
    </div>
  );
}

export default AddNews;
