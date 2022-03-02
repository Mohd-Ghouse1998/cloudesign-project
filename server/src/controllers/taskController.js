const taskModel = require("../models/taskModel");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidStatus = function (value) {
   return  ["Open", "In-Progress", "Completed"].indexOf(value) !== -1;
    
};



const createTask = async function (req, res) {
  try {
    let reqBody = req.body;

    let { title, description, status } = reqBody;

    if (!isValid(title)) {
       res.status(400).send({ status: false, message: "Title is required" });
       return 
      
    }
    let isTitleUsed=await taskModel.findOne({title})

      if (isTitleUsed) {
        res.status(400).send({ status: false, message: "Title is already used" });
        return;
      }

    if (!isValidStatus(status)) {
      res.status(400).send({status: false,message: `status should be among Open, In-Progress and Completed`,});
      return 
    }

    let createData = await taskModel.create(reqBody);
    res.status(201).send({ status: true, message: "Task created sucessfully", createData });
    return 

  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
    return 
  }
};





const getTask=async function(req,res){
  try{

      let getData=await taskModel.find()
      res.status(200).send({status:true,message:"fetched all tasks",getData})
      return 



  }catch(error){
    res.status(500).send({status:false,message:error.message})
    return 
  }
}










const editTask = async function (req, res) {
  try {
    
    let name = req.query.name
    

   
    if (!isValid(name)) {
      res.status(400).send({ status: false, message: "Title name is required" });
      return;
    }

    let taskList = await taskModel.findOne({title:name})
    
    if (!taskList) {
      res.status(404).send({ status: false, message: "this task is not found" });
      return;
    }
  
    let reqBody = req.body;
    let { title, description, status } = reqBody;

    let updateTask = {};

    

    if (title) {

      

      if (!isValid(title)) {
        res.status(400).send({ status: false, message: "Title is required" });
        return;
      }

      let isTitleUsed=await taskModel.findOne({title})

      if (isTitleUsed) {
        res.status(400).send({ status: false, message: "Title is already used" });
        return;
      }

      updateTask["title"] = title;
    }
    if (description) {
      updateTask["description"] = description;
    }
    if (status) {

        if (!isValid(status)) {
            res.status(400).send({ status: false, message: "status is required" });
            return;
          }

        if (!isValidStatus(status)) {
            res.status(400).send({status: false,message: `status should be among Open, In-Progress and Completed`,});
            return 
          }
      updateTask["status"] = status;
    }

    let editData = await taskModel.findOneAndUpdate({name}, updateTask, {
      new: true,
    });
    return res
      .status(200)
      .send({ status: true, message: "Task updated successfully", editData });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
    return 
  }
};

module.exports={createTask,getTask ,editTask}
