import { Stories } from "../pages/Hackernews";
import Item from "./Item";


interface ListProps {
  list: Stories;
  onRemoveItem: (item: number) => void;
}

const List = ({ list, onRemoveItem }: ListProps) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} {...item} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
);

export default List;