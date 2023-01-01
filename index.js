import http from "http";
import { URL } from "url";
import fs from "fs";

const readFile = (pathName) => {
  return new Promise((res, rej) => {
    fs.readFile(pathName, "utf-8", (err, data) => {
      if (err) {
        return rej("File doesn't exist !");
      }

      res(data);
    });
  });
};

const server = http.createServer(async (req, res) => {
  try {
    const instanceOfURL = new URL(req.url, "http://localhost:8000/");
    console.log(instanceOfURL);

    if (instanceOfURL.pathname === "/users") {
      const id = instanceOfURL.searchParams.get("id");
      let jsonData = await readFile("./data/users.json");

      if (id !== null) {
        jsonData = JSON.parse(jsonData).find((ele) => ele.id == id);

        jsonData = jsonData ? JSON.stringify(jsonData) : null;
      }

      return res.end(jsonData);
    }
    res.end("Server says Hello !");
  } catch (err) {
    res.writeHead(500);
    res.end("Server crashed, things not working as expected.");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to the port 8000...");
});

// 400 Bad request
// 401 Unauthorized
// 403 Forbidden
// 404 Not found
// 500 Internal server error
