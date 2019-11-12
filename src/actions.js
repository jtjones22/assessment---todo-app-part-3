/* ACTION TYPE CONSTANTS */

export const TOGGLE_TODO = "TOGGLE_TODO";
export const CLEAR_COMPLETED_TODOS = "CLEAR_COMPLETED_TODOS";
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";

/* ACTION CREATOR FUNCTION 

ALWAYS HAS TYPE

SOMETIMES WE WILL HAVE A PAYLOAD AKA VALUE

{
    type: TOGGLE_TODO,
    payload: 'value'
}
*/

/* ACTION CREATOR FUNCTIONS */

export const toggleTodo = todoIdToToggle => {
  return {
    type: TOGGLE_TODO,
    payload: todoIdToToggle
  };
};

export const clearCompletedTodos = () => {
  return {
    type: CLEAR_COMPLETED_TODOS
  };
};

export const addTodo = (todoTitle) => {
  const newTodo = {
    userId: 1,
    id: Math.floor(Math.random() * 1000000),
    title: todoTitle,
    completed: false
  };

  return {
    type: ADD_TODO,
    payload: newTodo
  };
};

export const deleteTodo = todoIdToToggle => {
  return {
    type: DELETE_TODO,
    payload: todoIdToToggle
  };
};
