import { useState, useEffect } from "react";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function TodoPage() {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("myTasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");

  const [editingTask, setEditingTask] = useState(null);

  // Save tasks in Local Storage
  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Update Task
  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    setEditingTask(null);
  };

  // Complete Task
  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  // Filter Tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }

    if (filter === "pending") {
      return !task.completed;
    }

    return true;
  });

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.length - completedCount;

  return (
    <div className="todo-container">

      <h2>My To-Do List</h2>

      <p className="subtitle">
        Organize your daily activities
      </p>

      <div className="task-stats">

        <div className="stat-card">
          <h3>{tasks.length}</h3>
          <p>Total Tasks</p>
        </div>

        <div className="stat-card">
          <h3>{pendingCount}</h3>
          <p>Pending</p>
        </div>

        <div className="stat-card">
          <h3>{completedCount}</h3>
          <p>Completed</p>
        </div>

      </div>

      <TaskForm
        onAddTask={addTask}
        editingTask={editingTask}
        onUpdateTask={updateTask}
        onCancelEdit={() => setEditingTask(null)}
      />

      <div className="filter-buttons">

        <button onClick={() => setFilter("all")}>
          All
        </button>

        <button onClick={() => setFilter("pending")}>
          Pending
        </button>

        <button onClick={() => setFilter("completed")}>
          Completed
        </button>

      </div>

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onEdit={setEditingTask}
        onDelete={deleteTask}
      />

    </div>
  );
}

export default TodoPage;