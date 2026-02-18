import Task from "../models/TaskModel.js";
import redis from "redis";
import dotenv from "dotenv";

dotenv.config();

let redisClient = null;


(async () => {
  try {
    if (process.env.REDIS_URL) {
      redisClient = redis.createClient({
        url: process.env.REDIS_URL,
      });

      redisClient.on("error", (err) => {
        console.log("Redis Error:", err);
        redisClient = null; 
      });

      await redisClient.connect();
      console.log("Redis Connected ");
    } else {
      console.log("Redis not configured - running without cache");
    }
  } catch (err) {
    console.log("Redis Connection Failed:", err.message);
    redisClient = null; 
  }
})();



const clearUserCache = async (userId) => {
  if (!redisClient) return;
  try {
    const keys = await redisClient.keys(`tasks_${userId}_page_*`);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (err) {
    console.log("Cache clear error:", err.message);
  }
};

const clearAllTasksCache = async () => {
  if (!redisClient) return;
  try {
    const keys = await redisClient.keys("all_tasks_page_*");
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (err) {
    console.log("Cache clear error:", err.message);
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

  
    if (redisClient) {
      try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
          console.log("Admin tasks from Redis");
          return res.status(200).json(JSON.parse(cachedData));
        }
      } catch (err) {
        console.log("Cache read error:", err.message);
      }
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

  
    if (redisClient) {
      try {
        await redisClient.setEx(cacheKey, 60, JSON.stringify(responseData));
      } catch (err) {
        console.log("Cache write error:", err.message);
      }
    }

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

  
    if (redisClient) {
      try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
          console.log("User tasks from Redis ");
          return res.status(200).json(JSON.parse(cachedData));
        }
      } catch (err) {
        console.log("Cache read error:", err.message);
      }
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

    
    if (redisClient) {
      try {
        await redisClient.setEx(cacheKey, 60, JSON.stringify(responseData));
      } catch (err) {
        console.log("Cache write error:", err.message);
      }
    }

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
