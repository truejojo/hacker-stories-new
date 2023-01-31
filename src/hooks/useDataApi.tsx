import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { IInitialStories } from "../pages/Hackernews";

export interface NewState {
  data: IInitialStories;
  isLoading: boolean;
  isError: boolean;
}

enum ActionTypes {
  FETCH_INIT,
  FETCH_SUCCESS,
  FETCH_FAILURE,
}

type Action =
  | {
      type: ActionTypes.FETCH_INIT;
    }
  | {
      type: ActionTypes.FETCH_SUCCESS;
      payload: IInitialStories;
    }
  | {
      type: ActionTypes.FETCH_FAILURE;
    };

const reducer = (state: NewState, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case ActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };

    case ActionTypes.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl: string, initialData: IInitialStories) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: ActionTypes.FETCH_INIT });

      try {
        const result = await axios(url);

        dispatch({ type: ActionTypes.FETCH_SUCCESS, payload: result.data });
      } catch (error) {
        dispatch({ type: ActionTypes.FETCH_FAILURE });
      }
    };

    fetchData();
  }, [url]);

  return { state, setUrl };
};

export default useDataApi;
