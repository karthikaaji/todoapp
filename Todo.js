import { useState, useEffect } from 'react';
import './todo.css';


const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [updatedTodoTitle, setUpdatedTodoTitle] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoObj = {
        id: todos.length + 1,
        title: newTodo,
        completed: false
      };
      setTodos([...todos, newTodoObj]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id) => {
    setEditingTodoId(id);
    const todoToEdit = todos.find(todo => todo.id === id);
    setUpdatedTodoTitle(todoToEdit.title);
  };

  const handleUpdateTodo = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: updatedTodoTitle };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditingTodoId(null);
    setUpdatedTodoTitle('');
  };

  const handleToggleDone = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className='container'>
      <h2 style={{color:'white'}}>TodoApp</h2>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button type="button" onClick={handleAddTodo}>
        Add
      </button>
      {todos.map(todo => (
        <div key={todo.id} style={{color:todo.completed?'green':'red'}}>
          {editingTodoId === todo.id ? (
            <div>
              <input
                type="text"
                value={updatedTodoTitle}
                onChange={e => setUpdatedTodoTitle(e.target.value)}
              />
              <button type="button" onClick={() => handleUpdateTodo(todo.id)}>
                Update
              </button>
            </div>
          ) : (
            <div>
              <h2>{todo.title}</h2>
              <button type="button" onClick={() => handleDeleteTodo(todo.id)}>
                Delete
              </button>
              <button type="button" onClick={() => handleEditTodo(todo.id)}>
                Edit
              </button>
              <button type="button" onClick={() => handleToggleDone(todo.id)}>
                {todo.completed ? 'Finished' : 'Not Finished'}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Todo;