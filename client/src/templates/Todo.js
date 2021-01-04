import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import units from "design-units";
import axios from "axios";
import { ModalWrapper } from "../components/Modal";

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

  return (
    <ToDoWrapper>
      ToDo Page
      <button onClick={newTaskClick}>New Task</button>
      {isModalOpen ? <ModalWrapper><div>New Task</div></ModalWrapper> : null}
      {taskList.length > 0 ? taskList.map(item => {
        return <h5>{item.title}</h5>
      }) : null}
    </ToDoWrapper>
  )
}