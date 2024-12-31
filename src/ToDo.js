import './ToDo.css';
import { useState } from 'react';

function ToDo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, incomplete

  const handleAddTodo = () => {
    if (title && description) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title,
          description,
          completed: false,
          lastUpdated: new Date().toLocaleString(),
        },
      ]);
      setTitle('');
      setDescription('');
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setTitle(todoToEdit.title);
    setDescription(todoToEdit.description);
    handleDeleteTodo(id);
  };

  const handleToggleCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, lastUpdated: new Date().toLocaleString() }
          : todo
      )
    );
  };

  const filteredTodos =
    filter === 'all'
      ? todos
      : filter === 'completed'
      ? todos.filter((todo) => todo.completed)
      : todos.filter((todo) => !todo.completed);

  return (
    <div className="App">
      <div className="header">
        <h1>My Todos</h1>
        <div className="nav">
          <button>Profile</button>
          <button>Home</button>
        </div>
      </div>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-list-item">
            <div className="input-wrapper">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title"
              />
            </div>
            <div className="input-wrapper">
              <label>Description</label>
              <input
                type="textares"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter the description"
              />
            </div>
          </div>
          <button type="button" className="primarybtn" onClick={handleAddTodo}>
            <i className="fas fa-plus"></i> Add
          </button>
        </div>

        <div className="btn-area">
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
          <button onClick={() => setFilter('incomplete')}>Incomplete</button>
        </div>

        <div className="todo-list">
          {filteredTodos.map((todo) => (
            <div key={todo.id} className="todo-list-item">
              <h2>{todo.title}</h2>
              <p>{todo.description}</p>
              <small>Last updated: {todo.lastUpdated}</small>
              <div className="actions">
                <button onClick={() => handleEditTodo(todo.id)}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  <i className="fas fa-trash"></i> Delete
                </button>
                <button onClick={() => handleToggleCompletion(todo.id)}>
                  {todo.completed ? (
                    <i className="fas fa-check-circle"></i>
                  ) : (
                    <i className="fas fa-circle"></i>
                  )}
                  {todo.completed ? ' Mark Incomplete' : ' Mark Completed'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToDo;
