
import { Link } from "react-router-dom"; 

function ToDoItem({ todo, onRemove }) {
  return (
    <li style={{ display: "flex", alignItems: "center", marginBottom: 8, gap: "10px" }}>
      <span style={{ color: "#333" }}>{todo.name}</span>
      
      
      <Link 
        to={`/todo-list/${todo.id}`} 
        style={{ 
          textDecoration: "none", 
          color: "#3498db", 
          fontWeight: "bold",
          fontSize: "14px" 
        }}
      >
        Редагувати
      </Link>

      <button 
        onClick={() => onRemove(todo.id)} 
        style={{ 
          marginLeft: 8,
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          padding: "3px 8px",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default ToDoItem;
