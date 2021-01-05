import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import units from "design-units";
import axios from "axios";
import { ModalWrapper } from "../components/Modal";
import { TaskForm } from "../components/TaskForm";

const ToDoWrapper = styled.div``;

export const ToDoPage = ({authenticate, user}) => {
  const [taskList, setTaskList] = useState([]);
  const [isModalOpen, toggleModal] = useState(false);

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
    toggleModal(true);
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
        console.log(res.data);
        // Fix this below
        setTaskList(taskList + task);
      })
      .catch(err => console.log(err))
  };

  return (
    <ToDoWrapper>
      ToDo Page
      <button onClick={newTaskClick}>New Task</button>
      {isModalOpen ? <ModalWrapper><TaskForm addTask={addTask} /></ModalWrapper> : null}
      {taskList.length > 0 ? taskList.map(item => {
        return <h5>{item.title}</h5>
      }) : null}
    </ToDoWrapper>
  )
}