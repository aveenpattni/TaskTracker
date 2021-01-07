import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import units from "design-units";
import axios from "axios";
import { ModalWrapper } from "../components/Modal";
import { TaskForm } from "../components/TaskForm";

const ToDoWrapper = styled.div``;
const DeleteButton = styled.button``;

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
        const newTask = res.data.task;
        toggleModal(false);
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
  }

  return (
    <ToDoWrapper>
      ToDo Page
      <button onClick={newTaskClick}>New Task</button>
      {isModalOpen ? <ModalWrapper><TaskForm addTask={addTask} /></ModalWrapper> : null}
      {taskList.length > 0 ? taskList.map(item => {
        const onDelete = () => deleteTask(item.id)
        return (
        <>
          <h5>{item.title}</h5>
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        </>
        )
      }) : null}
    </ToDoWrapper>
  )
}