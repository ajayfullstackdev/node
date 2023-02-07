import express from "express";
import http from "http";
import { WebSocketServer, WebSocket } from "ws";

const app = express();

app.use(express.json());

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

// wss.on("connection", (ws) => {
//   console.log("Connection established");

//   ws.on("message", (data) => {
//     console.log("Received info from client", data.toString());
//     ws.send("Hub received the following data" + data.toString());
//   });
// });

wss.on("connection", (ws) => {
  ws.on("message", (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

server.listen(8000, () => console.log("Listening on 8k...."));
