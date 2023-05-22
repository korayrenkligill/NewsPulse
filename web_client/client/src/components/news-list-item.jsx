import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewsListItem({ item, backendUrl }) {
  const navigation = useNavigate();

  const notifications = {
    waiting: () =>
      toast.info("Veri siliniyor...", {
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
      toast.success("Veri başarıyla silindi!", {
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
      toast.error("Veri silme işlemi başarısız!", {
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
  const deleteNews = () => {
    // API'ye DELETE isteği gönder
    notifications.waiting();
    axios
      .delete(`${backendUrl}/news/${item.id}`)
      .then(notifications.succes)
      .then((response) => console.log(response.data)) // Yanıtı konsola yaz
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => console.error(error)); // Hata olursa konsola yaz
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
