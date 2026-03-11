import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, updateTask, totalCount }) {
  return (
    <div className="w-full max-w-lg mx-auto mt-6 px-4">
      {tasks.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-lg font-medium">
            {totalCount > 0 ? "No tasks match your filter" : "No tasks yet"}
          </p>
          <p className="text-sm">
            {totalCount > 0 ? "Try adjusting your search or filters" : "Add a task above to get started"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500 font-medium">
            {tasks.length} task{tasks.length !== 1 ? 's' : ''}
            {totalCount !== tasks.length && (
              <span className="text-gray-400"> (filtered from {totalCount})</span>
            )}
          </p>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;