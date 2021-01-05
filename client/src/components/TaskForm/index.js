import React from 'react';
import styled from "@emotion/styled";
import units from "design-units";

const TaskFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;
const FormLabel = styled.label``;
const FormSelect = styled.select``;
const FormOption = styled.option``;
const FormInput = styled.input``;
const FormButton = styled.button``;

export class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  render() {
    return (
      <TaskFormWrapper ref={this.formRef} onSubmit={this.props.addTask}>
        Create New Task
        <FormLabel>Title:</FormLabel>
        <FormInput name="taskTitle" placeholder="Title" required/>
        <FormLabel>Description:</FormLabel>
        <FormInput name="taskDescription" placeholder="Description" required/>
        <FormLabel>Priority</FormLabel>
        <FormSelect name="taskPriority" required>
          <FormOption value="1">1</FormOption>
          <FormOption value="2">2</FormOption>
          <FormOption value="3">3</FormOption>
          <FormOption value="4">4</FormOption>
        </FormSelect>
        <FormLabel>Due Date:</FormLabel>
        <FormInput name="taskDD" type="date" />
        <FormButton type="submit">Add Task</FormButton>
      </TaskFormWrapper>
    )
  }
}