import { useState } from "react";

const priorityConfig = {
  high:   { label: 'High',   bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-600'   },
  medium: { label: 'Medium', bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-600' },
  low:    { label: 'Low',    bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-600'  },
};

function TaskItem({ task, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: task.title || "",
    description: task.description || "",
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : "",
    priority: task.priority || "medium",
    completed: task.completed || false,
  });

  const priority = priorityConfig[task.priority] || priorityConfig.medium;

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = () => {
    updateTask(task.id, form);
    setIsEditing(false);
  };

  return (
    <>
      <div className={`p-5 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-200 ${priority.bg} ${priority.border}`}>

        {/* Top row — title + buttons */}
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className={`font-semibold text-gray-800 text-base ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-blue-500 transition-colors duration-200 text-sm px-2 py-1 rounded-lg hover:bg-blue-50"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200 text-sm px-2 py-1 rounded-lg hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
        )}

        {/* Bottom row — badges */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white border ${priority.border} ${priority.text}`}>
            {priority.label}
          </span>
          {task.dueDate && (
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              isOverdue
                ? 'bg-red-100 text-red-600 border border-red-200'
                : 'bg-white text-gray-500 border border-gray-200'
            }`}>
              {isOverdue ? 'Overdue · ' : ''}{formatDate(task.dueDate)}
            </span>
          )}
          <span className={`text-xs font-medium px-2 py-1 rounded-full ml-auto ${
            task.completed
              ? 'bg-green-100 text-green-600 border border-green-200'
              : 'bg-gray-100 text-gray-500 border border-gray-200'
          }`}>
            {task.completed ? 'Done' : 'Pending'}
          </span>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-5">Edit Task</h3>

            <div className="flex flex-col gap-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 
                             text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 
                             text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Due Date & Priority */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="datetime-local"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 
                               text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 
                               text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Completed */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="completed"
                  checked={form.completed}
                  onChange={handleChange}
                  className="w-4 h-4 rounded accent-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Mark as completed</span>
              </label>

              {/* Buttons */}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 
                             hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!form.title.trim()}
                  className="flex-1 px-4 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 
                             text-white font-semibold transition-colors duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskItem;