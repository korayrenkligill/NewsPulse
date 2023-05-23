import React from "react";
import { toast } from "react-toastify";

const ToastNotification = {
  normal: function (message = "Null notification", autoClose = 1000) {
    toast(message, {
      position: "top-right",
      autoClose: autoClose,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  },
  info: function (message = "Null notification", autoClose = 1000) {
    toast.info(message, {
      position: "top-right",
      autoClose: autoClose,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  },
  warn: function (message = "Null notification", autoClose = 1000) {
    toast.warn(message, {
      position: "top-right",
      autoClose: autoClose,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  },
  success: function (message = "Null notification", autoClose = 1000) {
    toast.success(message, {
      position: "top-right",
      autoClose: autoClose,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  },
  error: function (message = "Null notification", autoClose = 3000) {
    toast.error(message, {
      position: "top-right",
      autoClose: autoClose,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  },
};
export default ToastNotification;
