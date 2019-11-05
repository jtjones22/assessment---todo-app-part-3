import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";

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

  clearCompletedTodos = (event) => {
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
        <TodoList
          handleToggleCompleted={this.handleToggleCompleted}
          handleDeleteTodo={this.handleDeleteTodo}
          todos={this.state.todos}
        />
        <footer className="footer">
          <span className="todo-count">
            <strong>{this.state.todos.length}</strong> item(s) left
          </span>
          <button 
          className="clear-completed"
          onClick={event => {this.clearCompletedTodos(event)}}>
            Clear completed
            </button>
        </footer>
      </section>
    );
  }
}

class TodoItem extends Component {
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onChange={this.props.handleToggleCompleted}
          />
          <label>{this.props.title}</label>
          <button className="destroy" onClick={this.props.handleDeleteTodo} />
        </div>
      </li>
    );
  }
}

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

export default App;
