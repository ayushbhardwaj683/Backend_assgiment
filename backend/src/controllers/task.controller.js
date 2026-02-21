const Task = require("../models/Task");

// GET /api/v1/tasks

exports.getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === "admin") {

      tasks = await Task.find().populate("user", "email name").sort({ createdAt: -1 });
    } else {

      tasks = await Task.find({ user: req.user._id }).populate("user", "email name").sort({ createdAt: -1 });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch tasks" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      user: req.user._id 
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to create task" });
  }
};


exports.updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });


    if (task.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to update task" });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });


    if (task.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this task" });
    }

    await task.deleteOne();
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to delete task" });
  }
};