import React from "react";
import Task from "./Task";

export default function TaskList({ taskList, onCheckBtnClick }) {
  return (
    <>
      {taskList.map((task) => (
        <Task key={task.id} task={task} onCheckBtnClick={onCheckBtnClick} />
      ))}
    </>
  );
}
