import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import axios from "axios";
import ToastNotification from "./send-notification";

function CategoryItem(props) {
  const [editMode, setEditMode] = useState(false);

  const [category, setCategory] = useState(props.category);

  const updateCategory = () => {
    let newCategory = {
      id: props.id,
      parent: props.parent,
      category: category,
    };
    if (category.length > 0) {
      // API'ye PUT isteği gönder
      axios
        .put(`${props.backendUrl}/categories/${props.id}`, newCategory)
        .then(ToastNotification.success("Kategori başarıyla güncellendi 🎉"))
        .then((response) => console.log(response.data)) // Yanıtı konsola yaz
        .then(props.getCategories)
        .then(() => {
          setEditMode(!editMode);
        })
        .catch((error) => {
          console.error(error);
          ToastNotification.error(
            "Kategori güncelleme esnasında bir hata ile karşılaşıldı ❤️‍🩹"
          );
        }); // Hata olursa konsola yaz
    } else {
      ToastNotification.warn("Bir kategori ismi belirlemelisin 🧸");
    }
  };

  const deleteCategory = () => {
    // API'ye DELETE isteği gönder
    axios
      .delete(`${props.backendUrl}/categories/${props.id}`)
      .then(ToastNotification.success("Kategori başarıyla kaldırıldı 🎉"))
      .then((response) => console.log(response.data)) // Yanıtı konsola yaz
      .then(props.getCategories)
      .catch((error) => {
        console.error(error);
        ToastNotification.error(
          "Kategori kaldırılma esnasında bir hata ile karşılaşıldı ❤️‍🩹"
        );
      }); // Hata olursa konsola yaz
  };
  if (!editMode)
    return (
      <div className="category">
        <p>{props.category}</p>
        <div>
          <button
            onClick={() => {
              setEditMode(!editMode);
            }}
          >
            <MdModeEditOutline className="icon" />
          </button>
          <button onClick={deleteCategory}>
            <IoCloseSharp className="icon" />
          </button>
        </div>
      </div>
    );
  else
    return (
      <div className="category">
        <input
          type="text"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <div>
          <button onClick={updateCategory}>
            <IoMdCheckmark className="icon" />
          </button>
          <button
            onClick={() => {
              setCategory(props.category);
              setEditMode(!editMode);
            }}
          >
            <IoCloseSharp className="icon" />
          </button>
        </div>
      </div>
    );
}

export default CategoryItem;
