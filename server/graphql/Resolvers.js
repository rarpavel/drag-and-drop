const Status = require("../models/Status");
const Task = require("../models/Task");
const mongoose = require('mongoose');

const resolvers = {
    createStatus: async ({ name }) => {
        try {
            const statuses = await Status.find();
            const status = new Status({ name, order: statuses.length || 1 });
            await status.save();
            return status;
        } catch (err) {
            throw new Error("Error creating user");
        }
    },
    getStatuses: async () => {
        try {
            const statuses = await Status.find();
            return statuses;
        } catch (err) {
            throw new Error("Error retrieving statuses");
        }
    },
    getTasks: async () => {
        try {
            const tasks = await Task.find();
            // console.log('tas*****', tasks);
            return tasks;
        } catch (err) {
            throw new Error("Error retrieving tasks");
        }
    },
    moveTask: async ({ sourceTaskId, sourceTaskStatusId, destinationTaskStatusId, destinationTaskOrder }) => {
        try {
          const task = await Task.findById(sourceTaskId);
          if (task) {
                task.order = destinationTaskOrder;
                task.status = destinationTaskStatusId;
                await task.save();
                if (sourceTaskStatusId !== destinationTaskStatusId) {
                    const sourceTasksStatus = await Task.find({status: sourceTaskStatusId});
                    if (sourceTasksStatus) {
                        await Promise.all(
                            sourceTasksStatus.map(async (sourceTasksStatusItem, index) => {
                                sourceTasksStatusItem.order = index;
                                await sourceTasksStatusItem.save();
                            })
                        );
                    }
                }
                

                const destinationTasksStatus = await Task.find({status: destinationTaskStatusId}).where('order').gte(destinationTaskOrder);
                if (destinationTasksStatus) {
                    await Promise.all(
                        destinationTasksStatus.map(async (destinationTasksStatusItem) => {
                            if (destinationTasksStatusItem?._id?.toString() !== task?._id?.toString()) {
                                destinationTasksStatusItem.order += 1;
                                await destinationTasksStatusItem.save();
                            }
                           
                        })
                    );
                }
            
            
            
          } else {
            throw new Error("There is no such Task");
          }
        
          return task;
        } catch (err) {
            console.log('updateTask', err);
          throw new Error("Error updating Task");
        }
    },
    getDashboard: async () => {
        try {
            const statuses = await Status.find();
            let result = [];
            if (statuses) {
                for (let item of statuses) {
                   const tasks = await Task.find({status: item._id}).sort([['order', 1]]);
                    const itemRes = {
                        status: item,
                        tasks
                    }
                    result = [...result, itemRes]
                }
            }
            return result;
        } catch (err) {
            throw new Error("Error retrieving tasks");
        }
    },
    createTask: async ({ name, status }) => {
        try {
            const tasks = await Task.find({status});
            const task = new Task({ _id: new mongoose.Types.ObjectId(), name, status, order: tasks.length ? tasks.length : 0 });
            await task.save();
            return task;
        } catch (err) {
            console.log('error', err);
          throw new Error("Error creating task");
        }
    },
    deleteTask: async ({ id }) => {
        try {
          const task = await Task.findByIdAndDelete(id);
          const tasksStatus = await Task.find({status: task?.status});
            if (tasksStatus) {
                await Promise.all(
                    tasksStatus.map(async (task, index) => {
                        task.order = index;
                        await task.save();
                    })
                );
            }
          return task;
        } catch (err) {
            console.log(err);
          throw new Error("Error deleting task");
        }
      },
};

module.exports = resolvers;