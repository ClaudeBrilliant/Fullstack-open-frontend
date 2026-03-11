import { useState } from "react";

function TaskForm({ addTask }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    addTask(form);
    setForm({ title: "", description: "", dueDate: "", priority: "medium", completed: false });
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Task</h2>

      <div className="flex flex-col gap-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter task title..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 
                       text-gray-800 placeholder-gray-400 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                       transition-all duration-200"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter task description..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 
                       text-gray-800 placeholder-gray-400 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                       transition-all duration-200 resize-none"
          />
        </div>

        {/* Due Date & Priority side by side */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="datetime-local"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 
                         text-gray-800 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 transition-all duration-200"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 
                         text-gray-800 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 transition-all duration-200"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!form.title.trim()}
          className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 
                     text-white font-semibold rounded-xl transition-all 
                     duration-200 active:scale-95 disabled:opacity-50 
                     disabled:cursor-not-allowed shadow-md mt-2"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default TaskForm;