import React, { useState } from "react";
import "./todo.css";

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("all"); // all, active, completed

    const addTodo = () => {
        if (inputValue.trim() !== "") {
            const newTodo = {
                id: Date.now(),
                text: inputValue.trim(),
                completed: false,
            };
            setTodos([...todos, newTodo]);
            setInputValue("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            addTodo();
        }
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const clearCompleted = () => {
        setTodos(todos.filter((todo) => !todo.completed));
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    const activeTodosCount = todos.filter((todo) => !todo.completed).length;
    const completedTodosCount = todos.filter((todo) => todo.completed).length;

    return (
        <div className="todo-container" data-testid="todo-container">
            <h1 data-testid="todo-title">Todo App</h1>
            
            <div className="todo-input-section" data-testid="todo-input-section">
                <input
                    type="text"
                    className="todo-input"
                    data-testid="todo-input"
                    placeholder="What needs to be done?"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button
                    className="add-button"
                    data-testid="add-todo-button"
                    onClick={addTodo}
                >
                    Add Todo
                </button>
            </div>

            <div className="todo-filters" data-testid="todo-filters">
                <button
                    className={`filter-button ${filter === "all" ? "active" : ""}`}
                    data-testid="filter-all"
                    onClick={() => setFilter("all")}
                >
                    All ({todos.length})
                </button>
                <button
                    className={`filter-button ${filter === "active" ? "active" : ""}`}
                    data-testid="filter-active"
                    onClick={() => setFilter("active")}
                >
                    Active ({activeTodosCount})
                </button>
                <button
                    className={`filter-button ${filter === "completed" ? "active" : ""}`}
                    data-testid="filter-completed"
                    onClick={() => setFilter("completed")}
                >
                    Completed ({completedTodosCount})
                </button>
                {completedTodosCount > 0 && (
                    <button
                        className="clear-button"
                        data-testid="clear-completed-button"
                        onClick={clearCompleted}
                    >
                        Clear Completed
                    </button>
                )}
            </div>

            <ul className="todo-list" data-testid="todo-list">
                {filteredTodos.length === 0 ? (
                    <li className="todo-empty" data-testid="todo-empty-message">
                        {filter === "all"
                            ? "No todos yet. Add one above!"
                            : filter === "active"
                            ? "No active todos!"
                            : "No completed todos!"}
                    </li>
                ) : (
                    filteredTodos.map((todo) => (
                        <li
                            key={todo.id}
                            className={`todo-item ${todo.completed ? "completed" : ""}`}
                            data-testid={`todo-item-${todo.id}`}
                        >
                            <input
                                type="checkbox"
                                className="todo-checkbox"
                                data-testid={`todo-checkbox-${todo.id}`}
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                            />
                            <span
                                className="todo-text"
                                data-testid={`todo-text-${todo.id}`}
                            >
                                {todo.text}
                            </span>
                            <button
                                className="delete-button"
                                data-testid={`delete-todo-button-${todo.id}`}
                                onClick={() => deleteTodo(todo.id)}
                                aria-label={`Delete todo: ${todo.text}`}
                            >
                                Delete
                            </button>
                        </li>
                    ))
                )}
            </ul>

            <div className="todo-stats" data-testid="todo-stats">
                <span>Total: {todos.length}</span>
                <span>Active: {activeTodosCount}</span>
                <span>Completed: {completedTodosCount}</span>
            </div>
        </div>
    );
};

export default Todos;
