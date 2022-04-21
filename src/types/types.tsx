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