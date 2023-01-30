import { Story } from "../pages/Hackernews";
import styled from "styled-components";
import Button from "./Button";
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
    <Button objectID={objectID} onRemoveItem={onRemoveItem} />
  </StyledItem>
);

const StyledItem = styled.li`
  display: grid;
  grid-template-columns: 1fr auto 40px 40px auto;
  gap: 1.5rem;
  text-align: right;
  align-items: center;
  background: var(--clr-neutral-800);
  padding-inline: 1rem;
  color: var(--clr-neutral-100);

  a {
    font-size: 1.2rem;
    color: var(--clr-primary-I);
    text-align: left;
    text-decoration: none;
    padding-block: 1rem;
    font-weight: 700;
  }
`;

export default Item;
