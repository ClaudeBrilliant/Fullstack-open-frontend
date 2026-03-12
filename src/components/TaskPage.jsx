import { useState, useEffect } from "react";
import { getAllTasks, createTask, deleteTask, updateTask } from "../services/Tasks";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // computed filtered tasks
  const filteredTasks = tasks
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => filterPriority === "all" ? true : t.priority === filterPriority)
    .filter((t) => {
      if (filterStatus === "all") return true;
      if (filterStatus === "completed") return t.completed;
      if (filterStatus === "pending") return !t.completed;
      return true;
    });

 useEffect(() => {
  const load = async () => {
    try {
      const data = await getAllTasks();
      setTasks(Array.isArray(data) ? data : []); // ✅ only line that changes
    } catch (err) {
      console.error("Failed to load tasks:", err);
    }
  };
  load();
}, []);

  const handleAddTask = async (formData) => {
    try {
      const newTask = await createTask(formData);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  const handleUpdateTask = async (id, formData) => {
    try {
      const updated = await updateTask(id, formData);
      setTasks((prev) => prev.map((t) => t.id === id ? updated : t));
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => (t._id ?? t.id) !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <>
      <TaskForm addTask={handleAddTask} />

      {/* Filter Bar */}
      <div className="w-full max-w-lg mx-auto mt-4 px-4 flex flex-col gap-3">

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                     text-gray-800 placeholder-gray-400 focus:outline-none
                     focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />

        {/* Priority & Status */}
        <div className="flex gap-3">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200
                       bg-white text-gray-700 focus:outline-none focus:ring-2
                       focus:ring-blue-500 transition-all duration-200"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200
                       bg-white text-gray-700 focus:outline-none focus:ring-2
                       focus:ring-blue-500 transition-all duration-200"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Clear filters button — only shows when filters are active */}
        {(search || filterPriority !== "all" || filterStatus !== "all") && (
          <button
            onClick={() => {
              setSearch("");
              setFilterPriority("all");
              setFilterStatus("all");
            }}
            className="text-sm text-blue-500 hover:text-blue-700 underline text-left"
          >
            Clear filters
          </button>
        )}
      </div>

      <TaskList
        tasks={filteredTasks}
        deleteTask={handleDeleteTask}
        updateTask={handleUpdateTask}
        totalCount={tasks.length}
      />
    </>
  );
}

export default TasksPage;