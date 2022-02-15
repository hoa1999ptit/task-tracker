import React, { useCallback, useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import Button from "@atlaskit/button";
import Textfield from "@atlaskit/textfield";

import { v4 } from "uuid";
const TASK_APP_STORAGE_KEY = "TRACKING_TASK_APP";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [txtInput, setTxtInput] = useState("");

  useEffect(() => {
    const storagedTaskList = localStorage.getItem(TASK_APP_STORAGE_KEY);
    if (storagedTaskList) {
      setTaskList(JSON.parse(storagedTaskList)); //chuyen doi string json to array
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TASK_APP_STORAGE_KEY, JSON.stringify(taskList));
  }, [taskList]);

  const onTxtInputChange = useCallback((e) => {
    setTxtInput(e.target.value);
  }, []);

  const onAddBtnClick = useCallback(
    (e) => {
      // add txt vao danh sash input
      setTaskList([
        { id: v4(), name: txtInput, isCompleted: false },
        ...taskList,
      ]);

      setTxtInput("");
    },
    [txtInput, taskList]
  );

  const onCheckBtnClick = useCallback((id) => {
    setTaskList((prevState) =>
      prevState.map((task) =>
        task.id === id ? { ...task, isCompleted: true } : task
      )
    );
  },[]);

  return (
    <>
      <h3>Danh Sách việc cần làm</h3>
      <Textfield
        name="add-task"
        placeholder="Thêm việc cần làm..."
        elemAfterInput={
          <Button
            isDisabled={!txtInput}
            appearance="primary"
            onClick={onAddBtnClick}
          >
            Thêm
          </Button>
        }
        css={{ padding: "2px 4px 2px" }}
        value={txtInput}
        onChange={onTxtInputChange}
      ></Textfield>
      <TaskList taskList={taskList} onCheckBtnClick={onCheckBtnClick} />
    </>
  );
}

export default App;
