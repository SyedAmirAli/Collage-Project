import React, { useState } from "react";
import AddTask from "./AddTask";
import TasksList from "./TasksList";
import EditTask from "./EditTask";

export default function TaskManager() {
  const [updatableTask, setUpdatableTask] = useState({
    status: false,
    data: {},
  });

  return (
    <article className="w-full min-h-screen bg-white bg-gradient-to-tr from-cyan-300/10 via-pink-300/10 to-purple-300/10 flex items-center justify-center">
      <div className="container flex flex-col lg:flex-row items-center justify-center lg:gap-6 gap-20 p-4">
        {/* Add Task Form */}
        <div className="w-full">
          {updatableTask.status ? (
            <EditTask editable={{ updatableTask, setUpdatableTask }} />
          ) : (
            <AddTask editable={{ updatableTask, setUpdatableTask }} />
          )}
        </div>
        <div className="w-full">
          <TasksList editable={{ updatableTask, setUpdatableTask }} />
        </div>
      </div>
    </article>
  );
}
