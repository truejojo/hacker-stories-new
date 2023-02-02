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
  const { data, isLoading, isError } = useDataApi<TInitialPhotos>(
    API_ENDPOINT,
    initialData
  );

  return (
    <>
      {isError && <p>Something went wrong...</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item: IPhoto) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Photos;
