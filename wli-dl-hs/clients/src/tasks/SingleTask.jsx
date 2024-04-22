import React from "react";
import assets from "../assets";

export default function ({ editable, task }) {
  const { updatableTask, setUpdatableTask } = editable || {};

  async function deleteTaskHandler() {
    const confirmDelete = confirm(
      "Are You Sure To Delete This For Permanently!"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        window?.app?.apiUrl + "/task/delete/" + task._id,
        {
          headers: { "Content-Type": "application/json" },
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (result.status === 200) {
      }
    } catch (error) {
      console.log(`Error: ${error?.message}`);
    }
  }

  return (
    <div className="w-full bg-white  p-6 border border-violet-300 border-solid rounded-3xl">
      <div className="flex w-full items-center justify-between pb-4">
        <p className="font-semibold text-lg lg:text-2xl text-violet-700/50 italic break-all pr-3 leading-6">
          {task.title}
        </p>

        <div className="flex gap-2 items-center justify-center">
          <button
            className="w-8 h-8 bg-violet-500 duration-500 drop-shadow-xl hover:bg-black rounded-full flex justify-center items-center relative group"
            onClick={async function (e) {
              e.target.closest("button").classList.toggle("bg-black");
              navigator.clipboard.writeText(task.description);
            }}
          >
            {assets.svg.copy({ width: 16, height: 16, fill: "#ddd" })}
            <span className="absolute opacity-0 group-hover:opacity-100 bg-violet-500 text-slate-100 px-2 -bottom-7 shadow-xl rounded z-10 font-bold capitalize pb-0.5 duration-500">
              copy
            </span>
          </button>
          <button
            className="w-8 h-8 bg-cyan-500 duration-500 drop-shadow-xl hover:bg-black rounded-full flex justify-center items-center relative group"
            onClick={async function () {
              setUpdatableTask((prevState) => ({
                ...prevState,
                status: true,
                data: task,
              }));
            }}
          >
            {assets.svg.edit({ width: 16, height: 16, fill: "#ddd" })}
            <span className="absolute opacity-0 group-hover:opacity-100 bg-cyan-500 text-slate-100 px-2 bottom-9 shadow-xl rounded z-10 font-bold capitalize pb-0.5 duration-500">
              edit
            </span>
          </button>
          <button
            className="w-8 h-8 bg-red-500 duration-500 drop-shadow-xl hover:bg-black rounded-full flex justify-center items-center relative group"
            onClick={deleteTaskHandler}
          >
            {assets.svg.delete({ width: 16, height: 16, fill: "#ddd" })}
            <span className="absolute opacity-0 group-hover:opacity-100 bg-red-500 text-slate-100 px-2 -bottom-7 shadow-xl rounded z-10 font-bold capitalize pb-0.5 duration-500">
              delete
            </span>
          </button>
        </div>
      </div>
      <div className="w-full">
        <p className="w-full text-pretty text-slate-700 font-medium lg:text-lg leading-6">
          {task.description}
        </p>
      </div>
    </div>
  );
}
