import Task from "../models/TaskModel.js";
export const createTask=async(req ,res)=>{
    try{
    const {title , description , status="pending" }=req.body;
    if(!title || !description){
        return res.status(400).json({message:"All fields are required"});
    }
    const task=await Task.create({
        title,
        description,
        status,
         user: req.user.id,
    });
    res.status(201).json({
        success:true,
        task,
    });
}catch(err){
    res.status(500).json({message:err.message});
    console.log(err.message);
}
};

export const getAllTasks=async(req ,res)=>{
    try{
    const AllTask=await Task.find({});
    res.status(200).json({
        success:true,
        AllTask,
    });
}catch(err){
    res.status(500).json({message:err.message});
    }
};

export const getTask=async(req ,res)=>{
    try{
    const AllTask=await Task.find({user:req.user.id});
    res.status(200).json({
        success:true,
        AllTask,
    });
    }catch(err){
    res.status(500).json({message:err.message});
    }
};

export const updateTask=async(req , res)=>{
 try{
  const taskId=req.params.id;
  const userId=req.user.id;
  const userRole=req.user.role;

  
  const query = userRole === 'admin' ? {_id: taskId} : {_id: taskId, user: userId};
  
  const task=await Task.findOneAndUpdate(query, req.body, {new:true});

if(!task){
    return res.status(404).json({message:"Task not Found"});
}
res.status(200).json({
    success:true,
    task
})
 }catch(err){
  res.status(500).json({message:err.message});
 }
};

export const deleteTask=async(req , res)=>{
 try{
  const taskId=req.params.id;
  const userId=req.user.id;
  const userRole=req.user.role;

  
  const query = userRole === 'admin' ? {_id: taskId} : {_id: taskId, user: userId};
  
  const task=await Task.findOneAndDelete(query);
  if(!task){
        return res.status(400).json({message:"Task not found"});
  }
  res.status(200).json({
    success:true,
    message:"task deleted successfully"
  })
 }catch(err){
    res.status(404).json({message:err.message});
 }
};
