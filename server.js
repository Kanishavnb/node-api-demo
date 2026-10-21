const http = require("http");

const users = [
  { id: 1, name: "Kanisha", skill: "HTML" },
  { id: 2, name: "Ravi", skill: "CSS" },
  { id: 3, name: "Meena", skill: "JavaScript" },
  { id: 4, name: "Arun", skill: "React" },
  { id: 5, name: "Divya", skill: "Node.js" }
];

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Hello from my Node server!</h1><p>Try /api/users</p>");
  } else if (req.url === "/api/users") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});