import { useState, useEffect } from "react";

function TaskForm({
  onAddTask,
  editingTask,
  onUpdateTask,
  onCancelEdit
}) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDueDate(editingTask.dueDate || "");
    } else {
      setTitle("");
      setDueDate("");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task!");
      return;
    }

    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        title: title.trim(),
        dueDate
      });
    } else {
      onAddTask({
        id: crypto.randomUUID(),
        title: title.trim(),
        dueDate,
        completed: false
      });
    }

    setTitle("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">

      <input
        type="text"
        placeholder="Enter your task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">
        {editingTask ? "Update Task" : "Add Task"}
      </button>

      {editingTask && (
        <button
          type="button"
          onClick={onCancelEdit}
          className="cancel-btn"
        >
          Cancel
        </button>
      )}

    </form>
  );
}

export default TaskForm;