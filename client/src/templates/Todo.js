import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import units from "design-units";
import axios from "axios";
import { ModalWrapper } from "../components/Modal";
import { TaskForm } from "../components/TaskForm";
import { Task } from "../components/Task";

const ToDoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const ToDoShell = styled.div`
  width: 100%;
  max-width: 1080px;
  display:flex;
  flex-direction: column;
  align-items: center;
`;
const TaskHeader = styled.h1`
  margin: 16px;
`;
const NewTask = styled.button`
  align-self: flex-start;
`;
const DeleteButton = styled.button``;
const UpdateButton = styled.button``;

export const ToDoPage = ({authenticate, user}) => {
  const [taskList, setTaskList] = useState([]);
  const [isTaskModalOpen, toggleTaskModal] = useState(false);

  useEffect(() => {
    authenticate();
    const token = localStorage.getItem("jwt") || "";
    const config = {
      headers: {authorization: token}
    };
    axios.get(`/tasks`, config)
      .then(tasks => {
        setTaskList(tasks.data)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const newTaskClick = e => {
    toggleTaskModal(true);
  }
  const closeNewTask = e => {
    toggleTaskModal(false);
  }
  const addTask = e => {
    e.preventDefault();
    const task = {
      title: e.target.taskTitle.value,
      description: e.target.taskDescription.value,
      priority: e.target.taskPriority.value,
      due: e.target.taskDD.value,
      uID: user.id
    };
    const token = localStorage.getItem("jwt") || '';
    const taskConfig = {
      method: "post",
      data: task,
      url: "/task/add",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      }
    };
    axios(taskConfig)
      .then(res => {
        const newTask = res.data.task;
        toggleTaskModal(false);
        // Fix this below
        setTaskList(taskList.concat([newTask]));
      })
      .catch(err => console.log(err))
  };

  const deleteTask = task => {
    const token = localStorage.getItem("jwt") || '';
    const taskConfig = {
      method: "delete",
      url: `/task/remove?id=${task}`,
      headers: {
        "Content-Type": "application/json",
        authorization: token
      }
    };
    axios(taskConfig)
      .then(res => setTaskList(taskList.filter(i => i.id !== task)))
      .catch(err => console.log(err))
  };

  const updateTask = task => {
    console.log(task);
  }

  return (
    <ToDoWrapper>
      <ToDoShell>
        <TaskHeader>Track your Tasks</TaskHeader>
        <NewTask onClick={newTaskClick}>
          New Task
        </NewTask>

        {taskList.length > 0 ? taskList.map(item => {
          const onDelete = () => deleteTask(item.id)
          const onUpdate = () => updateTask(item.id)
          return (
            <Task onDelete={onDelete} onUpdate={onUpdate} item={item} />
            )
          }) : null}

        {isTaskModalOpen ? <ModalWrapper close={closeNewTask}><TaskForm addTask={addTask} /></ModalWrapper> : null}
      </ToDoShell>
    </ToDoWrapper>
  )
}