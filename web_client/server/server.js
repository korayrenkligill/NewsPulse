const exp = require("constants");
const express = require("express");
const cors = require("cors"); // cors modülünü çağır
const app = express();

const fs = require("fs");
const port = 4000;

app.use(cors()); // cors'u ara katman olarak ekle

// JSON verilerini okuyan ve döndüren fonksiyon
function readUsers() {
  let data = fs.readFileSync("../../data/users.json");
  let users = JSON.parse(data);
  return users;
}
// JSON verilerine yeni bir kullanıcı ekleyen fonksiyon
function addUser(user) {
  let users = readUsers();
  users.push(user);
  let data = JSON.stringify(users);
  fs.writeFileSync("users.json", data);
}

// JSON verilerinden belirli bir kullanıcıyı silen fonksiyon
function deleteUser(id) {
  let users = readUsers();
  let filteredUsers = users.filter((user) => user.id !== id);
  let data = JSON.stringify(filteredUsers);
  fs.writeFileSync("users.json", data);
}

// JSON verilerinde belirli bir kullanıcıyı güncelleyen fonksiyon
function updateUser(id, user) {
  let users = readUsers();
  let updatedUsers = users.map((u) => (u.id === id ? user : u));
  let data = JSON.stringify(updatedUsers);
  fs.writeFileSync("users.json", data);
}

// Tüm kullanıcıları döndüren GET isteği
app.get("/users", (req, res) => {
  let users = readUsers();
  res.json(users);
});

// Yeni bir kullanıcı ekleyen POST isteği
app.post("/users", (req, res) => {
  let user = req.body;
  addUser(user);
  res.json({ message: "User added successfully" });
});

// Belirli bir kullanıcıyı güncelleyen PUT isteği
app.put("/users/:id", (req, res) => {
  let id = req.params.id;
  let user = req.body;
  updateUser(id, user);
  res.json({ message: "User updated successfully" });
});

// Belirli bir kullanıcıyı silen DELETE isteği
app.delete("/users/:id", (req, res) => {
  let id = req.params.id;
  deleteUser(id);
  res.json({ message: "User deleted successfully" });
});

// API'nin dinlediği port
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
