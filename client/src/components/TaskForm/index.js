import React from 'react';
import styled from "@emotion/styled";
import units from "design-units";

const TaskFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${units({
    padding: ["3", "4", "5"],
    backgroundColor: "primary"
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
        <InfoZone>
          <PriorityZone>
            <FormLabel>Priority</FormLabel>
            <FormSelect name="taskPriority" required>
              <FormOption value="1">1</FormOption>
              <FormOption value="2">2</FormOption>
              <FormOption value="3">3</FormOption>
              <FormOption value="4">4</FormOption>
            </FormSelect>
          </PriorityZone>
          <PriorityZone>
            <FormLabel>Due Date:</FormLabel>
            <FormInput name="taskDD" type="date" required/>
          </PriorityZone>
        </InfoZone>
        <FormButton type="submit">Add Task</FormButton>
      </TaskFormWrapper>
    )
  }
}