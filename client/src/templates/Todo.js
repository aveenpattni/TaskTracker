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
  display:flex;
  flex-direction: column;
  align-items: center;
  ${units({
    maxWidth: [0, 1, 2]
  })}
`;
const TaskHeader = styled.h1`
  margin: 16px;
`;
const NewTask = styled.button`
  align-self: flex-start;
`;
const TaskTable = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  ${units({
    flexDirection: ["column", "row", "row"],
    justifyContent: ["flex-start", "space-evenly", "space-evenly"],
    padding: ["4px", 0, 0]
  })}
`;
const TaskCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  ${units({
    alignSelf: ["center", "flex-start", "flex-start"],
    width: ["90%", "30%", "30%"]
  })}
`;

export const ToDoPage = ({authenticate, user}) => {
  const [sortedTaskList, setSortedTaskList] = useState({
    toDo: [],
    inProgress: [],
    done: []
  });
  const [isTaskModalOpen, toggleTaskModal] = useState(false);

  useEffect(() => {
    authenticate();
    const token = localStorage.getItem("jwt") || "";
    const config = {
      headers: {authorization: token}
    };
    axios.get(`/api/tasks`, config)
      .then(tasks => {
        setSortedTaskList({
          toDo: tasks.data.filter(i=>i.status===0),
          inProgress: tasks.data.filter(i=>i.status===1),
          done: tasks.data.filter(i=>i.status===2)
        });
      })
      .catch(err => {
        console.log(err);
      });
      // eslint-disable-next-line
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
      url: "/api/task/add",
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
        setSortedTaskList({
          ...sortedTaskList,
          toDo: sortedTaskList.toDo.concat([newTask])
        });
      })
      .catch(err => console.log(err))
  };

  const deleteTask = task => {
    const token = localStorage.getItem("jwt") || '';
    const taskConfig = {
      method: "delete",
      url: `/api/task/remove?id=${task}`,
      headers: {
        "Content-Type": "application/json",
        authorization: token
      }
    };
    axios(taskConfig)
      .then(res => {
        setSortedTaskList({
          toDo: sortedTaskList.toDo.filter(i => i.id !== task),
          inProgress: sortedTaskList.inProgress.filter(i => i.id !== task),
          done: sortedTaskList.done.filter(i => i.id !== task),
        });
      })
      .catch(err => console.log(err))
  };

  const updateTask = (taskBody) => {
    const newStatus = taskBody.status === "2" ? "done" : (taskBody.status === "1" ? "inProgress" : "toDo");
    const newTaskList = {
      toDo: sortedTaskList.toDo.filter(i=>i.id!==taskBody.id),
      inProgress: sortedTaskList.inProgress.filter(i=>i.id!==taskBody.id),
      done: sortedTaskList.done.filter(i=>i.id!==taskBody.id)
    };
    newTaskList[newStatus].unshift(taskBody);
    setSortedTaskList(newTaskList);
  };

  return (
    <ToDoWrapper>
      <ToDoShell>
        <TaskHeader>Track your Tasks</TaskHeader>
        <NewTask onClick={newTaskClick}>
          New Task
        </NewTask>
        <TaskTable>
          <TaskCol>
            To Do
            {sortedTaskList.toDo.map(item=>{
              const onDelete = () => deleteTask(item.id)
              const onUpdate = taskBody => updateTask(taskBody)
              return <Task onDelete={onDelete} onUpdate={onUpdate} item={item} col={0}/>
            })}
          </TaskCol>
          <TaskCol>
            In Progress
            {sortedTaskList.inProgress.map(item=>{
              const onDelete = () => deleteTask(item.id)
              const onUpdate = taskBody => updateTask(taskBody)
              return <Task onDelete={onDelete} onUpdate={onUpdate} item={item} col={1}/>
            })}
          </TaskCol>
          <TaskCol>
            Done
            {sortedTaskList.done.map(item=>{
              const onDelete = () => deleteTask(item.id)
              const onUpdate = taskBody => updateTask(taskBody)
              return <Task onDelete={onDelete} onUpdate={onUpdate} item={item} col={2}/>
            })}
          </TaskCol>
        </TaskTable>
        {isTaskModalOpen ? <ModalWrapper close={closeNewTask}><TaskForm addTask={addTask} /></ModalWrapper> : null}
      </ToDoShell>
    </ToDoWrapper>
  )
}