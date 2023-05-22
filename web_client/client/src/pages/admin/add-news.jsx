import React, { useEffect, useState } from "react";
import "../../styles/admin/add-news.css";
import { BiImageAdd, BiChevronDown } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "axios";
import AddNewsCategory from "../../components/add-news-category";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

function AddNews({ backendUrl, user }) {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [parent, setParent] = useState("Journal");

  const [selectedCategories, setSelectedCategories] = useState([]);

  const notifications = {
    waiting: () =>
      toast.info("Haber kaydediliyor...", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }),
    succes: () =>
      toast.success("Haber başarıyla kaydedildi!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }),
    error: () =>
      toast.error("Haber kaydı başarısız!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }),
  };

  const warning = (message) =>
    toast.warn(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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

  const addNews = (event) => {
    event.preventDefault();
    let newNews = {
      id: uuidv4(),
      title: title,
      content: content,
      author: user,
      time: nowDate(),
      image: selectedImage,
      categories: selectedCategories,
      parent: parent,
    };
    if (title.length > 0) {
      if (content.length > 0) {
        if (selectedImage) {
          if (selectedCategories.length > 0) {
            notifications.waiting();
            // API'ye POST isteği gönder
            axios
              .post(`${backendUrl}/news`, newNews)
              .then(notifications.succes)
              .then((response) => console.log(response.data)) // Yanıtı konsola yaz
              .then(() => {
                navigate("/admin/news/");
                // window.location.reload();
              })
              .catch((error) => console.error(error)); // Hata olursa konsola yaz
          } else {
            warning("En az bir kategori seçmelisin!");
          }
        } else {
          warning("Bir içerik resmi seçmelisin!");
        }
      } else {
        warning("İçerik girmelisin!");
      }
    } else {
      warning("Bir başlık girmelisin!");
    }
  };
  useEffect(() => {
    // API'ye GET isteği gönder
    axios
      .get(`${backendUrl}/categories`)
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
            <div className="frame">
              <img src={selectedImage} alt="Selected" />
            </div>
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
          <AiFillPlusCircle className="icon" /> Complete
        </button>
      </form>
    </div>
  );
}

export default AddNews;
