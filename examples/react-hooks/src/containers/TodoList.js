import React, {useState, useCallback, useMemo } from "react";
import { NavLink } from "react-router-dom";
import useRouter from "use-react-router";

import useInput from "../hooks/useInput";
import useOnEnter from "../hooks/useOnEnter";
import useTodos from "../reducers/useTodos";
import TodoItem from "./TodoItem";
import "../../src/index.css"


//! use state to set the background color, make onclicks to change the background color. change font to black so its easier to read, make opacity just light enough to give off the feeling of a placeholder, give better instructions in the placeholder box, make the tabs they click change color to avoid confusion, make the footer readable.
export default function TodoList() {
  const router = useRouter();

  const [backGround, setBackGround] = useState('white')
  const [todos, { addTodo, deleteTodo, setDone }] = useTodos();

  const left = useMemo(() => todos.reduce((p, c) => p + (c.done ? 0 : 1), 0), [
    todos
  ]);

  const visibleTodos = useMemo(
    () =>
      router.match.params.filter
        ? todos.filter(i =>
            router.match.params.filter === "active" ? !i.done : i.done
          )
        : todos,
    [todos, router.match.params.filter]
  );

  const anyDone = useMemo(() => todos.some(i => i.done), [todos]);
  const allSelected = useMemo(() => visibleTodos.every(i => i.done), [
    visibleTodos
  ]);

  const onToggleAll = useCallback(
    () => {
      visibleTodos.forEach(i => setDone(i.id, !allSelected));
    },
    [visibleTodos, allSelected]
  );

  const onClearCompleted = useCallback(
    () => {
      todos.forEach(i => {
        if (i.done) {
          deleteTodo(i.id);
        }
      });
    },
    [todos]
  );

  const [newValue, onNewValueChange, setNewValue] = useInput();
  const onAddTodo = useOnEnter(
    () => {
      if (newValue) {
        addTodo(newValue);
        setNewValue("");
      }
    },
    [newValue]
  );

  return (
    <React.Fragment>
      <header className="header" >
        <h1 style={{color:"black"}}>todos</h1>
        <input
        // added this ID because i needed to alter the opacity of the input box, I could barely read what the placeholder said
        id="inputID"
          className="new-todo" 
          // it just said what needs to be done. there is no direction on how to enter your input. i sat there for a second looking for a button and then my computer brain said "hit enter" most people need direct instruction
          placeholder="Type your todo here and then hit enter" 
          onKeyPress={onAddTodo}
          value={newValue}
          onChange={onNewValueChange}
        />
      </header>

      <section style={{backgroundColor: backGround, color:"black"}}>
        <input 
          id="toggle-all"
          type="checkbox"
          className="toggle-all  "
          checked={allSelected}
          onChange={onToggleAll}
        />
        <label htmlFor="toggle-all" />
        <ul className="todo-list">
          {visibleTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </section>

      <footer className="footer" style={{color:"black",fontSize:"medium"}}>
        <span className="todo-count">
          <strong>{left}</strong> items left
        </span>
        <ul className="filters ">
          <li className="">
            <NavLink exact={true} to="/" activeClassName="selected all" onClick={() => setBackGround('white')} >
              All
            </NavLink>
          </li>
          <li>
            <NavLink to="/active" activeClassName="selected active" onClick={() => setBackGround('green') } >
              Active
            </NavLink>
          </li>
          <li>
            <NavLink to="/completed" activeClassName="selected completed" onClick={() => setBackGround('darkgray') }>
              Completed
            </NavLink>
          </li>
        </ul>
        {anyDone && (
          <button className="clear-completed complete-button" onClick={onClearCompleted}>
            Clear completed
          </button>
        )}
      </footer>
      
    </React.Fragment>
  );
}
