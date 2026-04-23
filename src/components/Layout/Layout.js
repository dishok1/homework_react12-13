import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";

const Layout = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      
      await fetch("http://localhost:3030/auth", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isLogged: false }),
      });

    
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <NavLink to="/" className="nav-link">Home</NavLink>

        
        {isAuthenticated ? (
          <>
            <NavLink to="/todo-list" className="nav-link">ToDo</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          
          <NavLink to="/login" className="nav-link">Login</NavLink>
        )}
      </nav>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
