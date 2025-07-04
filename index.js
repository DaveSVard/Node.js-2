const { readFile } = require("fs/promises");
const express = require("express");

const app = express();
async function myrender(req, res, file, data) {
  let content = await readFile(file, "utf-8");

  for (let key in data) {
    const pattern = new RegExp(`{${key}}`, "g");
    content = content.replace(pattern, data[key]);
  }

  res.setHeader("Content-Type", "text/html");
  res.end(content);
}

app.get("/", (req, res) => {
  myrender(req, res, "./pages/home.vjs", { name: "David", age: 22 });
});

app.listen(3000, () => console.log("Server works"));
