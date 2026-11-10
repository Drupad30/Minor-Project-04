import { useState } from "react";
import TodoPage from "./pages/TodoPage";
import NotesPage from "./pages/NotesPage";

function App() {
  const [activePage, setActivePage] = useState("todo");

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">✦</div>
          <h2>FocusFlow</h2>
        </div>

        <p className="menu-label">WORKSPACE</p>

        <nav className="sidebar-nav">
          <button
            className={activePage === "todo" ? "nav-item active" : "nav-item"}
            onClick={() => setActivePage("todo")}
          >
            <span className="nav-icon">✓</span>
            <span>My Tasks</span>
          </button>

          <button
            className={activePage === "notes" ? "nav-item active" : "nav-item"}
            onClick={() => setActivePage("notes")}
          >
            <span className="nav-icon">▤</span>
            <span>My Notes</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-avatar">U</div>
          <div className="profile-info">
            <strong>Drupad Rajput</strong>
            <small>Personal Productivity</small>
          </div>
        </div>
      </aside>

      {/* Main Dashboard */}
      <div className="dashboard-main">

        <header className="topbar">
          <div>
            <p className="topbar-label">PRODUCTIVITY WORKSPACE</p>
            <h2>
              {activePage === "todo" ? "My Tasks" : "My Notes"}
            </h2>
          </div>

          <div className="topbar-status">
            <span className="status-dot"></span>
            Stay productive
          </div>
        </header>

        <main className="page-content">
          {activePage === "todo" ? (
            <TodoPage />
          ) : (
            <NotesPage />
          )}
        </main>

        <footer className="dashboard-footer">
          FocusFlow · Organize your day, one step at a time.
        </footer>

      </div>
    </div>
  );
}

export default App;