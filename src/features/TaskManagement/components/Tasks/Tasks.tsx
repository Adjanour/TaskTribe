import React, { useEffect } from "react";
import TaskCard from "../TaskCard/TaskCard";
import { useBackend } from "../../hooks/useBackend";

export const TaskComponent: React.FC = () => {
  const { tasks, fetchTasks } = useBackend();
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div className="flex flex-col flex-1 flex-wrap gap-3 my-2 sm:flex-row md:flex-row lg:flex-row">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};
