var schema = new Mongoose.Schema(
  {
    taskDetails: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Task", schema);
