import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ToastNotification from "../components/send-notification";

function NewsListItem({ item, backendUrl, getNews }) {
  const navigation = useNavigate();

  const deleteNews = () => {
    // API'ye DELETE isteği gönder
    axios
      .delete(`${backendUrl}/news/${item.id}`)
      .then(ToastNotification.success("Haber başarıyla kaldırıldı 🎉"))
      .then((response) => console.log(response.data)) // Yanıtı konsola yaz
      .then(() => {
        getNews();
      })
      .catch((error) => {
        console.error(error);
        ToastNotification.error(
          "Haber kaldırma işlemi sırasında bir hata meydana geldi ❤️‍🩹"
        );
      }); // Hata olursa konsola yaz
  };
  return (
    <div className="table-item">
      <div className="frame">
        <img src={item.image} alt="" />
      </div>
      <p>
        <span>{item.title}</span>
      </p>
      <p>
        {item.content.length > 90 ? (
          <span>{item.content.substring(0, 90)}...</span>
        ) : (
          <span>{item.content}</span>
        )}
      </p>
      <p>
        <span>{item.author.username}</span>
      </p>
      <button
        className="edit-button"
        onClick={() => {
          navigation(`/admin/news/edit/${item.id}`);
        }}
      >
        Edit
      </button>
      <button className="remove-button" onClick={deleteNews}>
        Remove
      </button>
    </div>
  );
}

export default NewsListItem;
