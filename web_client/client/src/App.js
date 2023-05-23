import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Main from "./pages/main";
import Admin from "./pages/admin/admin";
import Dashboard from "./pages/admin/statistics/dashboard";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import AddNews from "./pages/admin/news/admin-add-news";
import Categories from "./pages/admin/news/categories/admin-categories-list";
import Error404 from "./pages/404";
import NewsList from "./pages/admin/news/admin-news-list";
import AdminNewsDetail from "./pages/admin/news/admin-news-detail";
import UsersList from "./pages/admin/user/admin-users-list";
import UserAdd from "./pages/admin/user/admin-add-user";
import PositionsList from "./pages/admin/user/positions/admin-positions-list";
import PositionsAdd from "./pages/admin/user/positions/admin-add-positions";
import UserDetail from "./pages/admin/user/admin-user-detail";
import PositionDetail from "./pages/admin/user/positions/admin-position-detail";

const backendUrl = "https://newspulse-api.glitch.me";

const getCookie = (name) => {
  const cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
};

function App() {
  const [user, setUser] = useState();

  const handleLogout = () => {
    document.cookie = "isLoggedIn=; max-age=0;"; // Çerezi silmek için geçerlilik süresini 0 yap
    document.cookie = "loggedUser=; max-age=0;"; // Kullanıcı çerezini sil

    setUser(null);
  };
  useEffect(() => {
    if (document.cookie.includes("isLoggedIn=true")) {
      const userCookie = getCookie("loggedUser");
      if (userCookie) {
        const userObj = JSON.parse(userCookie);
        setUser(userObj);
      }
    }
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/admin"
          element={
            <Admin
              user={user}
              setUser={setUser}
              backendUrl={backendUrl}
              logout={handleLogout}
            />
          }
        >
          <Route path="/admin" element={<Dashboard />} />
          <Route
            path="/admin/news"
            element={<NewsList backendUrl={backendUrl} />}
          />
          <Route
            path="/admin/news/edit/:id"
            element={<AdminNewsDetail backendUrl={backendUrl} />}
          />
          <Route
            path="/admin/news/add"
            element={<AddNews backendUrl={backendUrl} user={user} />}
          />
          <Route
            path="/admin/news/categories"
            element={<Categories backendUrl={backendUrl} />}
          />
          <Route
            path="/admin/users"
            element={<UsersList backendUrl={backendUrl} />}
          />
          <Route
            path="/admin/users/add"
            element={<UserAdd backendUrl={backendUrl} />}
          />
          <Route
            path="/admin/users/edit/:id"
            element={<UserDetail backendUrl={backendUrl} />}
          />
          <Route
            path="/admin/positions"
            element={<PositionsList backendUrl={backendUrl} />}
          />
          <Route
            path="/admin/positions/add"
            element={<PositionsAdd backendUrl={backendUrl} />}
          />
          <Route
            path="/admin/positions/edit/:id"
            element={<PositionDetail backendUrl={backendUrl} />}
          />
          <Route path="/admin/*" element={<Error404 />} />
        </Route>
        <Route path="/*" element={<Error404 />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <p>footer</p>
    </div>
  );
}

export default App;
