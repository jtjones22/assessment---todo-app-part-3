import todoList from "./todos.json";
import {
  TOGGLE_TODO,
  CLEAR_COMPLETED_TODOS,
  ADD_TODO,
  DELETE_TODO
} from "./actions";

const initalState = {
  todos: todoList,
  value: ""
};

const reducer = (state = initalState, action) => {
  /* How to modify state */
  switch (action.type) {
    case TOGGLE_TODO:
      const newArray = state.todos.map(todo => {
        if (todo.id === action.payload) {
          const newItem = { ...todo };

          newItem.completed = !newItem.completed;

          return newItem;
        }

        return todo;
      });

      return { todos: newArray };

    case CLEAR_COMPLETED_TODOS:
      const newnewArray = state.todos.filter(todo => todo.completed === false);
      return { todos: newnewArray };

    case ADD_TODO:

      return { ...state, todos: [...state.todos, action.payload] };

    case DELETE_TODO:
      console.log(state.value);
      const newTodoList = state.todos.filter(
        todo => todo.id !== action.payload
      );

      return { todos: newTodoList };

    default:
      return state;
  }
};

export default reducer;

// const initalState = 'LOCKED'

// const reducer = (state = initalState, action) => {
//     /* How to modify state */
//     switch(action.type) {
//         case 'COIN':
//             if (state === 'LOCKED') {
//                 return 'UNLOCKED'
//             }
//         case 'PUSH':
//             if ( state === 'LOCKED') {
//                 return state
//             }
//         default:
//             return state;
//     }
// }

/* Will always see this pattern */
