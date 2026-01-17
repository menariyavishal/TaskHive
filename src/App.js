import { useState, useMemo } from "react";
import "./App.css";
import Header from "./components/layout/Header/Header";
import TaskForm from "./components/tasks/TaskForm/TaskForm";
import TaskList from "./components/tasks/TaskList/TaskList";
import FilterTabs from "./components/tasks/FilterTabs/FilterTabs";
import SearchBar from "./components/tasks/SearchBar/SearchBar";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  // State: Single source of truth for tasks (persisted in localStorage)
  const [tasks, setTasks] = useLocalStorage("taskhive-tasks", []);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Handler: Add new task to the beginning of the array
  const addTask = (task) => {
    setTasks((prevTasks) => [task, ...prevTasks]);
  };

  // Handler: Toggle task completion status (immutable update)
  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Handler: Delete task by id (immutable update)
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Handler: Edit task title
  const editTask = (id, newTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  // Handler: Clear all completed tasks
  const clearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  // Computed: Filter and search tasks
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Apply filter
    if (filter === "active") {
      result = result.filter((task) => !task.completed);
    } else if (filter === "completed") {
      result = result.filter((task) => task.completed);
    }

    // Apply search
    if (searchQuery.trim()) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result;
  }, [tasks, filter, searchQuery]);

  // Computed: Task counts
  const taskCounts = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const active = total - completed;
    return { total, active, completed };
  }, [tasks]);

  return (
    <div className="app-container">
      <Header 
        title="TaskHive" 
        subtitle="Organize tasks. Stay focused."
        showControls={tasks.length > 0}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filter={filter}
        onFilterChange={setFilter}
        taskCounts={taskCounts}
        onClearCompleted={clearCompleted}
      />
      
      <main className="app-main">
        <TaskForm onAddTask={addTask} />
        
        <TaskList
          tasks={filteredTasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
        />
      </main>
      
      <footer className="app-footer">
        <p>&copy; 2026 TaskHive. Built with React.</p>
      </footer>
    </div>
  );
}

export default App;
