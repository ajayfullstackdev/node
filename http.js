import http from "http";

const server = http.createServer((req, res) => {
  res.end("Server says Hello World !");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to the port 8000...");
});
