function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>

      <div className="task-info">

        <h3>{task.title}</h3>

        <p>
          Status: {task.completed ? "Completed" : "Pending"}
        </p>

        {task.dueDate && (
          <p>Due Date: {task.dueDate}</p>
        )}

      </div>

      <div className="task-actions">

        <button onClick={() => onToggle(task.id)}>
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button onClick={() => onEdit(task)}>
          Edit
        </button>

        <button onClick={() => onDelete(task.id)}>
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskItem;