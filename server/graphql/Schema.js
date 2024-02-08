const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Status {
    name: String!
    _id: String!
    order: Float!
  }

  type Task {
    name: String!
    order: Float!
    status: String!
    _id: String!
  }

  type Dashboard {
    status: Status
    tasks: [Task]
  }

  type Query {
    getTasks: [Task]
    getStatuses: [Status],
    getDashboard: [Dashboard]
  }

  type Mutation {
    createTask(name: String!, status: String!): Task
    editTask(id: String!, name: String!): Task
    deleteTask(id: String!): Task
    moveTask(sourceTaskId: String!, sourceTaskStatusId: String!, destinationTaskStatusId: String!, destinationTaskOrder: Float!): Task
    deleteStatus(id: ID!): Status
    createStatus(name: String!): Status
  }
`);

module.exports = schema;