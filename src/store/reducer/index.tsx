import { TodoState, action } from "../../types/types";
import { addTodo, completeAll, toggleTodo } from "../../utils";
import * as actionTypes from '../constant';

const initialState:TodoState = {
  todos: [
    { id: 0, text: "practice react", done: false, place: "Home" },
    { id: 1, text: "learn redux", done: false, place: "Work" },
    { id: 2, text: "practice react again", done: false, place: { custom: "Gym" }},
    { id: 3, text: "practice react again", done: false, place: { custom: "Library" }}
  ]
}

const todoReducer = (state = initialState, action: action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_TODO:
      return {todos:[...state.todos.slice(0, action.index), toggleTodo(state.todos[action.index]), ...state.todos.slice(action.index+1)]}
    case actionTypes.ADD_TODO:
      return addTodo(state.todos, action.content);
    case actionTypes.COMPLETEALL:
      return completeAll(state.todos);
    default:
      return state;
  }
}

export default todoReducer;