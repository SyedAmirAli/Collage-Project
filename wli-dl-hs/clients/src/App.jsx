/* import React, { useEffect, useState } from "react";
import Utils from "../utils";
import {
  NOT_SUPPORTED_LISTENER,
  WATER_LEVEL_PROJECT,
} from "../../actions/socketListener.js";

function App() {
  const [error, setError] = useState({ status: false, type: "", message: "" });

  useEffect(() => {
    const socket = Utils.io();
    socket.on("welcome__message", (data) => {
      console.log(data);
    });

    socket.on("test__api", function (data) {
      console.log("Received Data From Server API =>", data);
    });

    socket.on(NOT_SUPPORTED_LISTENER.server, function (data) {
      console.log("Received Data From Server API =>", data);
      if (data?.error) {
        setError({ ...error, message: data.error?.message });
      }
    });

    socket.on(WATER_LEVEL_PROJECT.server, function (data) {
      console.log("Received Data From Server API =>", data);
      if (data?.error) {
        setError({ ...error, message: data.error?.message });
      }
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="bg-slate-900 w-full min-h-screen flex items-center justify-center flex-col text-slate-100 gap-6">
      <h1 className="text-5xl font-semibold">Syed Amir Ali</h1>
      <h5 className="text-3xl text-red-500">{error.message}</h5>
    </div>
  );
}

export default App;

// import { io } from "socket.io-client";
// import socketIo from "../utils/socket";
// const socket = io("http://192.168.31.95:9000/");
// const socket = Utils.socket;
// const socket = io(Utils.socketUrl);
// import { useEffect, useState } from "react";
//   import "./App.css";
// import { io } from "socket.io-client";

// function App() {
//    const socket = io("http://localhost:9000/");

//   useEffect(function () {
//     socket.on("welcome__message", function (data) {
//       console.log("Received Data From Server: ", data);
//     });

//     return () => socket.disconnect();
//   }, []);

//   return (
//     <>
//       <h1>Syed Amir Ali</h1>
//     </>
//   );
// }

// export default App;

// // fetch("http://192.168.31.95:9000/test")
// //   .then((res) => res.json())
// //   .then((data) => console.log(data));
 */

import React from "react";
import TaskManager from "./tasks/TaskManager";

export default function App() {
  return (
    <div>
      <TaskManager />
    </div>
  );
}
