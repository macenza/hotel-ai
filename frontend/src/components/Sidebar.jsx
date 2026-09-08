import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "AI Dashboard",
    path: "/dashboard",
  },
  {
    label: "Review Form",
    path: "/review-form",
  },
  {
    label: "Sentiment Dashboard",
    path: "/sentiment-dashboard",
  },
  {
    label: "Revenue Prediction",
    path: "/revenue-dashboard",
  },
  {
    label: "Customer Segmentation",
    path: "/customer-segmentation",
  },
  {
    label: "Booking Cancellation",
    path: "/booking-cancellation",
  },
 
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">H</div>

          <div>
            <h2>Hotel AI</h2>
            <span>Management System</span>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-section-title">
            AI Modules
          </p>

          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
                onClick={onClose}
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;