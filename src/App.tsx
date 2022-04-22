import "./styles.css";
import { Provider } from "react-redux";
// import TodoList from "./components/todo";
import TodoList from './components/TodoList/TodoList';
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}
