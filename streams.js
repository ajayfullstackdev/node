import http from "http";
import fs from "fs";

const server = http.createServer();

server.on("request", (req, res) => {
  //   fs.readFile("./data/users.json", "utf-8", (err, data) => {
  //     if (err) {
  //       return console.log("error !");
  //     }

  //     res.end(data);
  //   });

  // read speed > write speed
  // backpressure

  const readable = fs.createReadStream("./data/users.json");

  // readable.on("data", (data) => {
  //   res.write(data);
  // });

  // readable.on("end", () => {
  //   res.end();
  // });

  // readable.on("error", (error) => {
  //   res.statusCode = 500;
  //   res.end("File doesn't exist !");
  // });

  readable.pipe(res); // deal with backpressure
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening to port 3000...");
});
