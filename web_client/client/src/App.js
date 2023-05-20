import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/main";
import Admin from "./pages/admin/admin";
import Dashboard from "./pages/admin/dashboard";
import Test from "./pages/admin/Test";
import Navbar from "./components/navbar";
import { useState } from "react";
import AddNews from "./pages/admin/add-news";
import Categories from "./pages/admin/categories";

const backendUrl = "https://like-scythe-nightshade.glitch.me";

function App() {
  const [user, setUser] = useState();
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/admin"
          element={
            <Admin user={user} setUser={setUser} backendUrl={backendUrl} />
          }
        >
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/test" element={<Test />} />
          <Route
            path="/admin/news/add"
            element={<AddNews backendUrl={backendUrl} />}
          />
          <Route
            path="/admin/news/categories"
            element={<Categories backendUrl={backendUrl} />}
          />
        </Route>
      </Routes>
      <p>footer</p>
    </div>
  );
}

export default App;
