import http from "http";
import { URL } from "url";
import { readFile, writeFile } from "./fileaccess.js";

const server = http.createServer(async (req, res) => {
  try {
    const instanceOfURL = new URL(req.url, "http://localhost:8000/");

    // GET Methods
    if (req.method === "GET" && instanceOfURL.pathname === "/products") {
      const id = instanceOfURL.searchParams.get("id");
      let jsonData = JSON.parse(await readFile("./data/products.json"));

      if (id !== null) {
        jsonData = jsonData.find((ele) => ele.id == id);
      }

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");

      return res.end(JSON.stringify(jsonData));
    } else {
      res.end("Server says Hello !");
    }
  } catch (err) {
    console.log(err);

    res.writeHead(500);
    res.end("Server crashed, things not working as expected.");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to the port 8000...");
});
