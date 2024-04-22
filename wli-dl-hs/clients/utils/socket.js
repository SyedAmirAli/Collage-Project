import { io } from "socket.io-client";

const port = import.meta.env.VITE_SERVER_PORT || 9000;
const ip = import.meta.env.VITE_WIFI_IP_INET || "http://localhost:9000/";

export const socket = () => io(`http://${ip}:${port}/`);
export default socket;
