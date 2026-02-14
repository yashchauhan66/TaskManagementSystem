import Task from "../models/TaskModel.js";
import redis from "redis";
import dotenv from "dotenv";

dotenv.config();


let redisClient;

(async () => {
  try {
    redisClient = redis.createClient({
      url: process.env.REDIS_URL,
    });

    redisClient.on("error", (err) => {
      console.log("Redis Error:", err);
    });

    await redisClient.connect();
    console.log("Redis Connected ");
  } catch (err) {
    console.log("Redis Connection Failed:", err.message);
  }
})();



const clearUserCache = async (userId) => {
  const keys = await redisClient.keys(`tasks_${userId}_page_*`);
  if (keys.length > 0) {
    await redisClient.del(keys);
  }
};

const clearAllTasksCache = async () => {
  const keys = await redisClient.keys("all_tasks_page_*");
  if (keys.length > 0) {
    await redisClient.del(keys);
  }
};



export const createTask = async (req, res) => {
  try {
    const { title, description, status = "pending" } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      user: req.user.id,
    });

    
    await clearUserCache(req.user.id);
    await clearAllTasksCache();

    res.status(201).json({
      success: true,
      task,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getAllTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const cacheKey = `all_tasks_page_${page}_limit_${limit}`;

  
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Admin tasks from Redis");
      return res.status(200).json(JSON.parse(cachedData));
    }

    const totalTasks = await Task.countDocuments({});
    const totalPages = Math.ceil(totalTasks / limit);
    const hasNextPage = page < totalPages;

    const tasks = await Task.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const responseData = {
      success: true,
      page,
      totalPages,
      hasNextPage,
      totalTasks,
      tasks,
    };

    
    await redisClient.setEx(cacheKey, 60, JSON.stringify(responseData));

    console.log("Admin tasks from MongoDB ");

    res.status(200).json(responseData);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export const getTask = async (req, res) => {
  try {
    const userId = req.user.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const cacheKey = `tasks_${userId}_page_${page}_limit_${limit}`;

    
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("User tasks from Redis ");
      return res.status(200).json(JSON.parse(cachedData));
    }

    const totalTasks = await Task.countDocuments({ user: userId });
    const totalPages = Math.ceil(totalTasks / limit);
    const hasNextPage = page < totalPages;

    const tasks = await Task.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const responseData = {
      success: true,
      page,
      totalPages,
      hasNextPage,
      totalTasks,
      tasks,
    };

    //  Store in Redis \\
    await redisClient.setEx(cacheKey, 60, JSON.stringify(responseData));

    console.log("User tasks from MongoDB ");

    res.status(200).json(responseData);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    const query =
      userRole === "admin"
        ? { _id: taskId }
        : { _id: taskId, user: userId };

    const task = await Task.findOneAndUpdate(query, req.body, {
      new: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    
    await clearUserCache(userId);
    await clearAllTasksCache();

    res.status(200).json({
      success: true,
      task,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    const query =
      userRole === "admin"
        ? { _id: taskId }
        : { _id: taskId, user: userId };

    const task = await Task.findOneAndDelete(query);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    
    await clearUserCache(userId);
    await clearAllTasksCache();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
