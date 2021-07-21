import React from "react";
import "../../src/index.css"
export default function Footer() {
  return (
    <footer className="info">
      <p className="foot">Double-click to edit a todo</p>
      <p className="foot">
        Created by <a href="http://github.com/jacob-ebey/">jacob-ebey</a>
      </p>
      <p className="foot">
        Part of <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </footer>
  );
}
