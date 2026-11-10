import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete
}) {
  if (tasks.length === 0) {
    return (
      <p className="empty-message">
        No tasks found. Add your first task!
      </p>
    );
  }

  return (
    <div className="task-list">

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

    </div>
  );
}

export default TaskList;