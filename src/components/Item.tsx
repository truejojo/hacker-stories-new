import { Story } from "../pages/Hackernews";

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
  <li>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(objectID)}>
        Dismiss
      </button>
    </span>
  </li>
);

export default Item;