export type Place = "Home" | "Work" | { custom: string };

export type Todo = Readonly<{
  id: number;
  text: string;
  done: boolean;
  place?: Place;
}>;

export type todoItem = Todo & {
  itemClick: (a: number) => void;
};

export type TodoState = {
  todos: Todo[]
}

type addAction = {
  type: 'ADD_TODO';
  content: string;
}

type toggleAction = {
  type: 'TOGGLE_TODO';
  index: number;
}

type completeAction = {
  type: 'COMPLETEALL';
}

export type action = addAction | toggleAction | completeAction;