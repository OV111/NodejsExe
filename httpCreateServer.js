import http from "http";
import fs from "fs";
const PORT = 5000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("./homePage.html", "utf-8", (err, data) => {
      if (err) {
        throw err;
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/about") {
    fs.readFile("./About.html", "utf-8", (err, data) => {
      if (err) {
        throw err;
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url.startsWith("/users")) {
    fs.readFile("./users.json", "utf-8", (err, data) => {
      if (err) {
        throw err;
      } else {
        const users = JSON.parse(data);
        const parts = req.url.split("/");
        const userId = parts[2];
        if (userId) {
          const user = users.find((u) => u.id === parseInt(userId));
          if (user) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(user));
          } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User not found" }));
          }
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(users));
        }
      }
    });
  } else {
    fs.readFile("./Error.html", "utf-8", (err, data) => {
      if (err) {
        throw err;
      } else {
        res.writeHead(404, { "content-type": "type/html" });
        res.end(data);
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
