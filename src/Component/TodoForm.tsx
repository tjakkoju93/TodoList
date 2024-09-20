import React, { Dispatch, SetStateAction, useState } from "react";
import ToDoService from "../ToDoService";
import TodoTypes from "../ToDo";
import '../CSS/TodoForm.css'

interface PropTypes {
  setTodos: Dispatch<SetStateAction<TodoTypes[]>>;
}

const TodoForm: React.FC<PropTypes> = ({ setTodos }) => {
  const [newtodoText, setNewTodoText] = useState<string>("");
  const handleAddTodo = () => {
    if (newtodoText.trim() !== "") {
      const newTodo = ToDoService.addTodos(newtodoText);
      setTodos((prevTodo) => [...prevTodo, newTodo]);
      setNewTodoText("");
    }
  };

  return (
    <div className="inputForm">
      <input
        type="text"
        value={newtodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        autoFocus={true}
        placeholder="Add a Task"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default TodoForm;
