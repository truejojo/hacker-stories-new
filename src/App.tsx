import React, {
  useState,
  useReducer,
  useRef,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

interface Story {
  objectID: number;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

type Stories = Story[];
interface State {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
}

enum ActionTypes {
  STORIES_FETCH_INIT,
  STORIES_FETCH_SUCCESS,
  STORIES_FETCH_FAILURE,
  REMOVE_STORY,
}

type Action =
  | {
      type: ActionTypes.STORIES_FETCH_INIT;
    }
  | {
      type: ActionTypes.STORIES_FETCH_SUCCESS;
      payload: Stories;
    }
  | {
      type: ActionTypes.STORIES_FETCH_FAILURE;
    }
  | {
      type: ActionTypes.REMOVE_STORY;
      payload: number;
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.STORIES_FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case ActionTypes.STORIES_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };

    case ActionTypes.STORIES_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case ActionTypes.REMOVE_STORY:
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload !== story.objectID
        ),
      };

    default:
      throw new Error();
  }
};

const initialState: State = {
    data: [],
    isLoading: false,
    isError: false,
}

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

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
  const {data, isLoading, isError} = state;

  const handleFetchStories = useCallback(async () => {
    dispatch({ type: ActionTypes.STORIES_FETCH_INIT });

    try {
      const result = await axios.get(url);

      dispatch({
        type: ActionTypes.STORIES_FETCH_SUCCESS,
        payload: result.data.hits,
      });
    } catch {
      dispatch({ type: ActionTypes.STORIES_FETCH_FAILURE });
    }
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (id: number) => {
    dispatch({
      type: ActionTypes.REMOVE_STORY,
      payload: id,
    });
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <SearchForm
        searchTerm={searchTerm}
        handleSearchSubmit={handleSearchSubmit}
        handleSearchInput={handleSearchInput}
      />

      <hr />

      {isError && <p>Something went wrong ...</p>}

      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

type SearchFormProps = {
  searchTerm: string;
  handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const SearchForm = ({
  searchTerm,
  handleSearchSubmit,
  handleSearchInput,
}: SearchFormProps) => (
  <form onSubmit={handleSearchSubmit}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={handleSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>
    <button disabled={!searchTerm}>Submit</button>
  </form>
);

type InputWithLabelProps = {
  id: string;
  value: string;
  type?: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused: boolean;
  children: React.ReactNode;
};

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}: InputWithLabelProps) => {
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
  list: Stories;
  onRemoveItem: (item: number) => void;
};

const List = ({ list, onRemoveItem }: ListProps) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} {...item} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
);

interface ItemProps extends Story {
  onRemoveItem: (item: number) => void;
};

const Item= ({objectID, url, title, author, num_comments, points, onRemoveItem }: ItemProps) => (
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

export default App;
