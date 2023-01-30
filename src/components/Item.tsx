import { Story } from "../pages/Hackernews";
import styled from "styled-components";
interface ItemProps extends Story {
  onRemoveItem: (item: number) => void;
}

const Item = ({
  objectID,
  url,
  title,
  author,
  num_comments,
  points,
  onRemoveItem,
}: ItemProps) => (
  <StyledItem>
      <a href={url}>{title}</a>
    <h3>{author}</h3>
    <p>{num_comments}</p>
    <p>{points}</p>
    <div>
      <button type="button" onClick={() => onRemoveItem(objectID)}>
        Dismiss
      </button>
    </div>
  </StyledItem>
);

const StyledItem = styled.li`
  display: grid;
  grid-template-columns: 1fr auto 50px 50px auto;
  gap: 1.5rem;
  text-align: right;

  a {
    text-align: left;
  }
`;

export default Item;