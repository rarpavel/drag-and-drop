import { gql } from "@apollo/client";

export const GET_DASHBOARD = gql`
  query getDashboardFunction {
    getDashboard {
      status {
        name
        _id
      }
      tasks {
        name
        _id
        order
      }
    }
  }
`;

export const MOVE_TASK = gql`
  mutation moveTaskFunction(
    $sourceTaskId: String!
    $sourceTaskStatusId: String!
    $destinationTaskStatusId: String!
    $destinationTaskOrder: Float!
  ) {
    moveTask(
      sourceTaskId: $sourceTaskId
      sourceTaskStatusId: $sourceTaskStatusId
      destinationTaskStatusId: $destinationTaskStatusId
      destinationTaskOrder: $destinationTaskOrder
    ) {
      name
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTaskFunction($id: String!) {
    deleteTask(id: $id) {
      name
    }
  }
`;

export const CREATE_TASK = gql`
  mutation createTaskFunction($name: String!, $status: String!) {
    createTask(name: $name, status: $status) {
      name
    }
  }
`;
