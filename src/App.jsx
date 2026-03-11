import './index.css'
import TasksPage from './components/TaskPage'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm py-4 px-6 mb-6">
        <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
      </header>
      <TasksPage />
    </div>
  )
}

export default App