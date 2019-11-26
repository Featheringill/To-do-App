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

  handleDelete = todoIdToDelete => {
    const newTodoList = this.state.todos.filter(
      todo => todo.id !== todoIdToDelete
    );
    this.setState({ todos: newTodoList });
  };

  handleCreate = event => {
    if (event.key === "Enter") {
      const newTodoList = this.state.todos.slice();
      newTodoList.push({
        userId: 1,
        id: Math.floor(Math.random() * 10000000000),
        title: this.state.value,
        completed: false
      });
      this.setState({ todos: newTodoList, value: "" });
    }
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleToggle = todoIdToToggle => {
    const newTodoList = this.state.todos.map(todo => {
      if (todo.id === todoIdToToggle) {
        const newTodo = { ...todo };
        newTodo.completed = !newTodo.completed;
        return newTodo;
      }
      return todo;
    });
    this.setState({ todos: newTodoList });
  };

  handleClearCompleted = event => {
    const newTodos = this.state.todos.filter(todo => todo.completed !== true);
    this.setState({ todos: newTodos });
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
            onKeyDown={this.handleCreate}
            onChange={this.handleChange}
            value={this.state.value}
          />
        </header>
        <Route
          exact
          path="/"
          render={() => (
            <TodoList
              handleToggle={this.handleToggle}
              handleDelete={this.handleDelete}
              todos={this.state.todos}
            />
          )}
        />

        <Route
          path="/active"
          render={() => (
            <TodoList
              handleToggle={this.handleToggle}
              handleDelete={this.handleDelete}
              todos={this.state.todos.filter(todo => todo.completed === false)}
            />
          )}
        />

        <Route
          path="/completed"
          render={() => (
            <TodoList
              handleToggle={this.handleToggle}
              handleDelete={this.handleDelete}
              todos={this.state.todos.filter(todo => todo.completed === true)}
            />
          )}
        />

        <footer className="footer">
          {/* <!-- This should be `0 items left` by default --> */}
          <span className="todo-count">
            <strong>
              {this.state.todos.filter(todo => todo.completed === false).length}
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
            onClick={this.handleClearCompleted}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
