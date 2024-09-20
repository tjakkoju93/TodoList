import React from "react";
import TodoTypes from "../ToDo";
import { useState } from "react";
import ToDoService from "../ToDoService";
import { FaCheck, FaEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import TodoForm from "./TodoForm";
import "../CSS/TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(ToDoService.getTodos());
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedtodotext, setEditedTodoText] = useState<string>("");

  //functions handling editing action
  const handleEditStart = (id: number, text: string) => {
    setEditingTodoId(id), setEditedTodoText(text);
  };
  const handleEditCancel = () => {
    setEditingTodoId(null), setEditedTodoText("");
  };

  const handleEditSave = (id: number) => {
    if (editedtodotext.trim() !== "") {
      const updateTodo = ToDoService.updateTodo({
        id,
        text: editedtodotext,
        completed: false,
      });
      setTodos((prevTodo) =>
        prevTodo.map((todo) => (todo.id === id ? updateTodo : todo))
      );
      setEditingTodoId(null), setEditedTodoText("");
    }
  };

  //function to delete todo

  const handleDeleteTodo = (id: number) => {
    ToDoService.DeleteTodo(id);
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todoContainer">
      <div>
        <TodoForm setTodos={setTodos} />
      </div>
      <div className="todos">
        {todos.map((todo) => (
          <div className="items" key={todo.id}>
            {editingTodoId == todo.id ? (
              <div className="editText">
                <input
                  type="text"
                  value={editedtodotext}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  autoFocus={true}
                />

                <button onClick={() => handleEditSave(todo.id)}>
                  <FaCheck />
                </button>
                <button
                  className="cancelBtn"
                  onClick={() => handleEditCancel()}
                >
                  <GiCancel />
                </button>
              </div>
            ) : (
              <div className="editBtn">
                <span>{todo.text}</span>
                <button onClick={() => handleEditStart(todo.id, todo.text)}>
                  <FaEdit />
                </button>
              </div>
            )}
            <button onClick={() => handleDeleteTodo(todo.id)}>
              <RiDeleteBin5Fill />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
