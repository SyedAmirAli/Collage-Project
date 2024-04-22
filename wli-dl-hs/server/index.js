let i = 0;
// console.clear();
// import Routes from "./routes/index.js";
// import "module-alias/register.js";
import dotenv from "dotenv";
import express from "express";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import colors from "colors";
import QRCode from "qrcode-terminal";
import { DBconnection } from "./db/connections.js";
import { NOT_SUPPORTED_LISTENER } from "./actions/socketListener.js";
import getIpV4 from "./lib/get-ipV4-address.js";
import waterLevelRouter from "./routes/WaterLevelRoutes.js";
import taskRouter from "./routes/TaskRouter.js";
import bodyParser from "body-parser";

// make a base directory for path resolving
export const __dirname = dirname(fileURLToPath(import.meta.url));

// configure app and env setup
dotenv.config();
const app = express();

// create a server using nodejs http and express
const server = createServer(app);

// make an socket instance using socket.io library
export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "PUT", "POST", "UPDATE", "DELETE"],
  },
});

// manage cors origin blocks
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// make sure the static is client files and folders
app.use(express.static(join(__dirname, "../clients", "dist")));

// make an root route and show a reactive ui as html
app.get("/", function (req, res) {
  res.status(200).sendFile(path.join(__dirname, "../clients/dist/index.html"));
});

// test route using my custom class
// app.use("/api", Routes.testRoute());
app.use("/api", waterLevelRouter);
app.use("/api", taskRouter);

// make a socket connection
io.on("connection", function (socket) {
  console.log("User Connected!");

  i++;
  socket.emit(
    "welcome__message",
    "Message From Server Using WebSocket => " + i
  );

  socket.on(NOT_SUPPORTED_LISTENER.server, function (d) {
    console.log(d);
  });

  // disconnect the user when he leave from here
  socket.on("disconnect", function () {
    console.log("User Disconnected!");
  });
});

// run the server on our local ip wifi-router/mobile hotshots
const ip = getIpV4();
const port = process.env.PORT || 3000;

server.listen(port, ip, async function () {
  // connect the db
  await DBconnection();

  const url = "http://" + ip + ":" + port;
  console.log(
    "Base Directory: " + __dirname + "\n",
    ` SERVER RUNNING ON PORT ${port} AND ${url}/ `.bgGreen.white + "\n",
    "Sacn the QR code and visit the original look on a browser.".cyan
  );

  // show the homepage url's qr code in my terminal
  QRCode.generate(url, { small: true }, function (qrCode) {
    console.log(qrCode);
  });

  await syncServerCredentials();

  async function syncServerCredentials() {
    const response = await fetch("https://esp32.syedamirali.com/", {
      headers: {
        "Content-Type": "application/json",
        "AUTH-KEY": process.env.PHP_AUTH_KEY,
        "X-SIGNATURE": process.env.PHP_X_SIGNATURE,
      },
      method: "POST",
      body: JSON.stringify({
        email: "syedamirali814@gmail.com",
        apiUrl: url + "/api",
        ipV4: ip,
        port: port,
        host: url,
      }),
    });

    const data = await response.json();
    console.log(data);

    return data;
  }
});
