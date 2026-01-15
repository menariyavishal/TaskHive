import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">
          TaskHive
          <span className="app-subtitle">Organize tasks. Stay focused.</span>
        </h1>
      </header>
      
      <main className="app-main">
        <div className="welcome-message">
          <p>Ready to build something amazing? 🚀</p>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>&copy; 2026 TaskHive. Built with React.</p>
      </footer>
    </div>
  );
}

export default App;
