import { Stories } from "../pages/Hackernews";
import Item from "./Item";
import styled from "styled-components";

interface ListProps {
  list: Stories;
  onRemoveItem: (item: number) => void;
}

const List = ({ list, onRemoveItem }: ListProps) => (
  <Ul>
    {list.map((item) => (
      <Item key={item.objectID} {...item} onRemoveItem={onRemoveItem} />
    ))}
  </Ul>
);

export default List;

const Ul = styled.ul`
  padding-left: 0;
  display: grid;
  gap: .2rem;
`;