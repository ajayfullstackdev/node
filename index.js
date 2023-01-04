import http from "http";
import { URL } from "url";
import { readFile, writeFile } from "./fileaccess.js";

const server = http.createServer(async (req, res) => {
  try {
    const instanceOfURL = new URL(req.url, "http://localhost:8000/");

    // GET Methods
    if (req.method === "GET" && instanceOfURL.pathname === "/users") {
      const id = instanceOfURL.searchParams.get("id");
      let jsonData = JSON.parse(await readFile("./data/users.json"));

      if (id !== null) {
        jsonData = jsonData.find((ele) => ele.id == id);
      }

      const result = {
        status: "Success",
        data: jsonData,
        length: jsonData.length,
      };

      return res.end(JSON.stringify(result));
    } else if (
      req.method === "GET" &&
      instanceOfURL.pathname === "/users/html"
    ) {
      let userTemplate = await readFile("./templates/users.html");
      const userList = await readFile("./templates/userlist.html");
      let jsonData = JSON.parse(await readFile("./data/users.json"));
      let finalList = jsonData.map((item) =>
        userList.replace("{%USER_NAME%}", item.name)
      );
      finalList = finalList.reduce((a, b) => `${a}${b}`, "");
      userTemplate = userTemplate.replace("{%USER_DETAILS%}", finalList);
      return res.end(userTemplate);
    } else if (
      req.method === "GET" &&
      instanceOfURL.pathname === "/uploadform"
    ) {
      const formData = await readFile("./templates/formData.html");
      return res.end(formData);
    }

    // POST Method
    else if (req.method === "POST" && instanceOfURL.pathname === "/users") {
      let payload = "";
      req.on("data", (data) => {
        payload += data.toString();
      });
      req.on("end", async () => {
        let jsonData = JSON.parse(await readFile("./data/users.json"));

        payload = JSON.parse(payload);
        jsonData.push(payload);

        await writeFile("./data/users.json", JSON.stringify(jsonData));

        res.writeHead(201, {
          "Content-Type": "application/json",
        });
        res.end(`{
            "status": "Successfully added !"
        }`);
      });
    }
    // PATCH Method
    else if (req.method === "PATCH" && instanceOfURL.pathname === "/users") {
      let payload = "";
      req.on("data", (data) => {
        payload += data.toString();
      });
      req.on("end", async () => {
        let jsonData = JSON.parse(await readFile("./data/users.json"));

        payload = JSON.parse(payload);

        let user = jsonData.find((ele) => ele.id === payload.id);

        user.id = payload.id;
        user.name = payload.name;
        user.username = payload.username;

        await writeFile("./data/users.json", JSON.stringify(jsonData));

        res.writeHead(201, {
          "Content-Type": "application/json",
        });
        res.end(`{
            "status": "Successfully updated !"
        }`);
      });
    }

    // DELETE Method
    else if (req.method === "DELETE" && instanceOfURL.pathname === "/users") {
      let payload = "";
      req.on("data", (data) => {
        payload += data.toString();
      });
      req.on("end", async () => {
        let jsonData = JSON.parse(await readFile("./data/users.json"));

        payload = JSON.parse(payload);

        let filtered = jsonData.filter((ele) => ele.id != payload.id);

        await writeFile("./data/users.json", JSON.stringify(filtered));

        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(`{
            "status": "Successfully deleted !"
        }`);
      });
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
