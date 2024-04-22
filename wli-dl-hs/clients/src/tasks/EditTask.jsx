import React, { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { io } from "socket.io-client";

export default function EditTask({ editable }) {
  const { updatableTask, setUpdatableTask } = editable || {};

  const formButtonRef = useRef();
  const [formData, setFormData] = useState({
    title: updatableTask.data?.title,
    description: updatableTask.data?.description,
  });

  useEffect(
    function () {
      setFormData({
        ...formData,
        title: updatableTask.data?.title,
        description: updatableTask.data?.description,
      });
    },
    [updatableTask]
  );

  async function taskFormHandler(event) {
    event.preventDefault();
    formButtonRef.current.classList.add("loader");

    try {
      const response = await fetch(
        window?.app?.apiUrl + "/task/update/" + updatableTask.data?._id,
        {
          headers: { "Content-Type": "application/json" },
          method: "PATCH",
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.status === 200) {
        setUpdatableTask((prevState) => ({ ...prevState, status: false }));
      }
    } catch (error) {
      console.log(`Error: ${error?.message}`);
    } finally {
      formButtonRef.current.classList.remove("loader");
    }
  }

  return (
    <div className="w-full flex items-center justify-center">
      <form
        onSubmit={taskFormHandler}
        className="bg-white p-5 lg:p-10 border border-solid border-cyan-300 shadow-xl rounded-3xl w-full"
      >
        <h1 className="text-center text-3xl font-light font-mono border-b border-cyan-300 pb-1 mb-4 capitalize text-cyan-500">
          Edit Task
        </h1>
        <div className="flex flex-col font-bold text-sm gap-1 w-full">
          <label htmlFor="title">Task Title:</label>
          <input
            type="text"
            className="outline-none border border-dashed text-lg px-4 py-2 bg-slate-100 border-cyan-500 font-medium font-mono focus:border-solid"
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
            className="outline-none border border-dashed text-lg px-4 py-2 bg-slate-100 border-cyan-500 font-medium font-mono focus:border-solid w-full min-h-40"
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
          <div className="group-[.loader]:hidden flex w-full gap-4">
            <button className="block uppercase rounded-sm duration-500 hover:tracking-wider hover:bg-emerald-500 w-full text-lg font-bold text-slate-100 bg-cyan-600 py-1">
              update task
            </button>

            <p
              className="block uppercase rounded-sm duration-500 cursor-pointer hover:bg-emerald-700 text-nowrap px-3 text-lg font-bold text-slate-100 bg-red-500 py-1"
              onClick={async function () {
                setUpdatableTask((prevState) => ({
                  ...prevState,
                  status: false,
                  data: {},
                }));
              }}
            >
              cancel
            </p>
          </div>

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
