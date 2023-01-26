import { useState } from "react";

interface ListItemProps {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: number;
}

interface ListProps {
  list: ListItemProps[];
}

const App = () => {
  const stories = [
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
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  const searchStories = stories.filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h1>Hello World!</h1>
      <Search onSearch={handleSearch} />
      <h2>My List</h2>
      {
        searchTerm.length > 0 && <List list={searchStories} />
      }
    </div>
  );
};

interface SearchProps {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Search = ({ onSearch }: SearchProps) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" onChange={onSearch} />
  </div>
);

const List = ({ list }: ListProps) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} {...item} />
    ))}
  </ul>
);

const Item = ({ url, title, author, num_comments, points }: ListItemProps) => (
  <li>
    <h3>
      <a href={url}>{title}</a>
    </h3>
    <h4>{author}</h4>
    <p>{num_comments}</p>
    <p>{points}</p>
    <hr />
  </li>
);

export default App;
