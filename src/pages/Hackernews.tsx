import useDataApi from "../hooks/useDataApi";
import useStorageState from "../hooks/useStorageState";
import SearchForm from "../components/SearchForm";
import List from "../components/List";
import styled from "styled-components";

export interface Story {
  objectID: number;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
}

export type Stories = Story[];

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";
export interface IInitialStories {
  hits: Stories;
}
const initialData: IInitialStories = {
  hits: [],
};

const Hackernews = () => {
  const { data, isLoading, isError, setUrl } = useDataApi<IInitialStories>(API_ENDPOINT, initialData);
  const [query, setQuery] = useStorageState("search", "react");

  const handleRemoveStory = () => {};

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUrl(`${API_ENDPOINT}${query}`);
  };

  return (
    <Container>
      <Headline>My Hacker Stories</Headline>

      <SearchForm
        searchTerm={query}
        handleSearchSubmit={handleSearchSubmit}
        handleSearchInput={handleSearchInput}
      />

      <hr />

      {isError && <p>Something went wrong ...</p>}

      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={data.hits} onRemoveItem={handleRemoveStory} />
      )}
    </Container>
  );
};

// Styles
const Container = styled.div`
  min-height: 100vw;
  width: 90%;
  max-width: 1200px;
  margin-inline: auto;

  color: #171212;
`;
const Headline = styled.h1`
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 2px;
`;
export default Hackernews;
