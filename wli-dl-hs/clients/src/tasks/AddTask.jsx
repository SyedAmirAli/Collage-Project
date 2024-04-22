import React, { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { io } from "socket.io-client";

export default function AddTask() {
  const formButtonRef = useRef();

  const [formData, setFormData] = useState({ title: "", description: "" });

  async function taskFormHandler(event) {
    event.preventDefault();
    formButtonRef.current.classList.add("loader");

    try {
      const response = await fetch(window?.app?.apiUrl + "/task/create", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === 200) {
      }
    } catch (error) {
      console.log(`Error: ${error?.message}`);
    } finally {
      formButtonRef.current.classList.remove("loader");
    }

    setFormData({ ...formData, title: "", description: "" });
  }

  return (
    <div className="w-full flex items-center justify-center">
      <form
        onSubmit={taskFormHandler}
        className="bg-white p-5 lg:p-10 border border-solid border-slate-300 shadow-xl rounded-3xl w-full"
      >
        <h1 className="text-center text-3xl font-light font-mono border-b border-violet-300 pb-1 mb-4 capitalize text-violet-500">
          Add Task
        </h1>
        <div className="flex flex-col font-bold text-sm gap-1 w-full">
          <label htmlFor="title">Task Title:</label>
          <input
            type="text"
            className="outline-none border border-dashed text-lg px-4 py-2 bg-slate-100 border-purple-500 font-medium font-mono focus:border-solid"
            placeholder="Write here a title..."
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col font-bold text-sm gap-1 w-full mt-4">
          <label htmlFor="title">Task Descriptions:</label>
          <textarea
            type="text"
            className="outline-none border border-dashed text-lg px-4 py-2 bg-slate-100 border-purple-500 font-medium font-mono focus:border-solid w-full min-h-40"
            placeholder="Write here a title..."
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>

        <div
          ref={formButtonRef}
          className="group mt-4 flex items-center justify-center flex-col"
        >
          <button className="group-[.loader]:hidden block uppercase rounded-sm duration-500 hover:tracking-wider hover:bg-emerald-500 w-full text-lg font-bold text-slate-100 bg-violet-500 py-1">
            add task
          </button>

          <span className="group-[.loader]:block hidden">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="rgb(239 68 68)"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{ color: "red" }}
              wrapperClass=""
            />
          </span>
        </div>
      </form>
    </div>
  );
}
