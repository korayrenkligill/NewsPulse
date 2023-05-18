import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/main";
import Admin from "./pages/admin/admin";
import Dashboard from "./pages/admin/dashboard";
import Test from "./pages/admin/Test";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/test" element={<Test />} />
        </Route>
      </Routes>
      <p>footer</p>
    </div>
  );
}

export default App;
