import { todoItem } from '../../types/types';
import { placeToString } from '../../utils/index';
import { Check, emoji } from '../Emoji';
import "./TodoItem.css";


function TodoItem({ id, text, done, place, itemClick }: todoItem) {
  const place1 = place ? placeToString(place) : " ";
  return (
    <li className="todo__item">
      <div className="todo__wrapper">
        <div className="todo__checkbox__wrapper" onClick={() => itemClick(id)}>
          {done ? (
            <Check className="checked" />
          ) : (
            <div className="todo__checkbox"></div>
          )}
          <div className="todo__text">{text}</div>
        </div>
        <div className="place__wrapper">
          {emoji(place1)}
          <div className="todo__place">{place1}</div>
        </div>
      </div>
    </li>
  );
}

export default TodoItem;