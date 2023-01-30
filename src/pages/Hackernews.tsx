import React, { useState, useReducer, useEffect, useCallback } from "react";
import axios from "axios";
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
      objectID: number;
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
        data: state.data.filter((story) => action.objectID !== story.objectID),
      };

    default:
      throw new Error();
  }
};

const initialState: State = {
  data: [],
  isLoading: false,
  isError: false,
};

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const Hackernews = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
  const { data, isLoading, isError } = state;

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

  const handleRemoveStory = (objectID: number) => {
    dispatch({
      type: ActionTypes.REMOVE_STORY,
      objectID,
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
    <Container>
      <Headline>My Hacker Stories</Headline>

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
