const exp = require("constants");
const express = require("express");
const cors = require("cors"); // cors modülünü çağır
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const port = 4000;
const JsonLocation = "../../db.json";

app.use(cors()); // cors'u ara katman olarak ekle
app.use(bodyParser.json());

// JSON verilerini okuyan ve döndüren fonksiyon
function readData() {
  let data = fs.readFileSync(JsonLocation);
  let jsonData = JSON.parse(data);
  return jsonData;
}

// USERS FUNCTİONS --------------------------------------------------------------------------

var Users = {
  read: function () {
    let data = readData();
    let users = data.users;
    return users;
  },
  add: function (user) {
    let users = readUsers();
    users.push(user);
    let data = readData();
    data.users = users;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
  //UPDATE VE DELETE KISMI BOZUK BUNLARI KATEGORİ GİBİ YAP
  update: function (id, user) {
    let users = readUsers();
    let updatedUsers = users.map((u) => (u.id === id ? user : u));
    let data = JSON.stringify(updatedUsers);
    fs.writeFileSync(JsonLocation, data);
  },
  delete: function (id) {
    let users = readUsers();
    let filteredUsers = users.filter((user) => user.id !== id);
    let data = JSON.stringify(filteredUsers);
    fs.writeFileSync(JsonLocation, data);
  },
};

// CATEGORİES FUNCTİONS --------------------------------------------------------------------------

var Categories = {
  read: function () {
    let data = readData();
    let categories = data.categories;
    return categories;
  },
  add: function (category) {
    let categories = Categories.read();
    categories.push(category);
    let data = readData();
    data.categories = categories;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
  update: function (id, category) {
    let categories = Categories.read();
    let updatedCategories = categories.map((u) => (u.id === id ? category : u));
    let data = readData();
    data.categories = updatedCategories;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
  delete: function (id) {
    let categories = Categories.read();
    let updatedCategories = categories.filter((category) => category.id !== id);
    let data = readData();
    data.categories = updatedCategories;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
};

// NEWS FUNCTİONS --------------------------------------------------------------------------

var News = {
  read: function () {
    let data = readData();
    let news = data.news;
    return news;
  },
  add: function (newNews) {
    let news = News.read();
    news.push(newNews);
    let data = readData();
    data.news = news;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
  update: function (id, newNews) {
    let news = News.read();
    let updatedNews = news.map((u) => (u.id === id ? newNews : u));
    let data = readData();
    data.news = updatedNews;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
  delete: function (id) {
    let news = News.read();
    let updatedNews = news.filter((u) => u.id !== id);
    let data = readData();
    data.news = updatedNews;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
};

// USERS REQUESTS --------------------------------------------------------------------------

// Tüm kullanıcıları döndüren GET isteği
app.get("/users", (req, res) => {
  let users = Users.read();
  res.json(users);
});

// Yeni bir kullanıcı ekleyen POST isteği
app.post("/users", (req, res) => {
  let user = req.body;
  Users.add(user);
  res.json({ message: "User added successfully" });
});

// Belirli bir kullanıcıyı güncelleyen PUT isteği
app.put("/users/:id", (req, res) => {
  let id = req.params.id;
  let user = req.body;
  Users.update(id, user);
  res.json({ message: "User updated successfully" });
});

// Belirli bir kullanıcıyı silen DELETE isteği
app.delete("/users/:id", (req, res) => {
  let id = req.params.id;
  Users.delete(id);
  res.json({ message: "User deleted successfully" });
});

// CATEGORIES REQUESTS --------------------------------------------------------------------------

// Tüm kategorileri döndüren GET isteği
app.get("/categories", (req, res) => {
  let categories = Categories.read();
  res.json(categories);
});

// Yeni bir kategori ekleyen POST isteği
app.post("/categories", (req, res) => {
  let category = req.body;
  Categories.add(category);
  res.json({ message: "Category added successfully" });
});

// Belirli bir kategoriyi güncelleyen PUT isteği
app.put("/categories/:id", (req, res) => {
  let id = req.params.id;
  let category = req.body;
  Categories.update(Number(id), category);
  res.json({ message: "Category updated successfully" });
});

// Belirli bir kategoriyi silen DELETE isteği
app.delete("/categories/:id", (req, res) => {
  let id = req.params.id;
  Categories.delete(Number(id));
  res.json({ message: "Category deleted successfully" });
});

// NEWS REQUESTS --------------------------------------------------------------------------

// Tüm haberleri döndüren GET isteği
app.get("/news", (req, res) => {
  let news = News.read();
  res.json(news);
});

// Yeni bir haber ekleyen POST isteği
app.post("/news", (req, res) => {
  let news = req.body;
  News.add(news);
  res.json({ message: "News added successfully" });
});

// Belirli bir haberi güncelleyen PUT isteği
app.put("/news/:id", (req, res) => {
  let id = req.params.id;
  let news = req.body;
  News.update(id, news);
  res.json({ message: "News updated successfully" });
});

// Belirli bir haberi silen DELETE isteği
app.delete("/news/:id", (req, res) => {
  let id = req.params.id;
  News.delete(Number(id));
  res.json({ message: "News deleted successfully" });
});

// API'nin dinlediği port
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
