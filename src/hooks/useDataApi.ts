import { useEffect, useState, useReducer } from "react";
import axios from "axios";

export interface State<T> {
  data: T;
  isLoading: boolean;
  isError: boolean;
}

enum ActionTypes {
  FETCH_INIT,
  FETCH_SUCCESS,
  FETCH_FAILURE,
}

type Action<T> =
  | {
      type: ActionTypes.FETCH_INIT;
    }
  | {
      type: ActionTypes.FETCH_SUCCESS;
      payload: T;
    }
  | {
      type: ActionTypes.FETCH_FAILURE;
    };

const reducer = <T extends unknown>(
  state: State<T>,
  action: Action<T>
): State<T> => {
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

const useDataApi = <T extends unknown>(initialUrl: string, initialData: T) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  const { isLoading, isError, data } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: ActionTypes.FETCH_INIT });

      try {
        const result = await axios(url);

        dispatch({
          type: ActionTypes.FETCH_SUCCESS,
          payload: result.data as T,
        });
      } catch (error) {
        dispatch({ type: ActionTypes.FETCH_FAILURE });
      }
    };

    fetchData();
  }, [url]);

  // return [isLoading, isError, data, setUrl];
  return { state, setUrl };
};

export default useDataApi;
