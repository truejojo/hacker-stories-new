import useDataApi from "../hooks/useDataApi";

interface IPhoto {
  albumId: number;  
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export type TInitialPhotos = IPhoto[];

const initialData: TInitialPhotos = [];

const API_ENDPOINT = "https://jsonplaceholder.typicode.com/photos";

const Photos = () => {
  const {state, setUrl} = useDataApi<TInitialPhotos>(API_ENDPOINT, initialData);
  const { data, isLoading, isError } = state;

  return (
    <>
      <ul>
        {data.map((item: IPhoto) => <li key={item.id}>{item.title}</li>)}
      </ul>
    </>  )
}

export default Photos