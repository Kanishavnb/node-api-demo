const http = require("http");

const users = [
  { id: 1, name: "Kanisha", skill: "HTML" },
  { id: 2, name: "Ravi", skill: "CSS" },
  { id: 3, name: "Meena", skill: "JavaScript" },
  { id: 4, name: "Arun", skill: "React" },
  { id: 5, name: "Divya", skill: "Node.js" }
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json", ...corsHeaders });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  // The browser asks permission first (a "preflight" request)
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Hello from my Node server!</h1><p>Try /api/users</p>");

  } else if (req.url === "/api/users" && req.method === "GET") {
    sendJson(res, 200, users);

  } else if (req.url === "/api/users" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const name = String(data.name || "").trim();
        const skill = String(data.skill || "").trim();

        if (name === "" || skill === "") {
          sendJson(res, 400, { error: "Name and skill are required" });
          return;
        }

        const newUser = { id: users.length + 1, name: name, skill: skill };
        users.push(newUser);
        sendJson(res, 201, newUser);
      } catch (error) {
        sendJson(res, 400, { error: "Invalid JSON" });
      }
    });

  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});