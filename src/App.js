import React, { useState } from 'react';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState(null); // New state for tracking the task being edited
  const [editValue, setEditValue] = useState(''); // New state for storing the edited task value
  const [editDate, setEditDate] = useState(''); // New state for storing the edited task date

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() === '') return;
    const todoItem = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      createdDate: new Date().toLocaleDateString(),
      completedDate: null,
    };
    setTodos([...todos, todoItem]);
    setNewTodo('');
  };

  const handleTodoComplete = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
            completedDate: todo.completed ? null : new Date().toLocaleDateString(),
          };
        }
        return todo;
      });
      const completedTodos = updatedTodos.filter((todo) => todo.completed);
      const incompletedTodos = updatedTodos.filter((todo) => !todo.completed);
      return [...incompletedTodos, ...completedTodos];
    });
  };

  const handleTodoDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleTodoEdit = (id, text, date) => {
    setEditTodo(id); // Set the ID of the task being edited
    setEditValue(text); // Set the initial value for editing
    setEditDate(date); // Set the initial date for editing
  };

  const handleEditInputChange = (event) => {
    setEditValue(event.target.value); // Update the edit value as the user types
  };

  const handleEditDateChange = (event) => {
    setEditDate(event.target.value); // Update the edit date as the user selects a new date
  };

  const handleEditFormSubmit = (event, id) => {
    event.preventDefault();
    if (editValue.trim() === '') return;
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            text: editValue, // Update the text of the edited task
            createdDate: editDate || todo.createdDate, // Update the date of the edited task
          };
        }
        return todo;
      });
      return updatedTodos;
    });
    setEditTodo(null); // Clear the edit task state after submission
    setEditValue(''); // Clear the edit value state after submission
    setEditDate(''); // Clear the edit date state after submission
  };

  const completedTodos = todos.filter((todo) => todo.completed);
  const incompletedTodos = todos.filter((todo) => !todo.completed);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          background: '#e0c09f',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          style={{
            backgroundColor: '#f8f1e5',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Martin TODO List</h1>
          <form
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
            onSubmit={handleFormSubmit}
          >
            <input
              type="text"
              placeholder="Add new task"
              value={newTodo}
              onChange={handleInputChange}
              style={{
                padding: '10px',
                width: '200px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                marginLeft: '10px',
                backgroundColor: '#4caf50',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Add
            </button>
          </form>
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Todo Tasks</h2>
          <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left' }}>
            {incompletedTodos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  marginBottom: '10px',
                  padding: '10px',
                  backgroundColor: '#fff',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleTodoComplete(todo.id)}
                    style={{ marginRight: '8px' }}
                  />
                  {editTodo === todo.id ? (
                    <form
                      onSubmit={(event) => handleEditFormSubmit(event, todo.id)}
                      style={{ display: 'flex' }}
                    >
                      <input
                        type="text"
                        value={editValue}
                        onChange={handleEditInputChange}
                        style={{ marginRight: '8px' }}
                      />
                      <input
                        type="date"
                        value={editDate}
                        onChange={handleEditDateChange}
                        style={{ marginRight: '8px' }}
                      />
                      <button type="submit">Save</button>
                    </form>
                  ) : (
                    todo.text
                  )}
                </label>
                <div style={{ fontSize: '12px', color: '#888' }}>{todo.createdDate}</div>
                <div>
                  {editTodo !== todo.id && (
                    <button
                      onClick={() => handleTodoEdit(todo.id, todo.text, todo.createdDate)}
                      style={{
                        backgroundColor: '#ff9800',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        marginRight: '4px',
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleTodoDelete(todo.id)}
                    style={{
                      backgroundColor: '#f44336',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h2 style={{ fontSize: '18px', marginBottom: '10px', marginTop: '20px' }}>
            Completed Tasks
          </h2>
          <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left' }}>
            {completedTodos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  marginBottom: '10px',
                  padding: '10px',
                  backgroundColor: '#fff',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  textDecoration: 'line-through',
                }}
              >
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleTodoComplete(todo.id)}
                    style={{ marginRight: '8px' }}
                  />
                  {editTodo === todo.id ? (
                    <form
                      onSubmit={(event) => handleEditFormSubmit(event, todo.id)}
                      style={{ display: 'flex' }}
                    >
                      <input
                        type="text"
                        value={editValue}
                        onChange={handleEditInputChange}
                        style={{ marginRight: '8px' }}
                      />
                      <input
                        type="date"
                        value={editDate}
                        onChange={handleEditDateChange}
                        style={{ marginRight: '8px' }}
                      />
                      <button type="submit">Save</button>
                    </form>
                  ) : (
                    todo.text
                  )}
                </label>
                <div style={{ fontSize: '12px', color: '#888' }}>{todo.completedDate}</div>
                <div>
                  {editTodo !== todo.id && (
                    <button
                      onClick={() => handleTodoEdit(todo.id, todo.text, todo.completedDate)}
                      style={{
                        backgroundColor: '#ff9800',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        marginRight: '4px',
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleTodoDelete(todo.id)}
                    style={{
                      backgroundColor: '#f44336',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
