import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    setTodos([
      {
        id: Date.now(),
        text: input,
        completed: false,
      },
      ...todos,
    ]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const resetTodos = () => {
    setTodos([]);
  };

  return (
    <div className="app-container" style={{ backgroundColor: 'orange', padding: '20px', margin: '10px', textAlign: 'center' }}>
      <h1>Made By Munawwar Shaikh</h1>
      <Form onSubmit={addTodo} className="todo-form">
        <InputGroup>
          <Form.Control
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="todo-input"
          />
          <InputGroup.Append>
            <Button type="submit" className="add-todo-button">Add Todo</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      <ListGroup>
        {todos
          .slice()
          .sort((a, b) => (a.completed === b.completed ? b.id - a.id : a.completed - b.completed))
          .map((todo) => (
            <ListGroup.Item
              key={todo.id}
              onClick={() => toggleTodo(todo.id)}
              style={{ textDecoration: todo.completed ? 'line-through' : '' }}
            >
             <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => toggleTodo(todo.id)} 
              />
              {todo.text}
            </ListGroup.Item>
          ))}
      </ListGroup>
      <Button variant="danger" onClick={resetTodos}>Reset</Button>
    </div>
  );
}

export default App;