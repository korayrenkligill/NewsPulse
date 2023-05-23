import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../styles/admin/add-news.css";
import { BiImageAdd, BiChevronDown } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";
import AddNewsCategory from "../../../components/add-news-category";
import ToastNotification from "../../../components/send-notification";
import PuffLoader from "react-spinners/ClipLoader";

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

function AdminNewsDetail(props) {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const params = useParams();

  const navigate = useNavigate();

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

  const editNews = (event) => {
    event.preventDefault();
    let newNews = {
      id: news.id,
      title: title,
      content: content,
      author: news.author,
      time: nowDate(),
      image: selectedImage,
      categories: selectedCategories,
      parent: parent,
    };
    if (title.length > 0) {
      if (content.length > 0) {
        if (selectedImage) {
          if (selectedCategories.length > 0) {
            // API'ye POST isteği gönder
            axios
              .put(`${props.backendUrl}/news/${news.id}`, newNews)
              .then(ToastNotification.success("Haber başarıyla güncellendi 🎉"))
              .then((response) => console.log(response.data)) // Yanıtı konsola yaz
              .then(() => {
                navigate("/admin/news/");
              })
              .catch((error) => console.error(error)); // Hata olursa konsola yaz
          } else {
            ToastNotification.warn("En az bir kategori seçmelisin 🙉");
          }
        } else {
          ToastNotification.warn("Bir içerik resmi seçmelisin 🙈");
        }
      } else {
        ToastNotification.warn("İçerik girmelisin 🙊");
      }
    } else {
      ToastNotification.warn("Bir başlık girmelisin 🙊");
    }
  };

  useEffect(() => {
    // API'ye GET isteği gönder
    axios
      .get(`${props.backendUrl}/news/${params.id}`)
      .then((response) => {
        setNews(response.data);
        setSelectedImage(response.data.image);
        setTitle(response.data.title);
        setContent(response.data.content);
        setLoading(false);
      }) // Veriyi state'e kaydet
      .catch((error) => console.error(error)); // Hata olursa konsola yaz

    // API'ye GET isteği gönder
    axios
      .get(`${props.backendUrl}/categories`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error)); // Hata olursa konsola yaz
  }, []);
  if (loading)
    return (
      <div className="loading">
        <PuffLoader color="#f86340" />
      </div>
    );
  else
    return (
      <div className="add-news">
        <h1 className="header">Edit News</h1>
        <form onSubmit={editNews}>
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
            <AiFillPlusCircle className="icon" /> Update
          </button>
        </form>
      </div>
    );
}

export default AdminNewsDetail;
