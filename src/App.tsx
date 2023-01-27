import { useEffect, useRef, useState } from "react";

const initialState: ListItemProps[] = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const useStorageState = (
  key: string,
  initialState: string
): [string, (newValue: string) => void] => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const [stories, setStories] = useState<ListItemProps[]>(initialState);
  const [searchTerm, setSearchTerm] = useStorageState("search", "");

  const removeItem = (id: number) =>
    setStories((prevStories) =>
      prevStories.filter((story) => story.objectID !== id)
    );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  const searchStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>New Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      {searchTerm.length > 0 && (
        <List list={searchStories} removeItem={removeItem} />
      )}
    </div>
  );
};

interface IInputWithLabelProps {
  id: string;
  value: string;
  type?: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused: boolean;
  children: React.ReactNode;
}

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}: IInputWithLabelProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

interface ListProps {
  list: ListItemProps[];
  removeItem: (id: number) => void;
}
const List = ({ list, removeItem }: ListProps) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} removeItem={removeItem} />
    ))}
  </ul>
);

interface ListItemProps {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: number;
}

interface ItemProps {
  item: ListItemProps;
  removeItem: (id: number) => void;
}

const Item = ({ item, removeItem }: ItemProps) => {
  return (
    <li>
      <h3>
        <a href={item.url}>{item.title}</a>
      </h3>
      <h4>{item.author}</h4>
      <p>{item.num_comments}</p>
      <p>{item.points}</p>
      <button type="button" onClick={() => removeItem(item.objectID)}>
        Delete
      </button>
      <hr />
    </li>
  );
};

export default App;
