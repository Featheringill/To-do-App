import React, { Component } from "react";
import TodoItem from "./TodoItem";

class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem
              handleDelete={event => this.props.handleDelete(todo.id)}
              handleToggle={event => this.props.handleToggle(todo.id)}
              title={todo.title}
              completed={todo.completed}
              key={todo.id}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default TodoList;
