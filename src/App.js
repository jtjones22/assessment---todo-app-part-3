import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";
import { Route, NavLink } from "react-router-dom";
import TodoItem from "./TodoItem";
import TodoList from "./TodoList";

class App extends Component {
  state = {
    todos: todosList,
    value: ""
  };

  handleDeleteTodo = (event, todoIdToDelete) => {
    const newTodoList = this.state.todos.filter(
      todo => todo.id !== todoIdToDelete
    );
    this.setState({ todos: newTodoList });
  };

  handleCreateTodo = event => {
    if (event.key === "Enter" && this.state.value.length !== 0) {
      const newTodoList = this.state.todos.slice();
      newTodoList.push({
        userId: 1,
        id: Math.floor(Math.random() * 1000000),
        title: this.state.value,
        completed: false
      });
      this.setState({
        todos: newTodoList,
        value: ""
      });
    }
  };

  handleToggleCompleted = (event, todoToCheckCompletedId) => {
    const newArray = this.state.todos.map(todo => {
      if (todo.id === todoToCheckCompletedId) {
        const newItem = { ...todo };

        newItem.completed = !newItem.completed;

        return newItem;
      }

      return todo;
    });

    this.setState({ todos: newArray });
  };

  handleChangeTodo = event => {
    this.setState({ value: event.target.value });
  };

  clearCompletedTodos = event => {
    const newArray = this.state.todos.filter(todo => todo.completed === false);
    this.setState({ todos: newArray });
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onKeyDown={this.handleCreateTodo}
            onChange={this.handleChangeTodo}
            value={this.state.value}
            //Controlled Compontent
          />
        </header>
        <Route
          exact
          path="/"
          render={() => (
            <TodoList
              handleToggleCompleted={this.handleToggleCompleted}
              handleDeleteTodo={this.handleDeleteTodo}
              todos={this.state.todos}
            />
          )}
        />
        <Route
          path="/active"
          render={() => (
            <TodoList
              handleToggleCompleted={this.handleToggleCompleted}
              handleDeleteTodo={this.handleDeleteTodo}
              todos={this.state.todos.filter(todo => todo.completed === false)}
            />
          )}
        />
        <Route
          path="/completed"
          render={() => (
            <TodoList
              handleToggleCompleted={this.handleToggleCompleted}
              handleDeleteTodo={this.handleDeleteTodo}
              todos={this.state.todos.filter(todo => todo.completed === true)}
            />
          )}
        />
        <footer className="footer">
          <span className="todo-count">
            <strong>
              {
                this.state.todos.filter(todo => {
                  todo.completed === false;
                }).length
              }
            </strong>{" "}
            item(s) left
          </span>
          <ul className="filters">
            <li>
              <NavLink exact to="/" activeClassName="selected">
                All
              </NavLink>
            </li>
            <li>
              <NavLink to="/active" activeClassName="selected">
                Active
              </NavLink>
            </li>
            <li>
              <NavLink to="/completed" activeClassName="selected">
                Completed
              </NavLink>
            </li>
          </ul>
          <button
            className="clear-completed"
            onClick={event => {
              this.clearCompletedTodos(event);
            }}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
