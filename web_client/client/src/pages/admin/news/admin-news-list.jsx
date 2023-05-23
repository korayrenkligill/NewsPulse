import React, { useEffect, useState } from "react";
import "../../../styles/admin/news-list.css";
import axios from "axios";
import NewsListItem from "../../../components/news-list-item";
import PuffLoader from "react-spinners/ClipLoader";
function NewsList({ backendUrl }) {
  const [loading, setLoading] = useState(true);

  const [news, setNews] = useState([]);

  const getNews = () => {
    // API'ye GET isteği gönder
    axios
      .get(`${backendUrl}/news`)
      .then((response) => setNews(response.data)) // Veriyi state'e kaydet
      .then(() => {
        setLoading(false);
      })
      .catch((error) => console.error(error)); // Hata olursa konsola yaz
  };
  useEffect(() => {
    getNews();
  }, []);
  if (loading)
    return (
      <div className="loading">
        <PuffLoader color="#f86340" />
      </div>
    );
  else
    return (
      <div className="admin-news-list">
        <h1 className="header">News List</h1>
        <div className="table-grid">
          <div className="table-header">
            <p className="table-1">Image</p>
            <p className="table-2">Title</p>
            <p className="table-3">Content</p>
            <p className="table-4">Author</p>
            <p className="table-6">Edit</p>
            <p className="table-7">Remove</p>
          </div>

          {news.map((item, key) => {
            return (
              <NewsListItem
                key={key}
                item={item}
                backendUrl={backendUrl}
                getNews={getNews}
              />
            );
          })}
        </div>
      </div>
    );
}

export default NewsList;
