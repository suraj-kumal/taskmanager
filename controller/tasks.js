const tasks = require("../models/tasks");
const asyncWrapper = require("../middleware/async");
const  { createCustomError } = require("../errors/custom-errors");
const getAllTasks = asyncWrapper( async (req,res)=>{
       const allTask = await tasks.find();
    //    res.status(200).json({allTask});
    //    res.status(200).json({allTask,value:allTask.length});
        res.status(200).json({status:"success",data:{ allTask , nbhits : allTask.length }});
})

const createTask = asyncWrapper( async (req,res) =>{
        const task = await tasks.create(req.body)
        res.status(201).json({task});
})

const getTask = asyncWrapper( async(req,res,next) =>{
        const { id : taskID } = req.params;
        const task = await tasks.findOne({ _id : taskID});
        if(!task){
            return next(createCustomError(`No task with id :${taskID}`,404));
        }
        res.status(201).json({task});
})
const updateTask = asyncWrapper( async(req,res,next) =>{
        const {id:taskID} = req.params;
        const task = await tasks.findOneAndUpdate({ _id: taskID },{ $set: req.body }, { new: true , runValidators : true });
        if(!task){
            return next(createCustomError(`No task with id :${taskID}`,404));
        }
        res.status(200).json({task});
})

const deleteTask = asyncWrapper( async(req,res,next) =>{
        const {id:taskID} = req.params;
        const task = await tasks.findOneAndDelete({_id : taskID});
        if(!task){
            return next(createCustomError(`No task with id :${taskID}`,404));
        }
        // res.status(200).json({task});
        res.status(200).json({ task : null, status : "success"})
})
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}


