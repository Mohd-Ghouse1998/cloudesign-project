const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type:String,
      required:true,
      unique:true
    },
    description: String,
    status: {
      type: String,
      required:true,
      enum: ["Open", "In-Progress", "Completed"],
    },
  },
  { timestamps: true }
);

module.exports=mongoose.model('Task',taskSchema)