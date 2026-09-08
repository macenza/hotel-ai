import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main-content">
        <header className="mobile-header">
          <button
            className="menu-button"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <div className="mobile-brand">
            <div className="logo-icon small">H</div>
            <span>Hotel AI</span>
          </div>
        </header>

        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;