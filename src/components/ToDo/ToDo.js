import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../../redux/todos/todoSlice";
import ToDoList from "./ToDoList";
import Select from "./Select";
import "./ToDoStyle.css";

function ToDo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items: todos, loading } = useSelector((state) => state.todos);

  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    completed: false,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    if (id && id !== "new") {
      const todoToEdit = todos.find((t) => String(t.id) === String(id));
      if (todoToEdit) {
        setEditingId(id);
        setFormData({ ...todoToEdit });
        setShowForm(true);
      }
    } else if (id === "new") {
      setEditingId(null);
      setFormData({ name: "", description: "", completed: false });
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [id, todos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await dispatch(updateTodo({ id: editingId, data: formData }));
    } else {
      await dispatch(addTodo(formData));
    }
    navigate("/todo-list");
  };

  const removeTodo = (id) => {
    if (window.confirm("Видалити?")) {
      dispatch(deleteTodo(id));
    }
  };

  const filteredTodos = todos.filter((t) =>
    filter === "active"
      ? !t.completed
      : filter === "completed"
        ? t.completed
        : true,
  );

  if (loading && todos.length === 0) return <div>Завантаження...</div>;

  return (
    <div className="todo-container">
      {showForm && (
        <div className="modal">
          
          <form className="todo-form" onSubmit={handleSubmit}>
            <h3>{editingId ? "Редагувати" : "Додати"} Todo</h3>

            <input
              placeholder="Назва"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <textarea
              placeholder="Опис"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <label>
              Виконано:
              <input
                type="checkbox"
                checked={formData.completed}
                onChange={(e) =>
                  setFormData({ ...formData, completed: e.target.checked })
                }
              />
            </label>

            <div className="form-buttons">
              
              <button type="submit" className="save-btn">
                Зберегти
              </button>
              <Link to="/todo-list" className="cancel-btn">
                Скасувати
              </Link>
            </div>
          </form>
        </div>
      )}

      {!showForm && (
        <>
          
          <Link to="/todo-list/new" className="add-btn-link">
            Додати todo
          </Link>

          {todos.length === 0 ? (
            <div className="empty-state">
              <p>У вас ще немає завдань.</p>
            </div>
          ) : (
            <>
              <Select value={filter} onChange={setFilter} />
              <h2>Всього: {filteredTodos.length}</h2>
              <ToDoList todos={filteredTodos} onRemove={removeTodo} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ToDo;
