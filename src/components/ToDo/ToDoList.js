
import { Link } from "react-router-dom";

function ToDoList({ todos, onRemove }) { 
  return (
    <ul style={{ padding: 0 }}>
      {todos.map((t) => (
        <li
          key={t.id}
          style={{
            listStyle: "none",
            marginBottom: 12,
            padding: 10,
            border: "1px solid #eee",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input type="checkbox" checked={!!t.completed} readOnly />
            <div>
              <div
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                  opacity: t.completed ? 0.6 : 1,
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                {t.name}
              </div>
              {t.description && (
                <div style={{ fontSize: "12px", color: "#666" }}>
                  {t.description}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            {/* 2. Виправляємо todo.id на t.id (згідно з вашим map) */}
            <Link to={`/todo-list/${t.id}`} className="edit-link">
              Редагувати
            </Link>

            <button
              onClick={() => onRemove(t.id)}
              style={{
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ToDoList;
