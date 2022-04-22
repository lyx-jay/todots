import { Todo, Place} from '../types/types'

function addTodo(todos: Todo[], content: string): Todo[] {
  let todoArrayLength = todos.length;
  const newTodoArray = todos.slice().concat([
    {
      id: todoArrayLength,
      text: content,
      done: false
    }
  ]);
  return newTodoArray;
}

function isShowComplteAll(todos: Todo[]): boolean {
  return todos.some((todo) => {
    return todo.done === false;
  });
}

// toggle status of todo item
function toggleTodo(todo: Todo): Todo {
  return { ...todo, done: !todo.done };
}

// make all todo items to done
function completeAll(todos: readonly Todo[]): Todo[] {
  return todos.map((todo) => ({ ...todo, done: true }));
}

// transform place to string
function placeToString(place: Place): string {
  if (place === "Home") {
    return place;
  } else if (place === "Work") {
    return place;
  } else {
    return place.custom;
  }
}

export {
  addTodo,
  toggleTodo,
  completeAll,
  placeToString,
  isShowComplteAll
}