import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isShowComplteAll } from '../../utils';
import { TodoState } from '../../types/types';
import { addAction, completeAction, toggleAction } from "../../store/actions";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoListStyle.css";



function TodoList() {

  const dispatch = useDispatch();
  const { todoArray } = useSelector((state: TodoState) => ({
    todoArray: state.todos
  }))

  const inputRef = useRef<HTMLInputElement | null>(null);
  const showCompleteAll = isShowComplteAll(todoArray);

  return (
    <div className="container">
      <ul className="todo__list">
        {todoArray.map((todo) => {
          return (
            <TodoItem
              {...todo}
              key={todo.id}
              itemClick={(index: number) => dispatch(toggleAction(index))}
            />
          );
        })}
      </ul>

      <div className="add__wrapper">
        <input type="text" ref={inputRef} />
        <button
          className="add__button"
          onClick={() => dispatch(addAction(inputRef.current!.value))}>
          ADD
        </button>
        <button
          onClick={() => dispatch(completeAction())}
          className={showCompleteAll ? "ative" : "deactive"}>
          Complete All
        </button>
      </div>
    </div>
  );
}


export default TodoList;