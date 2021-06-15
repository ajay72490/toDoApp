const Task = require("../mongooseModels/Task");

module.exports = {
  async createTask(data) {
    console.log("data", data);
    const taskData = {
      taskDetails: data.taskDetails,
      done: data.done,
      userId: data.userId,
    };

    var taskToSave = new Task(taskData);
    return await taskToSave.save();
  },

  async editTask(data) {
    const updatedTask = await Task.updateOne(
      {
        _id: ObjectId(data.taskId),
      },
      {
        $set: {
          taskDetails: data.taskDetails,
          done: data.done,
        },
      }
    );
    if (updatedTask && updatedTask.nModified) {
      return "Task Updated";
    } else {
      throw "Task not updated";
    }
  },

  async getTask(data) {
    const task = await Task.aggregate([
      {
        $match: { _id: ObjectId(data.taskId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
      {
        $project: {
          taskDetails: 1,
          done: 1,
          createdAt: 1,
          updatedAt: 1,
          "user.name": 1,
          "user.email": 1,
          _id: 0,
        },
      },
    ]);
    return task;
  },
};
