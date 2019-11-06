import React, { Component } from "react";

class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem
              key={todo.id}
              handleDeleteTodo={event =>
                this.props.handleDeleteTodo(event, todo.id)
              }
              handleToggleCompleted={event =>
                this.props.handleToggleCompleted(event, todo.id)
              }
              title={todo.title}
              completed={todo.completed}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default TodoList;
