import {
  Dispatch,
  Reducer,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";

interface IResult<T = any> {
  data: T;
  isLoading: boolean;
  isError: boolean;
}

type IAction<T = any> =
  | {
      type: "FETCH_INIT";
    }
  | {
      type: "FETCH_SUCCESS";
      payload: T;
    }
  | {
      type: "FETCH_FAILURE";
    };
    
const dataFetchReducer = <T extends any>(
  state: IResult<T>,
  action: IAction<T>
): IResult<T> => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      };
    case "FETCH_FAILURE":
      return { ...state, isError: true };
    default:
      throw new Error();
  }
};

const useDataApi2 = <T extends any>(
  initialData: T,
  initialUrl: string
): [IResult<T>, Dispatch<SetStateAction<string>>] => {
  const [state, dispatch] = useReducer<Reducer<IResult<T>, IAction<T>>>(
    dataFetchReducer,
    {
      data: initialData,
      isError: false,
      isLoading: false,
    }
  );
  const [url, setUrl] = useState(initialUrl);
  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData().then();
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};

export default useDataApi2;
