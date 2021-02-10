import React from "react";
import styled from "@emotion/styled";
import units from "design-units";
import axios from "axios";

const UpdateFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label``;
const FormSelect = styled.select``;
const FormOption = styled.option``;
const FormInput = styled.input``;
const FormButton = styled.button``;

export class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      isFailed: false
    }
  }
  updateTask = e => {
    e.preventDefault();
    const token = localStorage.getItem("jwt") || '';
    const taskBody = {
      ...this.props.item,
      title: e.target.taskTitle.value,
      description: e.target.taskDescription.value,
      priority: e.target.taskPriority.value,
      due: e.target.taskDD.value,
      id: this.props.item.id,
      status: e.target.taskStatus.value
    };
    const taskConfig = {
      method: "put",
      url: `/task/update`,
      data: taskBody,
      headers: {
        "Content-Type": "application/json",
        authorization: token
      }
    };
    axios(taskConfig)
      .then(res => {
        console.log(taskBody, res);
        this.props.onUpdate(taskBody);
        this.props.close();
      })
      .catch(err => {
        console.log(err);
        this.setState({isFailed: true});
      });
  }
  render() {
    const dueDate = new Date(this.props.item.due);
    return (
      <UpdateFormWrapper ref={this.formRef} onSubmit={this.updateTask}>
        Are you sure you want to Update?
        <FormLabel>Status:</FormLabel>
        <FormSelect name="taskStatus" defaultValue={this.props.item.status}required>
          <FormOption value="0">To Do</FormOption>
          <FormOption value="1">In Progress</FormOption>
          <FormOption value="2">Done</FormOption>
        </FormSelect>
        <FormLabel>Title:</FormLabel>
        <FormInput name="taskTitle" defaultValue={this.props.item.title} required/>
        <FormLabel>Description:</FormLabel>
        <FormInput name="taskDescription" defaultValue={this.props.item.description} required/>
        <FormLabel>Priority</FormLabel>
        <FormSelect name="taskPriority" defaultValue={this.props.item.priority}required>
          <FormOption value="1">1</FormOption>
          <FormOption value="2">2</FormOption>
          <FormOption value="3">3</FormOption>
          <FormOption value="4">4</FormOption>
        </FormSelect>
        <FormLabel>Due Date:</FormLabel>
        <FormInput name="taskDD" type="date" defaultValue={dueDate.toISOString().substr(0,10)} required/>
        <FormButton type="submit">Update Task</FormButton>
        {this.state.isFailed ? <p>Update Failed</p> : null}

      </UpdateFormWrapper>
    );
  }
};
