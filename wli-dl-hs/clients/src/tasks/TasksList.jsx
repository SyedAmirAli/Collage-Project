import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { TASK_MANAGEMENT_PROJECT } from "../../../server/actions";
import assets from "../assets";
import SingleTask from "./SingleTask";

export default function TasksList({ editable }) {
  const [tasks, setTasks] = useState([]);
  const { client, server } = TASK_MANAGEMENT_PROJECT || {};

  useEffect(() => {
    const socket = io(window.app?.host);

    // Listen for socket events and update tasks state.
    socket.on(server, (data) => {
      if (data?.type === "create") {
        setTasks((prevTasks) => [...prevTasks, { ...data.data }]);
      } else if (data?.type === "edit") {
        setTasks((prevTasks) => {
          const { _id, title, description } = data.data || {};

          return prevTasks.map((task) => {
            if (task._id === _id) {
              return { ...task, title, description };
            }
            return task;
          });
        });
      } else if (data?.type === "delete") {
        setTasks((prevTasks) => {
          return prevTasks.filter((task) => task._id !== data.data._id);
        });
      }
    });

    // Fetch initial data from the API and update tasks state
    async function fetchInitialData() {
      try {
        const res = await fetch("http://192.168.31.95:9000/api/task/");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    }

    // Call the fetchInitialData function
    fetchInitialData();

    // Clean up the socket connection
    return () => socket.disconnect();
  }, []);

  return (
    <div className="w-full lg:max-h-screen overflow-x-hidden lg:overflow-y-scroll">
      <div className="w-full flex flex-col gap-4 pr-0 lg:pr-8">
        {tasks
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .map((task) => (
            <SingleTask editable={editable} key={task._id} task={task} />
          ))}
      </div>
    </div>
  );
}

{
  /* <div className="fixed w-full min-h-screen top-0 left-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="max-w-lg w-full flex flex-col items-center justify-center bg-white shadow-xl p-6 border border-violet-300 border-solid rounded-3xl">
          <i className="bg-red-500 mt-8 mb-2 w-24 rounded-full h-24 flex items-center justify-center animate-bounce">
            {assets.svg.delete({ width: 60, height: 60, fill: "#ddd" })}
          </i>

          <h1 className="font-bold text-red-500/60 italic text-3xl capitalize">
            Delete Items
          </h1>

          <p className="text-slate-600 text-lg">
            Are you sure to delete this item for permanently!
          </p>

          <div className="w-full flex gap-6 mt-4">
            <button className="w-full text-lg font-bold uppercase py-1 text-center bg-red-500 text-slate-100 rounded-sm hover:bg-black duration-500 hover:tracking-wide">
              ok
            </button>
            <button className="w-full text-lg font-bold uppercase py-1 text-center bg-green-500 text-slate-100 rounded-sm hover:bg-black duration-500 hover:tracking-wide">
              cancel
            </button>
          </div>
        </div>
      </div> */
  //   const findIndexTask = prevTasks.findIndex((task) => task._id === _id);
  //   prevTasks[findIndexTask].title = title;
  //   prevTasks[findIndexTask].title = description;
  //   //   console.log(findIndexTask);
  //   return prevTasks;
}
