import { useState, useRef } from "react";

import TodoItem from "../TodoItem/TodoItem";
import { toggleTodo, isShowComplteAll, completeAll, addTodo } from '../../utils';
import { Todo } from '../../types/types';
import "./TodoListStyle.css";

let todos: Todo[] = [
  { id: 0, text: "practice react", done: false, place: "Home" },
  { id: 1, text: "learn redux", done: false, place: "Work" },
  {
    id: 2,
    text: "practice react again",
    done: false,
    place: { custom: "Gym" }
  },
  {
    id: 3,
    text: "practice react again",
    done: false,
    place: { custom: "Library" }
  }
];

function TodoList() {
  const [todoArray, setTodoArray] = useState(todos);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const showCompleteAll = isShowComplteAll(todoArray);

  const handleItemClikc = (index: number) => {
    setTodoArray([
      ...todoArray.slice(0, index),
      toggleTodo(todoArray[index]),
      ...todoArray.slice(index + 1)
    ]);
  };

  return (
    <div className="container">
      <ul className="todo__list">
        {todoArray.map((todo) => {
          return (
            <TodoItem
              {...todo}
              key={todo.id}
              itemClick={(index: number) => handleItemClikc(index)}
            />
          );
        })}
      </ul>
      <button
        onClick={() => setTodoArray(completeAll(todoArray))}
        className={showCompleteAll ? "ative" : "deactive"}>
        Complete All
      </button>
      <div className="add__wrapper">
        <input type="text" ref={inputRef} />
        <button
          onClick={() => {
            setTodoArray(addTodo(todoArray, inputRef.current!.value))
          }
          }>
          ADD
        </button>
      </div>
    </div>
  );
}

export default TodoList;