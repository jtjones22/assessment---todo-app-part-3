import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";
import { Route, NavLink } from "react-router-dom";
import TodoList from "./TodoList";
import { connect } from 'react-redux'
import { clearCompletedTodos, addTodo } from "./actions";

class App extends Component {
  state = {
    todos: todosList,
    value: ""
  };

  handleCreateTodo = event => {
    if (event.key === "Enter" && this.state.value.length !== 0) {
      this.props.addTodo(this.state.value)
      this.setState({ value: "" })
    }
  };

  handleChangeTodo = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>TODOS</h1>
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
              todos={this.props.todos}
            />
          )}
        />
        <Route
          path="/active"
          render={() => (
            <TodoList
              handleToggleCompleted={this.handleToggleCompleted}
              handleDeleteTodo={this.handleDeleteTodo}
              todos={this.props.todos.filter(todo => todo.completed === false)}
            />
          )}
        />
        <Route
          path="/completed"
          render={() => (
            <TodoList
              handleToggleCompleted={this.handleToggleCompleted}
              handleDeleteTodo={this.handleDeleteTodo}
              todos={this.props.todos.filter(todo => todo.completed === true)}
            />
          )}
        />
        <footer className="footer">
          <span className="todo-count">
            <strong>
              {this.props.todos.filter(todo => todo.completed === false).length}
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
            onClick={() => {
              this.props.clearCompletedTodos();
            }}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

// mapStateToProps

const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = {
  clearCompletedTodos,
  addTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
