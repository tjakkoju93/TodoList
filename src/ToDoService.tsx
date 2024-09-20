import TodoTypes from "./ToDo";

const Local_Storage_Key = "todos";

const ToDoService = {
  //get todos
  getTodos: (): TodoTypes[] => {
    const todostr = localStorage.getItem(Local_Storage_Key);
    return todostr ? JSON.parse(todostr) : [];
  },

  //add todos

  addTodos: (text: string): TodoTypes => {
    const todos = ToDoService.getTodos();
    const newtodos: TodoTypes = {
      id: todos.length + 1,
      text,
      completed: false,
    };

    const updateTodos = [...todos, newtodos];
    localStorage.setItem(Local_Storage_Key, JSON.stringify(updateTodos));

    return newtodos;
  },

  //update Todos
  updateTodo: (todo: TodoTypes): TodoTypes => {
    const todos = ToDoService.getTodos();
    const updateTodos = todos.map((item) =>
      item.id === todo.id ? todo : item
    );

    localStorage.setItem(Local_Storage_Key, JSON.stringify(updateTodos));
    return todo;
  },

  //delete todos
  DeleteTodo: (id: number): void => {
    const todos = ToDoService.getTodos();
    const updateTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem(Local_Storage_Key, JSON.stringify(updateTodos));
  },
};
export default ToDoService;
