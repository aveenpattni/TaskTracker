import React from "react";
import styled from "@emotion/styled";
import units from "design-units";
import axios from "axios";

const UpdateFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${units({
    padding: ["3", "4", "5"],
    backgroundColor: "secondary"
  })}
`;

const FormLabel = styled.label`
  ${units({
    paddingTop: ["1"]
  })}
`;
const FormSelect = styled.select`
  ${units({
    padding: ["1"]
  })}
`;
const FormOption = styled.option`
  ${units({
    padding: ["1"]
  })}
`;
const FormInput = styled.input`
  ${units({
    padding: ["1"]
  })}
`;
const FormDescription = styled.textarea`
  ${units({
    padding: ["1"]
  })}
  min-width: 4rem;
`;
const FormButton = styled.button`
  width: 100%;
  ${units({
    padding: ["1"]
  })}
`;
const InfoZone = styled.div`
  display: flex;
  justify-content: space-between;
  ${units({
    padding: ["1"]
  })}
`;
const PriorityZone = styled.div`
  display: flex;
  justify-content: flex-start;
`;

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
        <FormLabel>Status:</FormLabel>
        <FormSelect name="taskStatus" defaultValue={this.props.item.status}required>
          <FormOption value="0">To Do</FormOption>
          <FormOption value="1">In Progress</FormOption>
          <FormOption value="2">Done</FormOption>
        </FormSelect>
        <FormLabel>Title:</FormLabel>
        <FormInput name="taskTitle" defaultValue={this.props.item.title} required/>
        <FormLabel>Description:</FormLabel>
        <FormDescription name="taskDescription" type="textarea" defaultValue={this.props.item.description} required/>
        <InfoZone>
          <PriorityZone>
            <FormLabel>Priority</FormLabel>
            <FormSelect name="taskPriority" defaultValue={this.props.item.priority}required>
              <FormOption value="1">1</FormOption>
              <FormOption value="2">2</FormOption>
              <FormOption value="3">3</FormOption>
              <FormOption value="4">4</FormOption>
            </FormSelect>
          </PriorityZone>
          <PriorityZone>
            <FormLabel>Due Date:</FormLabel>
            <FormInput name="taskDD" type="date" defaultValue={dueDate.toISOString().substr(0,10)} required/>
          </PriorityZone>
        </InfoZone>
        <FormButton type="submit">Update Task</FormButton>
        {this.state.isFailed ? <p>Update Failed</p> : null}

      </UpdateFormWrapper>
    );
  }
};
